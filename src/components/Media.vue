<template>
  <div class="media">
    <div class="text-int">
      <img v-if="imageUrl" class="tt short" :src="imageUrl" alt="key visual" />
    </div>
  </div>
</template>

<script setup lang="ts">
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
}
</style>
