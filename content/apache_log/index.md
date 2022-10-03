---
emoji: ⚙️
title: apache log 디렉토리 변경
date: '2022-10-04'
author: 아임해피
tags: linux centos7 apache mod_jk httpd logs log directory
categories: apache
---

## ⛏ Apache Log Directory Changed

본인의 경우 log 디렉토리를 /engn003/logs/web 이 경로로 사용함

아래 코드에서 /engn003/logs/web 해당 부분만 자신이 설정할 디렉토리로 변경하면 됨

### 🔧 apache httpd.conf 파일 수정

$ vi conf/httpd.conf

```
변경 전
CustomLog "logs/access_log" common

변경 후
CustomLog "/engn003/logs/web/access_log" common
```

```
변경 전
ErrorLog "logs/error_log"

변경 후
ErrorLog "/engn003/logs/web/error_log"
```

---

## 🪛 mod_jk log 디렉토리 변경

apache랑 tomcat를 연동해서 사용하는 경우

본인은 mod_jk로 연동해서 사용함

mod_jk 로그 디렉토리도 아래와 같이 변경

```
변경 전
<IfModule mod_jk.c>
JkWorkersFile conf/workers.properties
JkShmFile logs/mod_jk.shm
JkLogFile logs/mod_jk.log
JkLogLevel info
JkLogStampFormat "[%y %m %d %H:%M:%S] "
</IfModule>

변경 후
<IfModule mod_jk.c>
JkWorkersFile conf/workers.properties
JkShmFile /engn003/logs/web/mod_jk.shm
JkLogFile /engn003/logs/web/mod_jk.log
JkLogLevel 
```

```toc

```
