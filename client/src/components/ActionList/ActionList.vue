<template>
  <div>
    <div v-for="action in actions" :key="action._id">
      <div class="flex">
        <div>
          {{ action.title }}
        </div>
        <div><div class="button">Done</div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    actions: [Object],
  },
};
</script>

<style scoped>
</style>