[![Build](https://github.com/jhunahn/getting-married/actions/workflows/build.yaml/badge.svg)](https://github.com/jhunahn/getting-married/actions/workflows/build.yaml)

# Mobile wedding invitation 💍

다른 오픈소스 템플릿은 내 스타일이에 안맞아서 직접 만들어 보는 모바일 청첩장

[here](https://jhunahn.github.io/getting-merried/)

## How to implement 

`variables`를 추가한다.

- `TITLE`: OpenGraph와 Webpage 제목
- `DESCRIPTION`: OpenGraph 설명

`secrets` 를 추가 한다

- `KAKAO_API_KEY`: kakaomap 연동을 위한 API_KEY

사진과 동영상 파일을 수정 한다
- `src/assets/images/gallary`
- `src/assets/media`

`config.json`의 내용을 알맞게 수정한다.

```bash
vi src/config/config.json
```

파일 수정후 커밋하면 Actions가 프로젝트를 빌드후, 자동으로 deploy 한다.

## How to development

`.env` 파일을 만든다

```bash
tee .env << __EOF__
VITE_PUBLISH_URL=https://jhunahn.github.io

VITE_TITLE=2025.08.02 지훈 ❤️ 효정 결혼합니다.
VITE_DESCRIPTION=2025년 결혼하는 지훈과 효정의 이야기, 지금 확인해보세요!

VITE_KAKAO_API_KEY=*************
__EOF__
```

프로젝트를 초기화한다.
```bash
npm ci
```

서버 실행!
```bash
npm run dev
```

### Deployment

```bash
npm run deply
```
