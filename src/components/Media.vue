<template>
  <div class="media">
    <div class="text-int">
      <img v-if="imageUrl" class="tt short" :src="imageUrl" alt="key visual" />
      <div v-if="playerOptions" class="tt short">
        <VideoPlayer
          class="video-js vjs-theme-forest"
          :options="playerOptions"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/forest/index.css";

import { VideoPlayer } from "@videojs-player/vue";
import type { VideoJsPlayerOptions } from "video.js";
import { computed } from "vue";

const prop = defineProps<{
  image?: string;
  video?: string;
}>();

const imageModules = import.meta.glob("@/assets/images/*", {
  eager: true,
  import: "default",
});

const imageUrl = computed(() => {
  const entries = Object.entries(imageModules);
  const matched = entries.find(([path]) => path.endsWith(String(prop.image)));
  return matched ? (matched[1] as string) : undefined;
});

const playerOptions = computed(() => {
  if (!prop.video) return undefined;
  const videoModules = import.meta.glob("@/assets/media/*", {
    eager: true,
    import: "default",
  });
  const matched = Object.entries(videoModules).find(([path]) =>
    prop.video ? path.endsWith(prop.video) : undefined,
  );

  if (!matched) return undefined;

  return {
    controls: true,
    preload: "auto",
    fluid: true,
    volume: 0.6,
    playsinline: true,
    sources: [
      {
        src: matched[1] as string,
        type: "video/mp4",
      },
    ],
    children: ["mediaLoader", "posterImage", "bigPlayButton", "loadingSpinner"],
  };
}) as VideoJsPlayerOptions;
</script>

<style scoped lang="scss">
.media {
  position: relative;
  margin: #{$top-gap}px 0;
  color: $col-key;

  width: 100%;
  text-align: center;

  img {
    width: 100%;
  }
  .video-js {
    width: 100%;
    margin: #{$top-gap-h}px 0;
  }
}
</style>
