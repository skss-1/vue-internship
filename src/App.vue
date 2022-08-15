<template>
  <div id="app">
    <h1 v-bind:class="classObject">Task list</h1>
    <Form v-on:add-task = "addTask"/>
    <TaskList v-bind:list = 'list' v-on:remove-task = "removeTask"/>
  </div>
</template>

<script>

import {v4 as uuidv4} from 'uuid';
import Form from './components/Form.vue'
import TaskList from './components/TaskList.vue'


export default {
  name: 'App',
  components: {
    Form,
    TaskList
  },
  data() {
    return {
        list: [
            {title: "bread", done: false, id: uuidv4()},
            {title: "butter", done: false, id: uuidv4()},
            {title: "milk", done: false, id: uuidv4()},
            {title: "shrimps", done: false, id: uuidv4()},
            {title: "potato", done: false, id: uuidv4()},
            {title: "water", done: false, id: uuidv4()},
        ],
        headerStyles: {
          red(){return this.list.filter(item=>!item.done).length === this.list.length},
          green(){return this.list.filter(item=>item.done).length === this.list.length},
          yellow(){return this.list.filter(item=>!item.done).length === Math.floor(this.list.length/2)},
        }
    }
},
computed: {
  classObject() {
    return {
      red:this.list.filter(item=>!item.done).length === this.list.length,
      green:this.list.filter(item=>item.done).length === this.list.length,
      yellow:this.list.filter(item=>!item.done).length < this.list.length,
    }
  }
},
methods: {
  removeTask(id) {
    this.list = this.list.filter(item => item.id !== id)
  },
  addTask(task) {
    this.list = [...this.list, task]
  }
}
}
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
  background-color: 	#ADD8E6;
  max-width: 50%;
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
  color: green
}

</style>
