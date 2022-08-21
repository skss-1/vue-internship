<template>
  <div class="task-area">
    <task-item v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>

<script>
import TaskItem from "../components/TaskItem.vue";
export default {
  components: { TaskItem },
  name: "TodoHistory",
  computed: {
    tasks() {
      console.log(this.$store.getters.getAllTasks);
      return this.$store.getters.getAllTasks;
    },
  },
};
</script>

<style></style>
