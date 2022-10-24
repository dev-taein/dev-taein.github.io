---
emoji: 🐛
title: docker 컨테이너 전체 실행 명령어
date: '2022-10-24'
author: 아임해피
tags: docker command
categories: docker
---

도커 컨테이너 전체 시작

```shell
$ docker start $(docker ps -a -q)
```

도커 명령어 자동 완성해주는 패키지 설치하기

```shell
$ yum install -y bash-completion
```

설치 후 재부팅하고 docker 커맨드 입력할 때 tab키 누르면 자동으로 완성된다.

docker-compose  파일 여러개 실행

```shell
$ docker-compose -f 파일명 -f 파일명 -f 파일명
```
