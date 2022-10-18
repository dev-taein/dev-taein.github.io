---
emoji: 🕰
title: CentOS7 한국 현재 시간 동기화하기
date: '2022-10-18'
author: 아임해피
tags: linux centos7
categories: linux
---

CentOS7 한국 현재 시간 동기화 하는법

```shell
$ rm -rf /etc/localtime
```

```shell
$ ln -s /usr/share/zoneinfo/Asia/Sesoul /etc/localtime
```

확인하기

```shell
$ date
```
