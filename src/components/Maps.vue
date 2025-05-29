<template>
  <div class="maps">
    <ContentsTitle title="Location" />
    <div class="info text-int">
      <strong class="tt">{{ location.name }}</strong>
      <span class="tt">{{ location.hall }}</span>
    </div>
    <div class="map-wrap text-int">
      <KakaoMap
        class="mapFixed tt"
        :lat="location.detail.coordinate.base[0]"
        :lng="location.detail.coordinate.base[1]"
        :draggable="true"
        width="auto"
        height="400px"
      >
        <KakaoMapMarker
          :lat="location.detail.coordinate.base[0]"
          :lng="location.detail.coordinate.base[1]"
        />
        <KakaoMapMarker
          v-for="(item, key) in location.detail.coordinate.references"
          :key="key"
          :lat="item[0]"
          :lng="item[1]"
          :image="{
            imageSrc:
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            imageWidth: 22,
            imageHeight: 22,
            imageOption: {
              alt: String(key),
            },
          }"
        />
      </KakaoMap>
      <Navigation
        :name="location.name"
        :lat="location.detail.coordinate.base[0]"
        :lng="location.detail.coordinate.base[1]"
      />
      <ul class="way text-int">
        <li class="tt short">
          <dl>
            <dt>
              <span class="material-symbols-outlined">directions_car</span>
            </dt>
            <dd>
              <div class="car">
                <span
                  v-for="(item, idx) in location.detail.transfortation.car
                    .address"
                  :key="idx"
                  class="tt address"
                  >{{ item }}</span
                >
                <span
                  class="tt copy-btn material-symbols-outlined"
                  @click="copyAddress"
                >
                  {{ clipboardIcon }}
                </span>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
      <ul class="way text-int">
        <li class="tt short">
          <dl>
            <dt>
              <span class="material-symbols-outlined">directions_subway</span>
            </dt>
            <dd>
              <div>
                <span
                  v-for="(metro, idx) in location.detail.transfortation.subway
                    .lines"
                  :key="idx"
                  :style="{
                    color: subwayColorMap[metro].text,
                    backgroundColor: subwayColorMap[metro].bg,
                  }"
                  class="color-box"
                >
                  {{ metro }}
                </span>
              </div>
              <span
                v-for="(item, idx) in location.detail.transfortation.subway
                  .desc"
                :key="idx"
                class="tt"
                >{{ item }}</span
              >
            </dd>
          </dl>
        </li>
      </ul>
      <ul class="way text-int">
        <li class="tt short">
          <dl>
            <dt>
              <span class="material-symbols-outlined">directions_bus</span>
            </dt>
            <dd>
              <li
                v-for="(item, index) in location.detail.transfortation.bus"
                :key="index"
              >
                <div>
                  <span
                    v-for="(busNumber, lineIndex) in item.lines"
                    :key="lineIndex"
                    :style="{
                      color: busColorMap[busNumber.color].text,
                      backgroundColor: busColorMap[busNumber.color].bg,
                    }"
                    class="color-box"
                    >{{ busNumber.number }}
                  </span>
                </div>
                <span>{{ item.desc }}</span>
              </li>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

import ContentsTitle from "@/components/ContentsTitle.vue";
import Navigation from "@/components/Navigation.vue";

import busColors from "../config/busColors.json";
import seoulMetroColors from "../config/seoulMetroColors.json";

type LocationInformation = {
  name: string;
  city: string;
  hall: string;
  detail: {
    coordinate: {
      base: number[];
      references: {
        [key: string]: number[];
      };
    };
    transfortation: {
      car: {
        address: string[];
      };
      subway: {
        lines: string[];
        desc: string[];
      };
      bus: {
        lines: {
          number: number;
          color: string;
        }[];
        desc: string;
      }[];
    };
  };
};

type TransferColorMap = {
  [key: string | number]: {
    text: string;
    bg: string;
  };
};

const clipboardIcon = ref("content_copy");

const busColorMap = busColors as TransferColorMap;
const subwayColorMap = seoulMetroColors as TransferColorMap;

const props = defineProps<{
  location: LocationInformation;
}>();

async function copyAddress() {
  const { address } = props.location.detail.transfortation.car;
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    alert("이 브라우저에서는 복사 기능을 지원하지 않습니다.");
    return;
  }
  await navigator.clipboard
    .writeText(address.join(" "))
    .then(() => {
      clipboardIcon.value = "check_circle";
      setTimeout(() => (clipboardIcon.value = "content_copy"), 1500);
    })
    .catch(() => alert("복사에 실패했습니다."));
}
</script>

<style lang="scss">
.maps {
  position: relative;
  margin-top: #{$top-gap}px;
  color: $col-key;
  .info {
    position: relative;
    z-index: $z-bg;
    font-size: $font-xs;
    line-height: 1.4;
    margin: 20px 0;

    strong {
      font-weight: bold;
    }
    span {
      margin-top: 10px;
      font-size: $font-xxs;
    }
  }
  .map-wrap {
    position: relative;
    z-index: $z-bg;

    &.mapFixed {
      position: relative;
      margin: 20px;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      svg {
        display: none;
      }
    }
    .way {
      margin: 32px 0 0 20px;
      .material-symbols-outlined {
        vertical-align: middle;
      }
      > li {
        margin-top: 22px;
        font-size: $font-xxs;
        line-height: 1.6;
        dl {
          display: flex;
          dt {
            width: 40rem;
          }
          dd {
            text-align: left;
            width: calc(100% - 40rem);
          }
        }
      }
      .car {
        align-items: center;
        display: inline-flex;

        .address {
          margin-right: auto;
          padding-right: 10rem;
          // width: 90%;
        }
        .copy-btn {
          cursor: pointer;
        }
      }
      .color-box {
        display: inline-block;
        border-radius: 10rem;
        padding: 1.2rem 5px;
        margin: 2rem;
        text-align: center;
        font-size: 80%;
      }
    }
  }
}
</style>
