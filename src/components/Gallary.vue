<template>
  <div class="gallary">
    <ContentsTitle title="GALLARY" />
    <div class="text-int">
      <Carousel
        id="gallery"
        v-bind="galleryConfig"
        v-model="currentSlide"
        class="tt short"
      >
        <Slide v-for="image in images" :key="image.id">
          <img :src="image.url" alt="Gallery Image" class="gallery-image" />
        </Slide>
      </Carousel>

      <Carousel
        id="thumbnails"
        v-bind="thumbnailsConfig"
        v-model="currentSlide"
        class="tt short"
      >
        <Slide v-for="image in images" :key="image.id">
          <template #default="{ currentIndex, isActive }">
            <div
              :class="['thumbnail', { 'is-active': isActive }]"
              @click="() => (currentSlide = currentIndex)"
            >
              <img
                :src="image.url"
                alt="Thumbnail Image"
                class="thumbnail-image"
              />
            </div>
          </template>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import "vue3-carousel/carousel.css";

import { ref } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import ContentsTitle from "@/components/ContentsTitle.vue";

const currentSlide = ref(0);

const imageModules = import.meta.glob(
  "@/assets/images/gallary/*.{jpg,jpeg,png,gif}",
  {
    eager: true,
    import: "default",
  },
);

const images = ref(
  Array.from(Object.values(imageModules), (src, index) => ({
    id: index + 1,
    url: String(src),
  })),
);

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: "fade",
  mouseDrag: false,
  touchDrag: true,
} as const;

const thumbnailsConfig = {
  height: 80,
  itemsToShow: 5,
  wrapAround: true,
  touchDrag: true,
  gap: 20,
} as const;
</script>

<style lang="scss">
@import "@/assets/css/reset.scss";
@import "@/assets/css/variables.scss";
@import "@/assets/css/common.scss";

.gallary {
  position: relative;
  margin-top: #{$top-gap-2x}px;

  .carousel {
    --vc-nav-background: rgba(255, 255, 255, 0.7);
    --vc-nav-border-radius: 100%;
  }

  img {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: contain;
  }

  .gallery-image {
    border-radius: 16px;
  }

  #thumbnails {
    margin-top: #{$top-gap-h / 2}px;
  }

  .thumbnail {
    height: 100%;
    width: 100%;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.3s ease-in-out;

    img {
      object-fit: cover;
    }

    &.is-active,
    &:hover {
      opacity: 1;
    }
  }
}
</style>
