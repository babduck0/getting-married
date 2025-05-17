<template>
  <Hello
    :groom="elements.title.groom"
    :bridal="elements.title.bride"
    :image="title.image"
  />
  <Greetings :detail="elements" :date="date" :messages="ko.message" />
  <WeddingDay :date="date" />
  <Gallary />
  <Maps :location="location" />
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onMounted } from "vue";
import { useKakao } from "vue3-kakao-maps/@utils";

import Gallary from "./components/Gallary.vue";
import Greetings from "./components/Greetings.vue";
import Hello from "./components/Hello.vue";
import Maps from "./components/Maps.vue";
import WeddingDay from "./components/WeddingDay.vue";
import { date, en, ko, location, title } from "./config/config.json";

useKakao(import.meta.env.VITE_KAKAO_API_KEY);
gsap.registerPlugin(ScrollTrigger);

const elements = {
  title: {
    groom: en.groom.firstName.toUpperCase(),
    bride: en.bride.firstName.toUpperCase(),
  },
  groom: {
    name: `${ko.groom.firstName}`,
    sibling: ko.groom.sibling,
    father: `${ko.groom.father.lastName}${ko.groom.father.firstName}`,
    mother: `${ko.groom.mother.lastName}${ko.groom.mother.firstName}`,
  },
  bride: {
    name: `${ko.bride.firstName}`,
    sibling: ko.bride.sibling,
    father: `${ko.bride.father.lastName}${ko.bride.father.firstName}`,
    mother: `${ko.bride.mother.lastName}${ko.bride.mother.firstName}`,
  },
};

function gsaps() {
  const sections = [
    ".hello",
    ".greetings",
    ".wedding-day",
    ".gallary",
    ".maps",
  ];

  sections.forEach(sectionSelector => {
    const textSelector = `${sectionSelector} .text-int`;

    ScrollTrigger.create({
      trigger: sectionSelector,
      start: "top-=90% center",
      onEnter: () => {
        const textElements = gsap.utils.toArray<HTMLElement>(textSelector);
        textElements.forEach(el => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            onEnter: () => {
              el.classList.add("hello");
            },
          });
        });
      },
    });
  });
}

onMounted(() => {
  gsaps();
});
</script>

<style lang="scss"></style>
