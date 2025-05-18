<template>
  <div ref="greeting" class="greetings">
    <p v-if="messages" class="text-int message">
      <span v-for="(item, index) in messages" :key="index" class="tt">
        {{ item }}
      </span>
    </p>
    <div class="parents">
      <p class="text-int">
        <span class="parents-name tt">{{ detail.groom.father }}</span>
        <span class="parents-name tt">{{ detail.groom.mother }}</span>
        <em class="tt">의 {{ detail.groom.sibling }}</em>
        <strong class="tt">{{ detail.groom.name }}</strong>
      </p>

      <p class="text-int">
        <span class="parents-name tt">{{ detail.bride.father }}</span>
        <span class="parents-name tt">{{ detail.bride.mother }}</span>
        <em class="tt">의 {{ detail.bride.sibling }}</em>
        <strong class="tt">{{ detail.bride.name }}</strong>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineOptions, defineProps } from "vue";

defineOptions({
  name: "Greetings",
});

type Role = "groom" | "bride";
type CoupleInfo = {
  [key in Role]: {
    name: string;
    sibling: string;
    father: string;
    mother: string;
  };
};

defineProps<{
  detail: CoupleInfo;
  messages?: Array<string>;
}>();
</script>

<style lang="scss" scoped>
.greetings {
  position: relative;
  color: $col-key;

  .message {
    text-align: center;
    font-size: $font-xs;
    margin-top: 20px;
    line-height: 1.6;
  }

  .parents {
    position: relative;
    z-index: $z-bg;
    margin-top: #{$top-gap-h}px;
    > p {
      display: flex;
      flex-wrap: wrap;
      .parents-name {
        display: inline-block;
        font-size: $font-xs;
        & + .parents-name {
          position: relative;
          margin-left: 20px;
          &::before {
            content: "";
            position: absolute;
            top: 8px;
            left: -12px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: $col-key;
          }
        }
      }
      > em {
        display: inline-block;
        margin-left: 5px;
        font-size: $font-xxs;
        vertical-align: middle;
        text-align: left;
        & + strong {
          display: inline-block;
          margin: 0 0 0 20px;
          font-size: $font-xs;
          font-weight: bold;
        }
      }
      & + p {
        margin-top: 40px;
      }
    }
  }
}
</style>
