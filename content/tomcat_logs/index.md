---
emoji: 🌕
title: tomcat log 디렉토리 변경
date: '2022-09-30'
author: 아임해피
tags: tomcat logs directory
categories: tomcat
---

## ⭐️ Tomcat Log Directory Changed

본인의 경우 log 디렉토리를  /engn003/logs/was 이 위치에 사용함

아래 설정파일에서 /engn003/logs/was 으로 되어 있는 부분을

본인이 변경하고 싶은 디렉토리 위치로 변경하면 됩니다.

$ vi conf/server.xml

```
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="/engn003/logs/was">
```

---

$ vi bin/catalina.sh

```
# Before
CATALINA_OUT="$CATALINA_BASE"/logs/catalina.out    

# After
CATALINA_OUT=/engn003/logs/catalina.out                   

```

---

$ vi logging.properties

Before

```xml
catalina.org.apache.juli.AsyncFileHandler.level = FINE

catalina.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs

catalina.org.apache.juli.AsyncFileHandler.prefix = catalina.

catalina.org.apache.juli.AsyncFileHandler.encoding = UTF-8

localhost.org.apache.juli.AsyncFileHandler.level = FINE

localhost.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs

localhost.org.apache.juli.AsyncFileHandler.prefix = localhost.

localhost.org.apache.juli.AsyncFileHandler.encoding = UTF-8

manager.org.apache.juli.AsyncFileHandler.level = FINE

manager.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs

manager.org.apache.juli.AsyncFileHandler.prefix = manager.

manager.org.apache.juli.AsyncFileHandler.encoding = UTF-8

host-manager.org.apache.juli.AsyncFileHandler.level = FINE

host-manager.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs

host-manager.org.apache.juli.AsyncFileHandler.prefix = host-manager.

host-manager.org.apache.juli.AsyncFileHandler.encoding = UTF-8
```

After

```xml
catalina.org.apache.juli.AsyncFileHandler.level = FINE

catalina.org.apache.juli.AsyncFileHandler.directory = /engn003/logs

catalina.org.apache.juli.AsyncFileHandler.prefix = catalina.

catalina.org.apache.juli.AsyncFileHandler.encoding = UTF-8

localhost.org.apache.juli.AsyncFileHandler.level = FINE

localhost.org.apache.juli.AsyncFileHandler.directory = /engn003/logs

localhost.org.apache.juli.AsyncFileHandler.prefix = localhost.

localhost.org.apache.juli.AsyncFileHandler.encoding = UTF-8

manager.org.apache.juli.AsyncFileHandler.level = FINE

manager.org.apache.juli.AsyncFileHandler.directory = /engn003/logs

manager.org.apache.juli.AsyncFileHandler.prefix = manager.

manager.org.apache.juli.AsyncFileHandler.encoding = UTF-8

host-manager.org.apache.juli.AsyncFileHandler.level = FINE

host-manager.org.apache.juli.AsyncFileHandler.directory = /engn003/logs

host-manager.org.apache.juli.AsyncFileHandler.prefix = host-manager.

host-manager.org.apache.juli.AsyncFileHandler.encoding = UTF-8
```

```toc

```
