<script setup lang="ts">
import type Gameboard from '~/factories/Gameboard'

defineProps<{
  gameboard: ReturnType<typeof Gameboard>
}>()
</script>

<template>
  <div class="container">
    <div v-for="(x, i) in gameboard.board" :key="i" :data-x="x">
      <div v-for="(y, j) in x" :key="j" class="b-1 b-blue b-solid" :data-y="y" @click="$emit('attack', i, j)" />
    </div>
  </div>
</template>

<style scoped>
.container > div {
  display: grid;
  grid-template-columns: repeat(10, minmax(25px, 75px));
  justify-content: center;
}

.container div[data-y] {
  aspect-ratio: 1/1;
}

.container div[data-y="-2"] {
  background-color: red
}
.container div[data-y="-3"] {
  background-color: blue
}
</style>
