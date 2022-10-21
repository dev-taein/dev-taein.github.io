---
emoji: 🪖
title: ls -ltr를 사용하는 습관을 기르자
date: '2022-10-17'
author: 아임해피
tags: linux centos7
categories: linux
---

본인의 경우 파일 목록을 볼 때

ls 또는 ll를 주로 사용하고

숨김파일의 경우 ls -al 옵션을 사용한다.

위의 방법보다 더 좋은 옵션이 있는 것을 알게 되어 아래 명령을 사용하는 습관을 기르는 중이다..

보통 linux 좀 한다하면 ls -ltr를 많이 사용하더군요

```shell
ls -ltr
```
l : 파일의 자세한 정보

t : 파일의 시간

r : 내림차순 정렬

```shell
ls -altr
```
a : 숨김파일 표시

alias를 이용하여 별칭을 주어서 사용해도 된다.

저는 일단 ls -ltr 커맨드에 익숙해지기 위해서 나중에 설정하는 걸로 하겠습니다...ㅎ
