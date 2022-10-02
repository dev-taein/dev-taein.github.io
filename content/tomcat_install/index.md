---
emoji: 🫖
title: Tomcat 설치하기 (CentOS7)
date: '2022-10-02'
author: 아임해피
tags: tomcat linux centos7 install
categories: tomcat
---

## 🏹 Tomcat Install

mirror사이트에서 원하는 톰캣 버전 확인하고 링크 주소 복사

mirror : [https://archive.apache.org/dist/tomcat/tomcat-8/v8.5.3/bin/](https://archive.apache.org/dist/tomcat/tomcat-8/v8.5.3/bin/)

설치할 디렉토리 이동 후 wget 링크주소 입력

$ wget [https://downloads.apache.org/tomcat/tomcat-8/v8.5.79/bin/apache-tomcat-8.5.79.tar.gz](https://downloads.apache.org/tomcat/tomcat-8/v8.5.79/bin/apache-tomcat-8.5.79.tar.gz)

압축풀기 

$ tar xvf apache-tomcat-8.5.79-src.tar.gz

톰캣 디렉토리 이름 변경

$ mv apache-tomcat-8.5.79-src tomcat8-1

## 🥡 alias로 tomcat 바로 실행, 종료 설정하기

$ vi ~/.bashrc

```
alias tomcat.start='cd /engn002/was/tomcat8-1/bin; ./startup.sh'
alias tomcat.stop='cd /engn002/was/tomcat8-1/bin; ./shutdown.sh'
```

/engn002/was/tomcat8-1/bin  톰캣이 설치된 디렉토리 위치이다.

$ source ~/.bashrc

이제 tomcat.start 입력하면 바로 톰캣이 실행되고

tomcat.stop 입력하면 톰캣이 종료된다.

```toc

```
