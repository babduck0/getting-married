<template>
  <div id="location" class="navigation">
    <div class="icon text-int">
      <ul class="appLink tt short">
        <li>
          <button @click="openTmap">
            <img src="@/assets/icons/tmap.png" alt="" />
          </button>
        </li>
        <li>
          <button @click="openKakaoNavi">
            <img src="@/assets/icons/kakao_navi.png" alt="" />
          </button>
        </li>
        <li>
          <button @click="openKakaoMap">
            <img src="@/assets/icons/kakao_map.png" alt="" />
          </button>
        </li>
        <li>
          <button @click="openNaverMap">
            <img src="@/assets/icons/naver_map.png" alt="" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  lat: number;
  lng: number;
  name: string;
}>();

const encodeName = encodeURIComponent(props.name);
const userAgent = navigator.userAgent.toLowerCase();
const isIOS = /iphone|ipad|ipod/.test(userAgent);

const appId = {
  tmap: 431589174,
  kakaoMap: 304608425,
  kakaoNavi: 417698849,
  naverMap: 311867728,
};

const openWithFallback = (appUrl: string, fallbackUrl: string) => {
  let hasAppOpened = false;

  const handlePageHide = () => (hasAppOpened = true);
  function handleVisibilityChange() {
    if (document.visibilityState === "hidden") {
      hasAppOpened = true;
    }
  }

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pagehide", handlePageHide);
  window.location.href = appUrl;

  setTimeout(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("pagehide", handlePageHide);
    if (!hasAppOpened) window.location.href = fallbackUrl;
  }, 2000);
};

function openTmap() {
  const scheme = `tmap://route?props.name=${encodeName}&goalx=${props.lng}&goaly=${props.lat}`;
  const fallback = isIOS
    ? `https://apps.apple.com/kr/app/tmap/id${appId.tmap}`
    : "https://play.google.com/store/apps/details?id=com.skt.tmap.ku";
  openWithFallback(scheme, fallback);
}
function openKakaoNavi() {
  const scheme = `kakaonavi://navigate?name=${encodeName}&x=${props.lng}&y=${props.lat}`;
  const fallback = isIOS
    ? `https://apps.apple.com/kr/app/kakao-navi/id${appId.kakaoNavi}`
    : "https://play.google.com/store/apps/details?id=com.locnall.KimGiSa";
  openWithFallback(scheme, fallback);
}

function openKakaoMap() {
  const scheme = `kakaomap://route?ep=${props.lat},${props.lng}&by=CAR`;
  const fallback = isIOS
    ? `https://apps.apple.com/kr/app/kakaomap/id${appId.kakaoMap}`
    : "https://play.google.com/store/apps/details?id=net.daum.android.map";
  openWithFallback(scheme, fallback);
}

function openNaverMap() {
  const scheme = `nmap://route/car?dlat=${props.lat}&dlng=${props.lng}&dname=${encodeName}`;
  const fallback = isIOS
    ? `https://apps.apple.com/kr/app/naver-map-navigation/id${appId.naverMap}`
    : "https://play.google.com/store/apps/details?id=com.nhn.android.nmap";
  openWithFallback(scheme, fallback);
}
</script>

<style lang="scss" scoped>
.navigation {
  position: relative;
  margin-top: 20px;
  .icon {
    margin-left: 10px;
    margin-right: 10px;
    display: inline-block;
  }
  .icon .appLink {
    display: flex;
    justify-content: center;
    text-align: center;
    padding-bottom: 10px;
  }
  .icon ul li:not(:last-child) {
    padding-right: 10px;
  }
  .icon ul li a p {
    font-size: 10px;
  }
}
</style>
