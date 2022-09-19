---
emoji: ⚓️️
title: GitHub Blog Gatsby 테마 사용하고 커스텀 도메인 등록하기
date: '2022-09-14 19:00:00'
author: 아임해피
tags: 블로그 github gatsby
categories: blog
---

Github Blog를 만들고 Gatsby 테마 적용하기 Custom domain을 이용하여 Netlify 자동 배포를 구성하기

---

## 🏹  GitHub 설정

- GitHub Repository 하나 생성해줍니다.
- Repository 이름은 본인 ID + github.io 입력하면 됩니다.
- 저는 이미 만들었기 때문에 생성하지 못한다고 나오네요~

![repository](repository.png)


---

## 🎲 도메인 설정

- 도메인 구매
    - 저는 [https://www.hosting.kr/](https://www.hosting.kr/) 에서 구매하였습니다.

    다른 곳도 많으니 원하시는 곳에서 구매하시길 추천드립니다.

    제가 구매한 도메인은 www.imhappycoder.com 입니다.
- 호스팅 사이트에서 도메인 레코드 설정
    - 도메인 관리 —> DNS 레코드 관리 이동 후 —> 새 DNS 레코드 추가
- GitHub가 사용하는 레코드와 본인이 구매한 도메인 레코드를 추가하면 됩니다.
- 유형은 A, 이름은 @ 입니다. 값은 아래 있는 거 하나씩 입력
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
- 본인이 구매한 도메인 이름이 “testdns”이면 CNAME 값 필드에 “testdns.github.io”로 입력하시면 됩니다.
- 유형은 CNAME, 이름은 www, 값은 도메인이름.github.io 입니다.
TTL은 보통 1시간을 해놓습니다.

![dns_github](dns_github.png)


아까만든 Github Repository 설정을 변경해줍니다.

Page에서 Custom domain에 구입한 도메인을 입력하고 DNS Check를 해줍니다.<br/>확인하는데 시간이 조금 걸립니다.

아래에 Enforce HTTPS 체크박스에 체크해주시면 됩니다.<br/>DNS 확인 중이여도 이 체크박스만 체크가 되면 사용하는데에 문제없습니다.
![repository_page](repository_page.png)

Custom domain을 설정하고 나면 CNAME 파일이 레포지토리에 자동 생성됩니다.


---

## 🌼 Gatsby 테마 사용하기

- Gatsby 설치

```
npm install -g gatsby-cli
```

- Gatsby 프로젝트 만들기

제가 받은 테마는 zoomkoding-gatsby-blog 테마입니다.

```
gatsby new [프로젝트 이름] [적용할 테마의 주소]
gatsby new my-gatsby-blog https://github.com/zoomKoding/zoomkoding-gatsby-blog
```

테마는 여러분들이 사용하실 테마를 고르신 후 해당 테마의 GitHub URL을 적으시면 됩니다.

Gatsby 테마 모음 사이트 [https://www.gatsbyjs.com/starters/](https://www.gatsbyjs.com/starters/)

- 생성한 Gatsby 프로젝트를 GitHub Repository에 Push해줍니다.
```
git init
git branch -M main
git add .
git commit -m "message"
git remote add origin "본인이생성한Repositry주소.git"
git push -u origin main
```

GitHub에서 repository 확인하여 정상적으로 gatsby 프로젝트가 배포되었는지 확인해 보세요

그리고 본인이 구매한 도메인으로 접속해서 페이지가 정상적으로 나온다면 성공입니다.


### 🩲 localhost로 확인하는 방법

Gatsby 프로젝트 디렉토리로 이동
```
yarn gatsby develop
```
정상적으로 빌드가 되면 localhost:8000 접속해서 확인

yarn gatsby serve는 9000포트 테스트 서버

yarn gatsby develop는 8000포트 개발 서버

<details>
<summary style="color: red">push하고 [ERORR] 발생 시</summary>


```
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/im-happy-coder/im-happy-coder.github.io.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

- 아래 명령어로 푸쉬
```
git push -u --force origin main
```
</details>

---

## 🛕 Netlify 배포 하기

배포 방식은 Netlify와 Github Pages 두 가지 있습니다.

저는 Custom domain을 사용하기 때문에 Netlify가 적절하다고 판단하여 Netlify로 배포하겠습니다.

### 🧶 Github Pages로 배포하려면 ?
만약 Cusom domain을 사용하지 않으시면 Github Pages로 배포해주세요.

[여기](https://hislogs.com/make-gatsby-blog/) 클릭 하셔서 7.Github Pages로 배포하기 보셔서 하시면 됩니다.

### 👒 Netlify 배포 시작
1. Netlify 회원가입 [https://netlify.com](https://netlify.com)
2. GitHub 계정과 Repository 연동 해주세요(저는 회원가입하고 로그인하니까 연동 할 수 있게 바로 페이지가 뜨더라구요)
3. Netlify CLI 설치
    ```
    npm install -g netlify-cli
    ```
4. Gatsby 프로젝트 디렉토리에 netlify.toml 생성
    ```
    [build]
      publish = "public"
      command = "npm run build"
    [build.environment]
      NODE_VERSION = "14"
      NPM_VERSION = "7.6.0"
    ```
5. Netlify에 Gatsby 프로젝트 업로드
    ```
    yarn build
    netlify deploy --prod
    ```
    해당 명령어 입력하면 Site name 입력하라고 하는데 엔터치고 넘어가도 상관없습니다.
    name은 Netlify 사이트에서 변경할 수 있어요.

6. 호스팅 사이트에서 CNAME 변경 (CNAME 레코드 값을 "도메인이름.netlify.app" 으로 변경)<br/>
전에 등록한 Github의 A레코드는 필요없습니다. 삭제해주세요.
    ![dns_netlify](dns_netlify.png)

7. Netlify 사이트 설정
    - 사이트 이름 변경하는 법
    - Netlify접속 > 본인이 등록한 Repository 클릭 > 상단 맨 왼쪽에 Site Settings 클릭 > 아래 Site infomation에 Change site name 클릭
   ![rename](rename.png)

8. Netlify Custom domain 등록
   - Netlify 사이트에 등록된 레포지토리 클릭
   - Domain settings에 custom domains에 본인 도메인을 입력해 줍니다.
   - 도메인이 등록 완료되면 아래와 같이 도메인이 확인됩니다. (시간이 좀 걸릴 수도 있어요)
   ![netlify_domain](netlify_domain.png)
   - 아래에 HTTPS 인증도 같이 해주세요
   ![netlify_https](netlify_https.png)

9. Repository에 push시 자동 배포 설정
    - Build & Deploy 탭에서 Build settings
    - Build Command 값 수정 -> CI=false npm run build
   ![netlify_deploy](netlify_deploy.png)
    - 이제 Github repository에 push하면 자동으로 Netlify가 배포를 시작합니다.
    
<details>
<summary style="color: red"> Gatsby 빌드 시 [ERROR] 발생 시</summary>

- 빌드 에러 
```bash
    11:41:14 AM: failed Building production JavaScript and CSS bundles - 18.640s
    11:41:14 AM: error Generating JavaScript bundles failed
    11:41:14 AM: Can't resolve '@emotion/react' in '/opt/build/repo/node_modules/@mui/styled-engine/GlobalStyles'
    11:41:14 AM: If you're trying to use a package make sure that '@emotion/react' is installed. If you're trying to use a local file make sure that the path is correct.
    11:41:14 AM: error Generating JavaScript bundles failed
    11:41:14 AM: Can't resolve '@emotion/react' in '/opt/build/repo/node_modules/@mui/styled-engine/StyledEngineProvider'
    11:41:14 AM: If you're trying to use a package make sure that '@emotion/react' is installed. If you're trying to use a local file make sure that the path is correct.
    11:41:14 AM: error Generating JavaScript bundles failed
    11:41:14 AM: Can't resolve '@emotion/styled' in '/opt/build/repo/node_modules/@mui/styled-engine'
    11:41:14 AM: If you're trying to use a package make sure that '@emotion/styled' is installed. If you're trying to use a local file make sure that the path is correct.
    11:41:14 AM: error Generating JavaScript bundles failed
    11:41:14 AM: Can't resolve '@emotion/react' in '/opt/build/repo/node_modules/@mui/styled-engine'
    11:41:14 AM: If you're trying to use a package make sure that '@emotion/react' is installed. If you're trying to use a local file make sure that the path is correct.
    11:41:14 AM: error Generating JavaScript bundles failed
    11:41:14 AM: Can't resolve '@emotion/react' in '/opt/build/repo/node_modules/gatsby-plugin-material-ui'
    11:41:14 AM: If you're trying to use a package make sure that '@emotion/react' is installed. If you're trying to use a local file make sure that the path is correct.
    11:41:14 AM: not finished Running gatsby-plugin-sharp.IMAGE_PROCESSING jobs - 39.418s
    11:41:15 AM: 
    11:41:15 AM: ────────────────────────────────────────────────────────────────
    11:41:15 AM:   "build.command" failed                                        
    11:41:15 AM: ────────────────────────────────────────────────────────────────
    11:41:15 AM: 
    11:41:15 AM:   Error message
    11:41:15 AM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
    11:41:15 AM: 
    11:41:15 AM:   Error location
    11:41:15 AM:   In build.command from netlify.toml:
    11:41:15 AM:   npm run build
    11:41:15 AM: 
    11:41:15 AM:   Resolved config
    11:41:15 AM:   build:
    11:41:15 AM:     command: npm run build
    11:41:15 AM:     commandOrigin: config
    11:41:15 AM:     environment:
    11:41:15 AM:       - NODE_VERSION
    11:41:15 AM:       - NPM_VERSION
    11:41:15 AM:     publish: /opt/build/repo/public
    11:41:15 AM:     publishOrigin: config
    11:41:15 AM:   plugins:
    11:41:15 AM:     - inputs: {}
    11:41:15 AM:       origin: ui
    11:41:15 AM:       package: '@netlify/plugin-gatsby'
    11:41:15 AM: Caching artifacts
```
    
- solution :
  - 해당 에러의 경우 삽질을 너무 많이해서 원인을 제대로 파악하진 못하였다..   
  - 일단 node의 버전을 다운 그레이드 (v18 —> v14)
```
    brew unlink node@18
    brew install node@14
    brew link node@14
 ```
        
- 추가적으로 패키지 설치도 한번 해보세요
        
```
  yarn install @mui/material @emotion/react @emotion/styled
```

- yarn clean 한번 씩 시도 해보고 다시 해보세요..
```
yarn clean
```
        
- node:internal/modules/cjs/loader:959가 발생하면 
```
1. yarn cache clean --force
2. node_modules 폴더 삭제
3. package-lock.json 파일 삭제
4. yarn install
````        
---
    
- 로컬에서 gatsby실행 시 에러
    
```shell
    (node:34470) [DEP0148] DeprecationWarning: Use of deprecated folder mapping "./" in the "exports" field module resolution of the
    package at /Users/taeinjang/Documents/gitblog/my-gatsby-blog/node_modules/postcss-js/package.json.
    Update this package.json to use a subpath pattern like "./*".
    (Use `node --trace-deprecation ...` to show where the warning was created)
 ```

- solution :

  - node 버전 오류인데 node18 > node16으로 변경하고 위와 같은 에러가 발생하였고

  - node 버전을 14로 변경하여 해결하였습니다.

</details>

---

## 🧵 Google Search Console 등록하기

[https://search.google.com/search-console/about?hl=ko](https://search.google.com/search-console/about?hl=ko) 로그인하기

시작하기 누르시면 소유권 확인하는 창이 나오는데 왼쪽에 본인 도메인을 입력하면

TXT 도메인 레코드를 줍니다. 그걸 복사해서 본인 호스팅 사이트에서 새 레코드 추가해 주세요.

그러면 소유권 확인이 끝나고 조금 시간뒤에 Google search console에 접속 하실 수 있습니다.

저는 30분 기다려야 Search Console창이 나오더라구요

그리고 Gatsby 테마 마다 Google Search Console, Google Analytics 설정 방법이 다를 수 있습니다.

저의 테마의 경우 zoomkoding-gatsby-blog을 사용합니다.

- sitemap 플러그인 설치
```
yarn install gatsby-plugin-advanced-sitemap
```

- gatsby-config.js 파일에서 gatsby-plugin-robots-txt 수정
- sitemap, host에 본인이 커스텀 도메인 적어주세요.
```js
{
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', allow: '/' }],
            sitemap: 'https://www.your_custom_domain/sitemap.xml',
            host: 'https://www.your_custom_domain/',
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', allow: '/' }],
            sitemap: 'https://www.your_custom_domain/sitemap.xml',
            host: 'https://www.your_custom_domain/',
          },
        },
      },
    }
```
- gatsby-config.js 파일 하단에 아래와 같은 플러그인이 명시되었는지 확인
```
`gatsby-plugin-advanced-sitemap`
```

- 로컬에서 확인
```
yarn gatsby develop
```

- 아래와 같이 뜨면 성공
![sitemap](sitemap.png)

- 변경사항을 Netlify에 배포 한 후 Google Search Console 접속
- 새 사이트맵 추가탭에 아래 url 2개 추가
  - https://www.your_custom_domain/sitemap.xml
  - https://www.your_custom_domain/sitemap-pages.xml
  ![google_sitemap](google_sitemap.png)

위 사진과 같이 성공이라는 메시지가 뜬 후

- sitemap 색인 요청하기
![google_sitemap_2](google_sitmap_2.png)

- 위 사진은 색인요청이 완료된 화면이고 사진의 번호만 봐주세요
  - 1번 클릭해서 2번 URL창에 https://www.your_custom_domain/sitemap.xml 입력
  - 3번 색인 요청 버튼 클릭하셔서 요청하시면 됩니다.
  - 똑같이 https://www.your_custom_domain/sitemap-pages.xml도 색인요청 해주세요

- 조금 시간이 지난 뒤에 다시 URL 검사하시면 위 사진처럼  "URL이 Google에 등록되어 있음"이라는 메시지가 보일 겁니다.
- 구글에서 본인 도메인을 검색해보세요.
![google_sitemap_3](google_sitemap_3.png)

---

## 👟 Google Analytics 이용하기
[https://analytics.google.com/](https://analytics.google.com/) 접속

속성 이름이랑 이런 거 작성하신 후 다 만드셨으면 스트림 정보에서 측정 ID를 확인하세요<br/>
측정ID는 구글 애널리틱스 사이트에 > 왼쪽 하단에 관리 > 데이터 스트림 > 본인 도메인 클릭<br/>
에서 보시면 됩니다.


gatsby 플러그인을 설치하기
```
yarn add gatsby-plugin-gtag
```

제가 사용하는 테마는 trackingId를 입력하는 곳이 따로 있었습니다. <br/>
zoomkoding-gatsby-blog 테마의 경우 gatsby-meta-config.js 에 있습니다.

```
ga: 'G-측정ID', // Google Analytics Tracking ID
```

- gatsby-config.js 파일 수정
```js
  {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: metaConfig.ga,
        head: false,
        anonymize: true,
      },
    },
```
- gatsby-config.js 파일 하단에 아래와 같은 플러그인이 명시되었는지 확인
```
`gatsby-plugin-gtag`
```

만약 본인의 gatsby 테마에 측정ID 입력하는 곳이 없다면

아래와 같이 trackingId 부분에 본인 측정ID 적으면 됩니다.

```
{
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: G-측정ID,
        head: false,
        anonymize: true,
      },
    },
```

---

- 참고
  - [https://hislogs.com/make-gatsby-blog/](https://hislogs.com/make-gatsby-blog/)
  - [https://www.junwork.net/blog-google-search-console/](https://www.junwork.net/blog-google-search-console/)

---

## 💦 환경

> macOs (BigSur v11.6.1)
>
>
> Homebrew v3.6.1
>
> node v14.20.0
>
> npm v8.15.0
>
> yarn v1.22.19
>
> Gatsby CLI v4.22.1
>
> Gatsby v4.9.3
>

---

깃허브로 블로그 만드는 데 오래 안 걸릴 줄 알았지만 엄청 애를 먹었습니다..

템플릿만 가져와서 쓰면 되는 줄 알았지만 프론트쪽 개념이 아예 없었고

빌드만 하면 실패했습니다..하ㅏ..
 
구글 애널리틱스랑 sitemap에서도 계속 헤맸습니다...

프론트쪽 공부도 좀 해야겠습니다..😭

```toc
```
