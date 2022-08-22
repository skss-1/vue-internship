<template>
  <div class="task-area">
    <task-item v-for="task in tasks" :key="task.id" :task="task">
      <div slot="prioroty" v-if="task.highPriority" class="high-priority">
        high priority
      </div>
    </task-item>
  </div>
</template>
<script>
import TaskItem from "./TaskItem.vue";
export default {
  components: { TaskItem },
  name: "TaskArea",
  computed: {
    tasks() {
      return this.$store.getters.getCurrentTasks;
    },
  },
};
</script>

<style></style>
