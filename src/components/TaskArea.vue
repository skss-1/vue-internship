<template>
  <div class="task-area">
    <task-item v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";
export default {
  components: { TaskItem },
  name: "TaskArea",
  props: {
    tasks: {
      type: Array,
      require: true,
    },
  },
  methods: {},
  data() {
    return {};
  },
};
</script>

<style></style>
