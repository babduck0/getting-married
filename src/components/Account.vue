<template>
  <div class="accounts">
    <ContentsTitle title="마음 전하실 곳" :messages="messages" />
    <div class="text-int">
      <div
        v-for="(group, index) in accountGroups"
        :key="index"
        ref="dropdownRefs"
        class="dropdown tt"
      >
        <button class="dropdown-toggle" @click="toggleGroup(index)">
          <span class="label">{{ group.label }}</span>
          <span :class="{ open: openGroupIndex === index }">▾</span>
        </button>

        <transition-group
          v-if="openGroupIndex === index"
          name="fade-slide"
          tag="div"
          class="account-list tt"
        >
          <div
            v-for="(account, idx) in group.accounts"
            :key="account.name"
            class="account-item"
            :style="{ animationDelay: idx * 200 + 'ms' }"
          >
            <div class="info">
              <span class="name">{{ account.name }}</span>
              <div class="bank">
                <img :src="getIconUrl(account.bank)" />
                <span class="number">
                  {{ financials[account.bank] }} {{ account.number }}
                </span>
              </div>
            </div>
            <div class="icons">
              <a
                v-if="account.kakao"
                class="kakaopay"
                :href="`https://qr.kakaopay.com/${account.kakao}`"
              ></a>
              <span
                class="tt copy-btn material-symbols-outlined"
                @click="
                  copyToClipboard(
                    financials[account.bank] + ' ' + account.number,
                  )
                "
                >content_copy</span
              >
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import ContentsTitle from "@/components/ContentsTitle.vue";

import institute from "../config/financialInstitutions.json";

interface Account {
  name: string;
  bank: string;
  number: string;
  kakao?: string;
}

const financials = institute as { [key: string]: string };
const props = defineProps<{
  groom?: Account[];
  bridal?: Account[];
}>();

const accountGroups = computed(() => [
  { label: "신랑측", accounts: props.groom },
  { label: "신부측", accounts: props.bridal },
]);

const dropdownRefs = ref<HTMLElement[]>([]);
const openGroupIndex = ref<number | null>(null);
const toggleGroup = (index: number) => {
  if (openGroupIndex.value === index) {
    openGroupIndex.value = null;
  } else {
    openGroupIndex.value = index;
  }
};

function getIconUrl(bankCode: string) {
  return new URL(`../assets/icons/financial/${bankCode}.svg`, import.meta.url)
    .href;
}

async function copyToClipboard(text: string) {
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    alert("이 브라우저에서는 복사 기능을 지원하지 않습니다.");
    return;
  }
  await navigator.clipboard
    .writeText(text)
    .then(() => alert("계좌번호가 복사되었습니다."))
    .catch(() => alert("복사에 실패했습니다. 다시 시도해주세요."));
}
const messages = ["참석이 어려우신 분들을 위해 기재했습니다."];
</script>

<style lang="scss">
.accounts {
  position: relative;
  margin: #{$top-gap}px 0;

  .title {
    font-size: $font-s;
    margin-bottom: 0.5rem;
    color: #d86b6b;
  }

  .description {
    font-size: $font-xs;
    color: #444;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .dropdown {
    margin-bottom: 1.5rem;
    scroll-margin-top: 80px;
  }

  .dropdown-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    width: 100%;
    max-width: 360px;
    margin: 0 auto;
    padding: 10px 10px;
    font-size: $font-xs;

    color: #fff;
    background-color: $col-key;

    border-radius: 10px;
    cursor: pointer;

    .label {
      text-align: center !important;
      flex-grow: 0;
      font-weight: bold;
    }

    span.open {
      transform: rotate(180deg);
      transition: transform 0.3s ease;
    }
  }

  .account-list {
    margin-top: 0.75rem;
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }

  .account-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;

    opacity: 0;
    transform: translateY(10px);
    animation: fadeSlideIn 0.3s ease forwards;
  }

  .info {
    display: flex;
    flex-direction: column;

    .name {
      font-weight: 600;
      font-size: $font-xxs;
      color: #333;
    }

    .bank {
      display: "inline";
      margin-top: 5rem;
      img {
        width: $font-xs;
        margin: 0 2rem;
        vertical-align: middle;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        overflow: hidden;
      }
      .number {
        font-size: $font-xxs;
        color: #666;
      }
    }
  }

  .icons {
    display: inline-flex;
    border: none;

    .kakaopay {
      justify-content: center;
      background-image: url("@/assets/icons/kakaopay.png");
      background-repeat: no-repeat;
      background-size: 100% $font-xs;
      background-position: left center;
      width: $font-lar;
    }
    .copy-btn {
      margin-left: 5rem;
      background: none;
      font-size: $font-s;
      cursor: pointer;
      color: $col-red;
    }
  }

  @keyframes fadeSlideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.3s ease;
  }
}
</style>
