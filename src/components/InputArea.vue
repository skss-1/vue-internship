<template>
  <div class="input-area">
    <input type="text" placeholder="Write task here" v-model.trim="taskInput" />
    <textarea
      placeholder="Write description to task here"
      maxlength="150"
      v-model.trim="detailsInput"
    />
    <div><input type="checkbox" v-model="highPriority" />High Priority</div>
    <button @click="AddNewTask">Add task</button>
  </div>
</template>

<script>
export default {
  name: "InputArea",
  methods: {
    AddNewTask() {
      if (this.taskInput) {
        const newTask = {
          title: this.taskInput,
          highPriority: this.highPriority,
        };
        if (this.detailsInput) {
          newTask.details = this.detailsInput;
        } else {
          newTask.details = "No details";
        }
        this.$store.dispatch("addNewTask", newTask);
        this.taskInput = "";
        this.detailsInput = "";
        this.highPriority = false;
      }
    },
  },
  data() {
    return { taskInput: "", detailsInput: "", highPriority: false };
  },
};
</script>

<style></style>
