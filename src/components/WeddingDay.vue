<template>
  <div ref="wedding-day" class="wedding-day">
    <ContentsTitle title="Wedding Day" />
    <div class="text-int">
      <Calendar
        class="tt"
        transparent
        borderless
        expanded
        locale="en"
        :attributes="[{ highlight: true, dates: [weddingDay] }]"
        :min-date="weddingDay"
        :max-date="weddingDay"
        :from-page="calendarPage"
        :to-page="calendarPage"
        :selectable="false"
      />
      <div class="info">
        <span class="tt">{{ formattedDates.full }}</span>
        <span class="tt">{{ formattedDates.hour }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DatePicker as Calendar } from "v-calendar";
import { computed, defineProps } from "vue";

import ContentsTitle from "@/components/ContentsTitle.vue";

type WeddingDate = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const props = defineProps<{
  date: WeddingDate;
}>();

const weddingDay = computed(() => {
  const { year, month, day, hour, minute } = props.date;
  return new Date(year, month - 1, day, hour, minute);
});

const calendarPage = computed(() => {
  const { year, month } = props.date;
  return { year, month: month - 1 };
});

const formattedDates = computed(() => {
  const { year, month, day, hour, minute } = props.date;
  const strHour = hour > 12 ? `오후 ${hour - 12}` : hour;

  const date = new Date(year, month - 1, day, hour, minute);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return {
    full: `${year}년 ${month}월 ${day}일 (${weekdays[date.getDay()]})`,
    hour: `${strHour}시 ${minute}분`,
  };
});
</script>

<style lang="scss">
@import "@/assets/css/reset.scss";
@import "@/assets/css/variables.scss";
@import "@/assets/css/common.scss";
@import "v-calendar/style.css";

.wedding-day {
  position: relative;
  color: $col-key;
  margin-top: #{$top-gap-2x}px;

  .info {
    position: relative;
    z-index: $z-bg;
    line-height: 1.6;

    > span {
      display: inline-block;
      font-size: $font-xs;
      padding: 10px;
    }
  }
}
.vc-container {
  --vc-hover-bg: $bg-color !important;
  --vc-focus-ring: 0 !important;
  --vc-font-family: "Noto-Serif" !important;
  --vc-bg: $bg-color !important;
  .vc-title {
    color: $col-key !important;
  }
  .vc-arrow {
    display: none;
  }
  .vc-weekday {
    color: $col-key;
    opacity: 60%;
    font-weight: bold;
  }
  .vc-day {
    div:not(.vc-highlight-content-solid) {
      color: $col-key !important;
    }
    .vc-highlight {
      background-color: #ff6f61 !important;
      color: #fff !important;
      font-weight: bold;
      opacity: 100% !important;
    }
    &.is-not-in-month,
    .is-not-in-month & {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
