---
emoji: ⚡️
title: tomcat jndi 사용하기
date: '2022-10-01'
author: 아임해피
tags: tomcat jndi java naimg directory interface centos7 mysql oracle
categories: tomcat
---

Tomcat으로 JNDI(Java Naimg Directory Interface) 설정하기

---


## 🍋 Tomcat 설정

$ vi server.xml

본인의 DB정보에 맞게 수정해서 입력

여기서 설정한 jdbc/MYSQL_DB  적혀있는 부분은 jdbc/사용할이름 이런 식으로 수정해서 사용해도 된다.

```xml

<!-- Global JNDI resources
       Documentation at /docs/jndi-resources-howto.html
  -->
  <GlobalNamingResources>
    <!-- Editable user database that can also be used by
         UserDatabaseRealm to authenticate users
    -->
    <Resource name="UserDatabase" auth="Container"
              type="org.apache.catalina.UserDatabase"
              description="User database that can be updated and saved"
              factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
              pathname="conf/tomcat-users.xml" />
              
<!-- MySQL DB -->
<Resource
        auth="Container"
        driverClassName="com.mysql.jdbc.Driver"
        name="jdbc/MYSQL_DB"
        password="your_passwd"
        type="javax.sql.DataSource"
        url="jdbc:mysql://your_mysql_ip:3306/javatest"
        username="your_name" />
<!-- Oracle DB -->
<Resource
        auth="Container"
        driverClassName="oracle.jdbc.OracleDriver"
        name="jdbc/ORACLE_DB"
        password="your_passwd"
        type="javax.sql.DataSource"
        url="jdbc:oracle:thin:@//your_oracle_ip:1521/XE"
        username="your_name" />
        
    </GlobalNamingResources>
```

---

$ vi context.xml

```xml
<ResourceLink global="jdbc/MYSQL_DB" name="jdbc/MYSQL_DB" type="javax.sql.DataSource"/>
<ResourceLink global="jdbc/ORACLE_DB" name="jdbc/ORACLE_DB" type="javax.sql.DataSource"/>
```

$ conf/web.xml 수정

```xml
	  <resource-ref>
        <description></description>
        <res-ref-name>jdbc/MYSQL_DB</res-ref-name>
        <res-ref-name>jdbc/ORACLE_DB</res-ref-name>
        <res-type>javax.sql.DataSource</res-type>
        <res-auth>Container</res-auth>
    </resource-ref>
<distributable/>
```

## 🍌 TEST

tomcat jsp파일로 jndi test 코드

```html
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<sql:query var="rs" dataSource="jdbc/MYSQL_DB">
select id, foo, bar from testdata
</sql:query>
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
<hr/>
<h2>MYSQL DB Connection Test</h2>
<c:forEach var="row" items="${rs.rows}">
    Foo ${row.foo}<br/>
    Bar ${row.bar}<br/>
</c:forEach>
<br/>
<br/>
<hr/>
<b>Session Data </b><br/>
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
Value <input type="text" name="sName" />
<input type="submit" value="Add"/>
</form>
<hr/>
</body>
</html>
```

위의 샘플 코드에서 아래 sql부분을 찾아서 본인 DB에 맞게 수정해서 사용
```sql
<sql:query var="rs" dataSource="jdbc/MYSQL_DB">
select id, foo, bar from testdata
</sql:query>
```

<br/>

MYSQL의 경우 DB정보는 TOMCAT 공식문서 참고

[https://tomcat.apache.org/tomcat-8.5-doc/jndi-datasource-examples-howto.html#MySQL_DBCP_2_Example](https://tomcat.apache.org/tomcat-8.5-doc/jndi-datasource-examples-howto.html#MySQL_DBCP_2_Example)

---

## 🍇 lib 추가 

본인에게 맞는 DB 버전으로 추가하면 된다..

나 같은 경우 mysql8.0.23를 사용한다.

$ cd tomcat/lib

$ wget [https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.23/mysql-connector-java-8.0.23.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.23/mysql-connector-java-8.0.23.jar)

$ wget [https://repo1.maven.org/maven2/javax/servlet/jstl/1.2/jstl-1.2.jar](https://repo1.maven.org/maven2/javax/servlet/jstl/1.2/jstl-1.2.jar)

$ chmod 755 jstl-1.2.jar mysql-connector-java-8.0.23.jar

oracle도 자신에게 맞는 버전을 찾아서 lib 디렉토리에 넣어주자

---

<details>
<summary>[ERROR]</summary>

java.sql.SQLException: Cannot create PoolableConnectionFactory (Access denied for user
   
- mysql 계정 id, password 다시 확인하기 
  - Mysql 접속 후 > $ mysql -u root -p 
  - $ use mysql
  - $ select host, user, authentication_string from user;
  - 또는 mysql 계정이 외부 접속이 안되는 거임

</details>

```toc

```
