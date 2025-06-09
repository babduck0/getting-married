<template>
  <div class="hello">
    <h1>
      <span class="fade-up top">{{ groom }}</span>
      <span class="fade-up middle"><img :src="and" /></span>
      <span class="fade-up bottom">{{ bridal }}</span>
      <img
        v-if="imageUrl"
        class="fade-up image"
        :src="imageUrl"
        alt="key visual"
      />
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import and from "@/assets/images/and.png";

const prop = defineProps<{
  groom: string;
  bridal: string;
  image?: string;
  video?: string;
}>();

const imageModules = import.meta.glob("@/assets/images/*", {
  eager: true,
  import: "default",
});

const imageUrl = computed(() => {
  const matched = Object.entries(imageModules).find(([path]) =>
    prop.image ? path.endsWith(prop.image) : undefined,
  );
  return matched ? (matched[1] as string) : undefined;
});
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap");

.hello {
  position: relative;
  min-height: 70vh;
  margin: #{$top-gap}px 0;
  color: $col-key;

  width: 100%;
  text-align: center;

  .fade-up {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-style: italic;
    font-size: $font-lar;
    line-height: 1.2;

    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 1s ease-out forwards;

    margin: #{$top-gap-h / 3}px 0;

    &.top {
      margin: 0 0;

      animation-delay: 0.3s;
      font-family: "Pretendard", serif;
      letter-spacing: 4px;
    }

    &.middle {
      animation-delay: 1.1s;
      font-style: italic;
      font-family: cursive;
      font-size: $font-s;
      letter-spacing: 2px;
      margin: 0.2rem 0;

      > img {
        width: #{$font-mid-s * 2};
      }
    }

    &.bottom {
      animation-delay: 1.9s;
      font-family: "Pretendard", serif;
      letter-spacing: 4px;
    }

    &.image {
      animation-delay: 2.3s;
      width: 100%;
      margin: #{$top-gap}px 0;
    }
  }
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
