---
emoji: 🧳
title: Tomcat Session Clustering (CentOS7)
date: '2022-09-29'
author: 아임해피
tags: tomcat session clustering Linux CenOS7
categories: tomcat
---

Tomcat Session Clustering

CentOS7 서버에서 Tomcat 2대 세션 클러스터링

>
> vm1(tomcat1)  ip: 192.168.56.7
> 
> vm2(tomcat2)  ip: 192.168.56.8
> 

---


## 🌼 Linux 멀티캐스트 추가하기

```
# vm1, vm2 둘 다 추가
route add -net 224.0.0.0 netmask 240.0.0.0 dev enp0s8
```

```
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         10.nate.com     0.0.0.0         UG    100    0        0 enp0s3
default         192.168.nate.co 0.0.0.0         UG    101    0        0 enp0s8
10.0.2.0        0.0.0.0         255.255.255.0   U     100    0        0 enp0s3
192.168.56.0    0.0.0.0         255.255.255.0   U     101    0        0 enp0s8
224.0.0.0       0.0.0.0         240.0.0.0       U     0      0        0 enp0s8
```

- # route 영구 적용 방법(재부팅해도 유지)
    - $ vi /etc/sysconfig/network-scripts/route-enp0s8

    ```
    ADDRESS0=224.0.0.0
    NETMASK0=240.0.0.0
    ```

  $ route add -net 224.0.0.0 netmask 240.0.0.0 dev enp0s8

  # 재부팅 후 확인

  $ route

## ☀️  Linux 멀티 캐스트 통신되는지 확인하는 방법

