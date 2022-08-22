<template>
  <div class="home-page">
    <InputArea :addTask="addTask" />
    <task-area :tasks="tasks" />
  </div>
</template>

<script>
import InputArea from "../components/InputArea.vue";
import TaskArea from "../components/TaskArea.vue";

export default {
  name: "Todo",
  components: {
    InputArea,
    TaskArea,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    addTask(title) {
      this.tasks.push({
        title: title,
        checked: false,
        hidden: false,
        details: "no detail yet",
        id: Math.random() * 100000,
      });
    },
  },
  computed: {
    getStatusClass() {
      const amountOfChekedTasks = this.tasks.filter((el) => el.checked).length;

      if (amountOfChekedTasks === this.tasks.length) {
        return "green-title";
      } else if (amountOfChekedTasks >= this.tasks.length / 2) {
        return "orange-title";
      } else {
        return "red-title";
      }
    },
  },
};
</script>

<style></style>
