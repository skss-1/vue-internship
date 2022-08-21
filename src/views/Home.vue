<template>
  <div id="app">
    <h1 :class="classObject">Task list</h1>
    <Form @add-task="addTask" />
    <ul class="task-list">
      <Task
        v-for="task in list"
        :key="task.id"
        :title="task.title"
        :description="task.description"
        :id="task.id"
        @remove-task="removeTask"
        @change-status="changeStatus"
        @update-props="updateProps"
      />
    </ul>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Form from "../components/Form.vue";
import Task from "../components/Task.vue";
export default {
  name: "App",
  components: {
    Form,
    Task,
  },
  data() {
    return {
      list: [
        { title: "bread", description: { description: "data" }, id: uuidv4() },
        { title: "butter", description: { description: "data" }, id: uuidv4() },
        { title: "milk", description: { description: "data" }, id: uuidv4() },
        { title: "shrimps", description: { description: "data" }, id: uuidv4() },
        { title: "potato", description: { description: "data" }, id: uuidv4() },
        { title: "water", description: { description: "data" }, id: uuidv4() },
      ],
      status: 0,
    };
  },
  computed: {
    classObject() {
      if (!this.status) {
        return "red";
      } else if (this.status === this.list.length) {
        return "green";
      } else {
        return "yellow";
      }
    },
  },
  methods: {
    removeTask(id, done) {
      if (done) {
        this.status -= 1;
      }
      this.list = this.list.filter((item) => item.id !== id);
    },
    addTask(task) {
      this.list = [...this.list, task];
    },
    changeStatus(done) {
      if (!done) {
        done = -1;
      }
      this.status += done;
    },
    updateProps(inputTitle, id, obj) {
      this.list.forEach((item, i) => {
        if (item.id === id) {
          const newElem = {...item, title: inputTitle, description: { ...item.description, ...obj }};
          this.list.splice(i, 1, newElem);
        }
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #add8e6;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 40px;
}
.red {
  color: red;
}
.yellow {
  color: yellow;
}
.green {
  color: green;
}
.task-list {
  padding: 20px 0 0 0;
  max-width: 70%;
  margin-left: auto;
  margin-right: auto;
}
p {
  padding: 0;
  margin: 0;
}
</style>
