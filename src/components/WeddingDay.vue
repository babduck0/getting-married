<template>
  <div ref="wedding-day" class="wedding-day">
    <ContentsTitle title="Wedding Day" :messages="[weddingDay.string]" />
    <div class="text-int">
      <Calendar
        class="tt"
        transparent
        borderless
        expanded
        locale="en"
        :attributes="[{ highlight: true, dates: [weddingDay.date] }]"
        :min-date="weddingDay.date"
        :max-date="weddingDay.date"
        :from-page="weddingDay.calpage"
        :to-page="weddingDay.calpage"
        :selectable="false"
      />
      <div class="text-int d-day">
        <strong class="tt">{{ weddingDay.dDay }}일</strong>
        <span class="tt">{{
          weddingDay.dDay > 0 ? "남았습니다." : "지났습니다."
        }}</span>
      </div>
      <add-to-calendar-button
        class="text-int add-cal"
        v-bind="addToCalendarOptions"
      ></add-to-calendar-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import "add-to-calendar-button";

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

type Schedule = {
  name: string;
  description: string;
  location: string;
};

const addToCalendarOptions = computed(() => {
  const { name, description, location } = props.schedule;
  const { date } = weddingDay.value;

  const end = new Date(date);
  end.setHours(date.getHours() + 2);
  const ua = navigator.userAgent.toLowerCase();
  const options = /iphone|ipad|ipod|mac os/.test(ua) ? "Apple" : "iCal";
  return {
    name,
    description,
    location,
    options,
    startDate: date.toISOString().split("T")[0],
    startTime: date.toTimeString().split(" ")[0],
    endTime: end.toTimeString().split(" ")[0],
    status: "CONFIRMED",
    timeZone: "Asia/Seoul",
    language: "ko",
    lightMode: "bodyScheme",
    styleLight: "--font: 'Noto-Serif'",
  };
});

const props = defineProps<{
  date: WeddingDate;
  schedule: Schedule;
}>();

const weddingDay = computed(() => {
  const { year, month, day, hour, minute } = props.date;
  const date = new Date(year, month - 1, day, hour, minute);

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const strHour = hour > 12 ? `오후 ${hour - 12}` : hour;

  const timeDiff =
    new Date(year, month - 1, day).getTime() - new Date().getTime();

  return {
    date,
    calpage: { year, month: month - 1 },
    dDay: Math.ceil(timeDiff / (1000 * 3600 * 24)),
    string: `${year}년 ${month}월 ${day}일 (${weekdays[date.getDay()]}) ${strHour}시 ${minute}분`,
  };
});
</script>

<style lang="scss">
@import "v-calendar/style.css";

.wedding-day {
  position: relative;
  color: $col-key;
  margin-top: #{$top-gap}px;

  .add-cal {
    display: inline-flex;
    align-items: center;
    margin-top: #{$top-gap-h / 2}px;
  }

  .d-day {
    position: relative;
    line-height: 1.6;
    z-index: $z-bg;
    font-size: $font-xs;
    .tt {
      display: inline-block;
      padding: 4rem;
    }
    > strong {
      font-weight: bold;
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
    pointer-events: none;
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
