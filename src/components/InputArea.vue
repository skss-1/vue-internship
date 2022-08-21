<template>
  <div class="input-area">
    <input type="text" placeholder="Write task here" v-model.trim="taskInput" />
    <button @click="AddNewTask">Add task</button>
  </div>
</template>

<script>
export default {
  name: "InputArea",
  props: {
    addTask: {
      type: Function,
      require: true,
    },
  },
  methods: {
    AddNewTask() {
      if (this.taskInput) {
        this.addTask(this.taskInput);
        this.taskInput = "";
      }
    },
  },
  data() {
    return { taskInput: "" };
  },
};
</script>

<style></style>
