<template>
  <div class="task-details">
    <div v-if="!editMode">{{ task.details }}</div>
    <textarea v-else v-model="task.details" maxlength="150" />
  </div>
</template>

<script>
export default {
  name: "TaskDetails",
  props: {
    task: {
      type: Object,
      require: true,
    },
    editMode: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
