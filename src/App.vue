<template>
  <Hello
    :groom="elements.title.groom"
    :bridal="elements.title.bride"
    :media="{ image: framing.prelude.image }"
  />
  <Greetings :detail="elements" :messages="framing.prelude.message" />
  <WeddingDay :date="weddingDay" :schedule="schedule" />
  <Gallary />
  <Media title="MOVIE" :video="framing.prelude.video" />
  <Maps :location="location" />
  <Account :groom="host.groom.account" :bridal="host.bride.account" />
  <Media :image="framing.finale.image" />
  <div class="spacer"></div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { computed, onMounted } from "vue";
import { useKakao } from "vue3-kakao-maps/@utils";

import Account from "./components/Account.vue";
import Gallary from "./components/Gallary.vue";
import Greetings from "./components/Greetings.vue";
import Hello from "./components/Hello.vue";
import Maps from "./components/Maps.vue";
import Media from "./components/Media.vue";
import WeddingDay from "./components/WeddingDay.vue";
import config from "./config/config.json";

useKakao(import.meta.env.VITE_KAKAO_API_KEY);
gsap.registerPlugin(ScrollTrigger);

const { host, framing, location, weddingDay } = config;

const elements = {
  title: {
    groom: host.groom.en.firstName.toUpperCase(),
    bride: host.bride.en.firstName.toUpperCase(),
  },
  groom: {
    name: `${host.groom.name.firstName}`,
    sibling: host.groom.sibling,
    father: `${host.groom.father.lastName}${host.groom.father.firstName}`,
    mother: `${host.groom.mother.lastName}${host.groom.mother.firstName}`,
  },
  bride: {
    name: `${host.bride.name.firstName}`,
    sibling: host.bride.sibling,
    father: `${host.bride.father.lastName}${host.bride.father.firstName}`,
    mother: `${host.bride.mother.lastName}${host.bride.mother.firstName}`,
  },
};

const schedule = computed(() => {
  const bride = host.bride.name;
  const groom = host.groom.name;
  const { city, name, hall } = location;

  return {
    name: `${groom.lastName}${groom.firstName} ❤️ ${bride.lastName}${bride.firstName} 결혼식`,
    location: `${city} ${name} ${hall}`,
    description: framing.prelude.message.join(". "),
  };
});

function gsaps() {
  const sections = [
    ".hello",
    ".greetings",
    ".wedding-day",
    ".gallary",
    ".maps",
    ".accounts",
    ".media",
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

<style lang="scss">
.spacer {
  margin-bottom: #{$top-gap}px;
}
</style>
