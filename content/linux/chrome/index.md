---
emoji: 🕸
title: CentOS7 Chrome 설치하기
date: '2022-10-27'
author: 아임해피
tags: linux centos7 google-chrome chrome
categories: linux
---

## 🍄 chrome 설치

$ wget [https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm](https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm)

$ yum localinstall google-chrome-stable_current_x86_64.rpm

---

## 🐚 chrome 실행 

설치는 끝이다 아래 명령어로 크롬을 실행 시키자

```shell
$ google-chrome 
```

---

## 🪨 ERROR

만약 실행 시 에러가 발생한다면 아래 방법으로 해결하자

$ vi /opt/google/chrome/google-chrome

```bash
맨 마지막 코드에서 --no-sandbox 추가해서 아래와 같이 변경

exec -a "$0" "$HERE/chrome" "$@" --no-sandbox

```

그리고 Chrome은 root 계정으로 실행하면 에러가 발생한다고 한다~

저는 그냥 무시하고 root로 실행함

어차피 개인 네트워크에서 나만 사용하는 개발 서버여서

굳이 방화벽 설정하고 사용자 계정을 만들 필요가 없다고 생각함

---

## 🍁 alias 등록

이 부분은 안해도 상관없다.

근데 설정 해놓으면 정말 편하다~

$  vi ~/.bashrc

```xml
alias chrome='google-chrome > /dev/null 2>&1 &'
```

$ source ~/.bashrc


```toc

```
