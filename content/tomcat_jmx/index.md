---
emoji: 🐻
title: tomcat JMX 모니터링 사용하기
date: '2022-09-27'
author: 아임해피
tags: tomcat jmx monitoring
categories: tomcat
---


- **JMX Set**
    - jmx lib에 추가 [https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-catalina-jmx-remote](https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-catalina-jmx-remote)
    - jmx보는 방법은 jdk 디렉토리에서 jconsole 실행

## Tomcat 설정

$ /conf/server.xml 수정 (9840은 접속할 포트)

```xml
<Listener className="org.apache.catalina.mbeans.JmxRemoteLifecycleListener"

rmiRegistryPortPlatform="9840" rmiServerPortPlatform="9841"/>
```

ID와 패스워드 없이 설정하는 법


$ vi \tomcat\bin\setenv.sh

```bash
JMX_OPTS=" -Dcom.sun.management.jmxremote \

-Dcom.sun.management.jmxremote.authenticate=false \

-Djava.rmi.server.hostname=your_host_ip \

-Dcom.sun.management.jmxremote.ssl=false "

CATALINA_OPTS=" ${JMX_OPTS} ${CATALINA_OPTS}"
```

ID와 패스워드를 사용하여 설정하는 법

```bash
JMX_OPTS=" -Dcom.sun.management.jmxremote \

-Dcom.sun.management.jmxremote.authenticate=true \

-Dcom.sun.management.jmxremote.password.file=$CATALINA_BASE/conf/jmxremote.password  \

-Dcom.sun.management.jmxremote.access.file=$CATALINA_BASE/conf/jmxremote.access  \

-Djava.rmi.server.hostname=your_host_ip \

-Dcom.sun.management.jmxremote.ssl=false "
```

위에서 설정한 톰캣 conf 디렉토리에서 계정 만들기

$ vi conf/jmxremote.access

```bash
tomcat readonly

admin readwrite
```

$ vi  conf/jmxremote.password

```bash
tomcat tomcat

admin rootroot
```

이제 Jconsole를 실행하여 IP:PORT 입력 후

하단에 ID, 패스워드 입력하면 접속이 된다.


접속이 안되면iptables 중지하기 

$ systemctl status iptables

$ systemctl stop iptables

$ systemctl disable iptables


iptables 사용할거면 포트 열어주시면 됩니다.
