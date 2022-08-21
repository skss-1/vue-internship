<template>
  <div class="task-description"></div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    details: {
      type: String,
      require: true,
    },
    editMode: {
      type: Boolean,
      require: true,
    },
    changeDetails: {
      type: Function,
      require: true,
    },
    id: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
