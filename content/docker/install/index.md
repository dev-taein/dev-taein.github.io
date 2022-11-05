---
emoji: 🐬
title: Docker 설치 (CentOS7)
date: '2022-11-05'
author: 아임해피
tags: linux centos7 docker install
categories: docker
---

Docker Install

## 📓 Docker Install

- script를 이용한 최신버전 설치
    - curl -sSL [https://get.docker.com](https://get.docker.com/) | sh


- 패키지 매니저를 이용한 설치
    - docker운영에 필요한 필수 패키지 설치
        - $ yum install -y yum-utils device-mapper-persistent-data lvm2
    - dokcer repository 추가
        - $ yum-config-manager --add-repo [https://download.docker.com/linux/centos/docker-ce.repo](https://download.docker.com/linux/centos/docker-ce.repo)
    - docker 설치가능 버전 확인
        - $ yum list docker-ce --showduplicates
    - docker 최신버전 설치
        - $ yum install -y docker-ce
    - 특정 docker 버전 설치
        - $ yum install -y docker-ce-20.10.6

## 📔 방화벽 해제

$ systemctl stop firewalld

$ systemctl disable firewalld

$ /etc/selinux/config 파일 편집

```shell
SELINUX=disabled
```

## 📒 docker 데몬을 시작하고 시스템 부팅 시에 자동 시작

$ systemctl enable docker

$ systemctl start docker

$ systemctl status docker

## 📕 도커 명령어 자동 완성

$ yum install -y bash-completion

위의 패키지를 설치하고 커맨드라인에 "doc"만 입력하고 tab키를 누르면 "docker"가 입력되는 것을 볼 수 있다.

재부팅 해야 적용됨


```toc

```
