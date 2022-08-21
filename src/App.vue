<template>
  <div id="app">
    <h1 :class="getStatusClass">Status</h1>
    <InputArea :addTask="addTask" />
    <task-area :tasks="tasks" />
  </div>
</template>

<script>
import InputArea from "./components/InputArea.vue";
import TaskArea from "./components/TaskArea.vue";

export default {
  name: "App",
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
      console.log(this.tasks);
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

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
