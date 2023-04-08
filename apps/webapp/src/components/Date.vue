<template>
  <div>
    <p>{{ formattedDate }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { format, parseISO } from "date-fns";

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});
// console.log("props :>> ", props.date);
// const formattedDate = parseISO("2021-01-31T00:00:00.000Z");
// console.log("formattedDate :>> ", formattedDate);

const formattedDate = format(parseISO(props.date), "P");
</script>
