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
    // required: true,
  },
});

const formattedDate = (props.date && format(parseISO(props.date), "P")) || "";
</script>
