---
emoji: 🍷
title: CentOS7 Wine으로 카카오톡 설치 및 실행하기
date: '2022-10-26'
author: 아임해피
tags: linux centos7 wine
categories: linux
---

Linux CentOS7 환경에서 WINE 설치 및 카카오톡 실행하기

## 🍹 패키지 설치

$ yum -y install samba-winbind-clients

$ yum -y install libjpeg-turbo-devel libtiff-devel freetype-devel

$ yum -y install glibc-devel.{i686,x86_64} libgcc.{i686,x86_64} libX11-devel.{i686,x86_64} freetype-devel.{i686,x86_64} gnutls-devel.{i686,x86_64} libxml2-devel.{i686,x86_64} libjpeg-turbo-devel.{i686,x86_64} libpng-devel.{i686,x86_64} libXrender-devel.{i686,x86_64} alsa-lib-devel.{i686,x86_64} glib2-devel.{i686,x86_64} libSM-devel.{i686,x86_64}

$ yum -y install libvkd3d-devel.x86_64 glibc-devel libstdc++-devel icoutils openal-soft-devel prelink gstreamer-plugins-base-devel gstreamer-devel ImageMagick-devel fontpackages-devel libv4l-devel gsm-devel giflib-devel libXxf86dga-devel mesa-libOSMesa-devel isdn4k-utils-devel libgphoto2-devel fontforge libusb-devel lcms2-devel audiofile-devel

$ yum -y install openldap-devel libxslt-devel libXcursor-devel libXi-devel libXxf86vm-devel libXrandr-devel libXinerama-devel libXcomposite-devel mesa-libGLU-devel ocl-icd opencl-headers libpcap-devel dbus-devel ncurses-devel libsane-hpaio pulseaudio-libs-devel cups-devel libmpg123-devel fontconfig-devel sane-backends-devel.x86_64

$ yum -y install glibc-devel.i686 dbus-devel.i686 freetype-devel.i686 pulseaudio-libs-devel.i686 libX11-devel.i686 mesa-libGLU-devel.i686 libICE-devel.i686 libXext-devel.i686 libXcursor-devel.i686 libXi-devel.i686 libXxf86vm-devel.i686 libXrender-devel.i686 libXinerama-devel.i686 libXcomposite-devel.i686 libXrandr-devel.i686 mesa-libGL-devel.i686 mesa-libOSMesa-devel.i686 libxml2-devel.i686 libxslt-devel.i686 zlib-devel.i686 gnutls-devel.i686 ncurses-devel.i686 sane-backends-devel.i686 libv4l-devel.i686 libgphoto2-devel.i686 libexif-devel.i686 lcms2-devel.i686 gettext-devel.i686 isdn4k-utils-devel.i686 cups-devel.i686 fontconfig-devel.i686 gsm-devel.i686 libjpeg-turbo-devel.i686 pkgconfig.i686 libtiff-devel.i686 unixODBC.i686 openldap-devel.i686 alsa-lib-devel.i686 audiofile-devel.i686 freeglut-devel.i686 giflib-devel.i686 gstreamer-devel.i686 gstreamer-plugins-base-devel.i686 libXmu-devel.i686 libXxf86dga-devel.i686 libieee1284-devel.i686 libpng-devel.i686 librsvg2-devel.i686 libstdc++-devel.i686 libusb-devel.i686 unixODBC-devel.i686 qt-devel.i686 libpcap-devel.i686

$ yum -y install gcc flex bison

---

## 🍾 wine 안정버전(7.0) 다운로드 및 설치

$ wget [http://dl.winehq.org/wine/source/7.0/wine-7.0.tar.xz](http://dl.winehq.org/wine/source/7.0/wine-7.0.tar.xz)

$ tar -xvf wine-7.0.tar.xz 

$ cd wine-7.0/

$ ./configure

$ make

$ make install

---

## 🧉 Xvfb 설치 및 실행

$ yum -y install xorg-x11-server-Xvfb

$ Xvfb -ac :1 -screen 0 1024x768x16 &

Windows 프로그램 실행

$ ./wine 프로그램이름.exe

“Xvfb -ac :1 -screen 0 1024x768x16 &” 이 커맨드는 부팅 시 자동으로 실행되게 하기

$ chmod +x /etc/rc.d/rc.local

$ vi /lib/systemd/system/rc-local.service

```
[Install]
WantedBy=multi-user.target
```

$ vi /etc/rc.d/rc.local

```
Xvfb -ac :1 -screen 0 1024x768x16 &
```

카카오톡 설치파일을 wine디렉토리에 넣고

$ ./wine KaKaoTalk.exe 

카카오톡을 설치할때 Z드라이버에 설치하기

## 🥃 alias설정

$ vi ~/.bashrc

```bash
alias kakao='/app/wine-7.0/./wine /app/kakao/KakaoTalk/KakaoTalk.exe > /dev/null 2>&1 &’
```

## 🍸 한글 설정

한글 입력이 안될 때  (참고  [https://wp.openframe.co.kr/?page_id=167&vid=9](https://wp.openframe.co.kr/?page_id=167&vid=9) )

$ yum install ibus* ibus-*

$ ibus-setup

$ vi ~/.bashrc

```bash
export GTK_TM_MODULE=ibus
export QT_TM_MODULE=ibus
export XMODIFIERS=@im=ibus
if test `ps axo user:20,pid,tty,cmd | grep -v grep | grep "/usr/libexec/ibus-dconf" 2> /dev/null | grep $USER | grep "pts/" | wc -l` -eq 0;
 then
  ibus-daemon --xim &
fi
```

$ source ~/.bashrc

```toc

```
