---
emoji: 🗄
title: SVN Install (CentOS7)
date: '2022-10-06'
author: 아임해피
tags: linux centos7 svn subversion
categories: svn
---

## Subversion Install & Repository Set

subversion를 패키지 설치가 아닌 소스(컴파일)로 직접 설치하는 방법입니다.

> 다운로드 SITE: [https://subversion.apache.org/download.cgi](https://subversion.apache.org/download.cgi)
 
- README

  - 디렉토리 및 사용자 계정은 본인의 환경에 맞게 추가 또는 변경하여 사용 할 것

  - bin이 위치한 svn 디렉토리는 /engn002/tools/svn 임

## svn 관련 패키지를 설치 할 디렉토리 생성

$ mkdir /engn002/tools/svn

$ mkdir /engn002/tools/svn/apr

$ mkdir /engn002/tools/svn/apr-util

$ mkdir /engn002/tools/svn/zlib

---

svntemp 디렉토리는 작업할 tar 파일들을 모아 놓은 곳

/engn002/temp/svntemp/ 디렉토리에서 tar 파일 받기

$ wget [https://archive.apache.org/dist/subversion/subversion-1.7.14.tar.gz](https://archive.apache.org/dist/subversion/subversion-1.7.14.tar.gz)

$ wget [http://archive.apache.org/dist/apr/apr-1.5.2.tar.gz](http://archive.apache.org/dist/apr/apr-1.5.2.tar.gz)

$ wget [http://archive.apache.org/dist/apr/apr-util-1.5.4.tar.gz](http://archive.apache.org/dist/apr/apr-util-1.5.4.tar.gz)

$ wget [http://www.sqlite.org/sqlite-autoconf-3070603.tar.gz](http://www.sqlite.org/sqlite-autoconf-3070603.tar.gz) --no-check-certificate

$ wget [http://prdownloads.sourceforge.net/libpng/zlib-1.2.8.tar.gz](http://prdownloads.sourceforge.net/libpng/zlib-1.2.8.tar.gz)

---

## subversion 및 패키지 tar파일 압축풀기

$ tar xvfz subversion-1.7.14.tar.gz

$ tar xvfz apr-1.7.14.tar.gz

$ cd apr-1.5.2

$ ./configure --prefix=/engn002/tools/svn/apr

$ make && make install

$ make clean

---

apr-util 설치

$ tar xvfz apr-util-1.5.4.tar.gz

$ cd apr-util-1.5.4

$ ./configure --prefix=/engn002/tools/svn/apr-util --with-apr=/engn002/tools/svn/apr

$ make && make install

$ make clean

---

sqlite 설치

$ tar xvfz sqlite-autoconf-3070603.tar.gz

$ cd subversion-1.7.14

$ mkdir sqlite-amalgamation

$ cd ../sqlite-autoconf-3070603

$ cp sqlite3.c ../subversion-1.7.14/sqlite-amalgamation

$ cd ..

$ tar -zxvf zlib-1.2.8.tar.gz

$ cd zlib-1.2.8

$ ./configure --prefix=/engn002/tools/svn/zlib

$ make && make install

$ make clean

---

svn 설치

$ cd subversion-1.7.14

$ ./configure --prefix=/engn002/tools/svn/ --with-apr=/engn002/tools/svn/apr --with-apr-util=/engn002/tools/svn/apr-util --with-zlib=/engn002/tools/svn/zlib --without-berkeley-db

$ make && make install

버전 확인
$ svn --version

```
svn, version 1.7.14 (r1542130)
   compiled Sep 30 2020, 17:44:04
```


---

## SVN 서비스 설정

- repo 생성

$ cd /engn002/tools

$ mkdir data

$ cd data

$ mkdir svn_repo

$ cd svn_repo

$ ./svnadmin create /engn002/tools/data/svn_repo/server

$ ./svnadmin create /engn002/tools/data/svn_repo/client

$ ./svnadmin create /engn002/tools/data/svn_repo/test

---

svn 계정 생성

$ cd /engn002/tools/data/svn_repo/client/conf

$ vi authz

```
[/]
*=r
svnadm = rw
svnusr = r
```

$ vi passwd

```
[users]
# harry = harryssecret
# sally = sallyssecret
svnadm = rootroot
svnusr = rootroot
```

$ vi svnserve.conf

```
anon-access = none
auth-access = write
password-db = passwd
authz-db = authz
realm = My Repository
```

편집 할 때 공백이 있으면 안됨

---

svn 시작

$ cd /engn002/tools/svn/bin

$ ./svnserve -d -r /engn002/tools/data/svn_repo/ --listen-port 3690

또는

$ /engn002/tools/svn/bin/./svnserve -d --threads -r /engn002/tools/data/svn_repo

실행 여부 확인

$ ps -ef | grep svn

```
root      1444     1  0 19:37 ?        00:00:00 ./svnserve -d -r /engn002/tools/data/svn_repo/ --listen-port 3690
```

저장소 확인

$ svn info svn://192.168.56.7/client

```
Path: test
URL: svn://192.168.56.7/test
Repository Root: svn://192.168.56.7/test
Repository UUID: 84e33a9a-f3a9-11ec-a8e9-21ad8211e214
Revision: 0
Node Kind: directory
Last Changed Rev: 0
Last Changed Date: 2022-06-24 19:36:34 +0900 (Fri, 24 Jun 2022)
```

---

## rc.local 이용하여 부팅 시 SVN 자동 실행 설정하는법

$ chmod +x /etc/rc.d/rc.local

$ vi /lib/systemd/system/rc-local.service

```
[Install]
WantedBy=multi-user.target
```

$ vi /etc/rc.d/rc.local

```bash
su wasadm -c 'svnserve -d -r /engn002/tools/data/svn_repo'
```

```bash
su - wasadm -c 'svnserve -d -r /engn002/tools/data/svn_repo'
su - webadm -c '/engn002/web/apache/bin/apachectl start'
su - wasadm -c 'sh /engn002/was/tomcat8-1/bin/startup.sh'
su - jenkins-app -c 'sh /engn002/tools/jenkins/./start_jenkins.sh'
```

$ systemctl start rc-local.service

$ systemctl enable rc-local.service

---

## 백업 dump 만들기

dump 생성

$ svnadmin dump /var/opt/svn/server > ~/svn_server.dmp

복구

$ /programs/sw/svn/bin/svnadmin **load** /programs/data/svn_repo/server < ~/svn_server.dmp

---

## 디렉토리 권한 및 소유권 변경

$ cd /engn002

$ chown -R wasadm:www tools/

---

## SVN trunk, tags, branches 기본 디렉토리 만들기

$ svn mkdir svn://192.168.56.7/client/trunk

$ svn mkdir svn://192.168.56.7/client/branches

$ svn mkdir svn://192.168.56.7/client/tags

<details>
<summary>[ERROR]</summary>

svn: E205007: Could not use external editor to fetch log message; consider setting the $SVN_EDITOR environment variable or using the --message (-m) or --file (-F) options

svn: E205007: None of the environment variables SVN_EDITOR, VISUAL or EDITOR are set, and no 'editor-cmd' run-time configuration option was found

Solution
$ ~/.bash_profile

```
#Subversion
SVN_EDITOR=/usr/bin/vim
export SVN_EDITOR
```

$ source ~/.bash_profile

- 저장소 생성하고 편집기 나오기
    - :q!
    - c 눌러서 컨티뉴
    - 계정 비밀번호 처음엔 그냥 엔터 누르고
    - 계정 아이디 svnadm
    - 패스워드 rootroot
    - 입력 후 끝
</details>

---

## 저장소 확인

$ svn list svn://192.168.56.7/client/

---

## 저장소 삭제

svn kill 하고 본인이 지정한 repository 디렉토리 삭제하면 됨

$ rm -rf /svn_repos/TestRepo1

---

## SVN 소스 내려받기

$ svn co svn://ip 또는 도메인 주소/저장소명

또는

$ svn checkout svn://ip 또는 도메인 주소/저장소명