$ wget -O /usr/bin/iperf [https://iperf.fr/download/ubuntu/iperf_2.0.9](https://iperf.fr/download/ubuntu/iperf_2.0.9)

$ chmod +x /usr/bin/iperf

$ iperf -s -u -B 228.0.0.4 -i 1 -p 45564

$ iperf -c 228.0.0.4 -u -T 32 -t 3 -i 1 -p 45564

## 🌎 Tomcat 설정 변경

tomcat1, tomcat2 둘 다 똑같이 적용

### 💥 web.xml 수정

web.xml의 경로는 2가지가 있음(걍 둘 다 추가)

$ conf/web.xml

$ webapps/ROOT/WEB_INF/web.xml

```
<distributable/>
```

### ☁️  server.xml 수정

$ vi conf/server.xml

서버의 IP가 다르면 port 번호는 같아도 상관없어요

```xml
<Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"/>

<Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"
                 channelSendOptions="8">

          <Manager className="org.apache.catalina.ha.session.DeltaManager"
                   expireSessionsOnShutdown="false"
                   notifyListenersOnReplication="true"/>

          <Channel className="org.apache.catalina.tribes.group.GroupChannel">
            <Membership className="org.apache.catalina.tribes.membership.McastService"
                        address="228.0.0.4"
                        port="45564"
                        frequency="500"
                        dropTime="3000"/>
            <Receiver className="org.apache.catalina.tribes.transport.nio.NioReceiver"
                      address="192.168.56.7"
                      port="4000"
                      autoBind="100"
                      selectorTimeout="5000"
                      maxThreads="6"/>

            <Sender className="org.apache.catalina.tribes.transport.ReplicationTransmitter">
              <Transport className="org.apache.catalina.tribes.transport.nio.PooledParallelSender"/>
            </Sender>
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.TcpFailureDetector"/>
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.MessageDispatchInterceptor"/>
          </Channel>

          <Valve className="org.apache.catalina.ha.tcp.ReplicationValve"
                 filter=""/>
          <Valve className="org.apache.catalina.ha.session.JvmRouteBinderValve"/>

          <Deployer className="org.apache.catalina.ha.deploy.FarmWarDeployer"
                    tempDir="/tmp/war-temp/"
                    deployDir="/tmp/war-deploy/"
                    watchDir="/tmp/war-listen/"
                    watchEnabled="false"/>

          <ClusterListener className="org.apache.catalina.ha.session.ClusterSessionListener"/>
        </Cluster>
```


---

위의 방법 대신 아래 방법으로도 가능

## ☂️  StaticMember 설정으로 세션 클러스터링 방법

staticMember설정으로 할 경우 위에서 설정한 Linux의 Multicast route를 추가할 필요 없습니다.

$ vi conf/server.xml

```xml
<!-- channelSendOptions 값이 6:동기 방식 8:비동기 방식
        8:비동기 방식 사용시 Receiver의 selectorTimeout을 5000(5초) 이상으로 설정 권장 -->
        <Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"
                 channelSendOptions="6" channelStartOptions="3">

          <!-- Delta Manager -->
          <Manager className="org.apache.catalina.ha.session.DeltaManager"
                   expireSessionsOnShutdown="false"
                   notifyListenersOnReplication="true"/>

          <!-- Backup Manager
          <Manager className="org.apache.catalina.ha.session.BackupManager"
                   expireSessionsOnShutdown="false"
                   notifyListenersOnReplication="true"
                   mapSendOptions="6"/>
          -->

          <Channel className="org.apache.catalina.tribes.group.GroupChannel">

            <!-- Multicast Member -->
            <!--
            <Membership className="org.apache.catalina.tribes.membership.McastService"
                        address="${tomcat.cluster.member.address}"
                        port="${tomcat.cluster.member.port}"
                        frequency="500"
                        dropTime="3000"/>
            -->

            <Receiver className="org.apache.catalina.tribes.transport.nio.NioReceiver"
                      address="192.168.56.7"
                      port="4000"
                      selectorTimeout="100"
                      maxThreads="6"/>

            <Sender className="org.apache.catalina.tribes.transport.ReplicationTransmitter">
              <Transport className="org.apache.catalina.tribes.transport.nio.PooledParallelSender"/>
            </Sender>

            <!-- 이 인터셉터는 모든 노드에 핑으로 체크를 해주는 인터셉터이다.
                 이 인터셉터는 다른 노드가 클러스터를 떠났을 때 모든 노드가 인식 할 수 있도록 다른 노드를 ping 체크한다.
                 이 클래스가 없으면 클러스터가 제대로 작동하는 것처럼 보일 수 있지만 노드를 제거하고 다시 도입하면 세션 복제가 중단 될 수 있다.
                 TcpFailureDetector보다 위쪽에 위치하여야 한다. -->
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.TcpPingInterceptor"/>
            
            <!-- 멤버간 데이터 통신 오류 또는 시간 초과등의 문제가 발생하였을시 감지하는 인터셉터 -->
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.TcpFailureDetector"/>
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.MessageDispatchInterceptor"/>
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.ThroughputInterceptor"/>

            <!-- StaticMember 인터셉터는 멀티캐스팅멤버 대신에 고정값으로 사용할때 선언한다. -->
            <Interceptor className="org.apache.catalina.tribes.group.interceptors.StaticMembershipInterceptor">
              <!-- 자기자신 선언
                   9.0.17 버전 이후로는 LocalMember대신 Member로 동일하게 설정해도 된다.
                   https://tomcat.apache.org/tomcat-9.0-doc/config/cluster-membership.html#Setting
              -->
              <LocalMember className="org.apache.catalina.tribes.membership.StaticMember"
                           domain="staging-cluster"
                           uniqueId="{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1}"/>

              <!-- 고정멤버로 선언할 다른 노드 정보 -->
              <Member className="org.apache.catalina.tribes.membership.StaticMember"
                      port="4010"
                      securePort="-1"
                      host="192.168.56.8"
                      domain="staging-cluster"
                      uniqueId="{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,2}"/>
            </Interceptor>

          </Channel>

          <!-- 해당 필터에 포함되는 요청은 세션데이터 갱신에서 제외한다 -->
          <Valve className="org.apache.catalina.ha.tcp.ReplicationValve"
                 filter=".*\.gif|.*\.js|.*\.jpeg|.*\.jpg|.*\.png|.*\.htm|.*\.html|.*\.css|.*\.txt"/>

          <!-- route 변경시 현재 jvmRoute를 변경해주는 밸브.
               이게 없는경우 route가 변경되어도 jvmRoute값이 유지되어 failback효과를 유도한다 -->
          <Valve className="org.apache.catalina.ha.session.JvmRouteBinderValve"/>

          <!-- 클러스터 노드간 자동배포를 위한 디플로이어 일반적으로 사용하지 않으며 <Host 엘리먼트에 넣어야 정상 동작함
          <Deployer className="org.apache.catalina.ha.deploy.FarmWarDeployer"
                    tempDir="/tmp/war-temp/"
                    deployDir="/tmp/war-deploy/"
                    watchDir="/tmp/war-listen/"
                    watchEnabled="false"/>
          -->

          <!-- DeltaManager 사용시 필요함 -->
          <ClusterListener className="org.apache.catalina.ha.session.ClusterSessionListener"/>
        </Cluster>
```

---

## ❄️  SessionClustering Test Source Code

$ vi webapps/ROOT/index.jsp

```jsx
<%@page import="java.util.ArrayList"%>

<%@page import="java.util.Date"%>

<%@page import="java.util.List"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html>

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>JSP Page</title>

</head>

<body>

<FONT size = 5 COLOR="#0000FF">

Instance 2 <br/><br/>

</FONT>

<hr/>

<FONT size = 5 COLOR="#CC0000">

<br/>

Session Id : <%=request.getSession().getId()%> <br/>

Is it New Session : <%=request.getSession().isNew()%><br/>

Session Creation Date : <%=new Date(request.getSession().getCreationTime())%><br/>

Session Access Date : <%=new Date(request.getSession().getLastAccessedTime())%><br/><br/>

</FONT>

<b>Data List </b><br/>

<hr/>

<ul>

<%

String sName = request.getParameter("sName");

List<String> listOfName = (List<String>) request.getSession().getAttribute("Name");

if (listOfName == null) {

listOfName = new ArrayList<String>();

request.getSession().setAttribute("Name", listOfName);

}

if (sName != null) {

listOfName.add(sName);

request.getSession().setAttribute("Name", listOfName);

}

for (String name : listOfName) {

out.println("<li>"+name + "</li><br/>");

}

%>

</ul>

<hr/>

<form action="index.jsp" method="post">

Name <input type="text" name="sName" />

<input type="submit" value="Add to Cart"/>

</form>

<hr/>

</body>

</html>
```

---

## 🌈 세션클러스터링 정상 여부 확인

브라우저로 서버IP:톰캣포트 접속 한 후

tomcat 1,2 실행 상태에서

톰캣 1에 세션 데이터 값 입력한 후 톰캣1 종료

새로고침해서 톰캣2 데이터가 있는 지 확인하고

톰캣1 실행 후 새로고침해서 톰캣1 세션 데이터 값이 그대로 유지되면 성공

---

주의!

가끔 세션 클러스터링이 바로 안되는 경우가 있다..

다른 설정에 문제가 없다면..

5분 정도 기다렸다가 다시 새로고침 해서 확인하면 될 때가 있습니다.

---


```toc

```
