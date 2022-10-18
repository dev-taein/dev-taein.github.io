---
emoji: 🕰
title: CentOS7 한국 현재 시간 동기화하기
date: '2022-10-18'
author: 아임해피
tags: linux centos7
categories: linux
---

시간 동기화하는 방법은 여러 방법이 있으나..

대부분 서버를 재접속하면 날짜와 시간이 다시 초기화되었는데

저는 아래 방법으로 하니까 초기화 되지않고 영구적으로 적용되었습니다.


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
