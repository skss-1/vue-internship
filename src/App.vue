<template>
  <div id="app">
    <h1 :class="classObject">Task list</h1>
    <Form>
      <form 
        class="task-form" 
        @submit.prevent="addTask"
        slot="form-slot"
      >
        <div class="wrapper">
          <input 
            type="text" 
            placeholder="Task" 
            v-model="task"
          >
          <button type="submit">ADD</button>
        </div>
        <textarea 
          maxlength="150"
          placeholder="Description for task" 
          v-model="description.description"
        ></textarea>
        <button 
          class="optional-button"
          type="button"
          @click="optional = !optional"
        >OPTIONAL</button>
          <div 
            class="optional-form" 
            v-if="optional"
            >
            <div class="quality-option">
              <label>
                <input 
                type="radio" 
                name="quality" 
                value="low"
                v-model="description.quality"
                >Low quality
              </label>
              <label>
                <input 
                type="radio" 
                name="quality" 
                value="best"
                v-model="description.quality"
                >Best quality
              </label>
            </div>
            <div class="sale-option">
              <label>
                <input 
                type="checkbox" 
                value="on-sale"
                v-model="description.onSale"
                >ON SALE
              </label>
            </div>
            <div class="date-option" >
              <label>
                Exp. date
                <input 
                type="date"
                v-model="description.expDate"
                >
              </label>
            </div>
            <div class="comment-option" >
              <label>
                Comment
                <textarea v-model="description.comment"></textarea>
              </label>
            </div>
          </div>
      </form>
    </Form>
    <ul class="task-list">
      <Task>
        <li 
          class="list-item"
          v-for="item in list" 
          :key="item.id"
          slot="task-slot"
        >
        <div class="wrapper">
          <input 
            type="checkbox" 
            @change="item.done = !item.done">
          <p 
            class="task-title"
            :class="{completed:item.done}"
            @click="item.showDescription = !item.showDescription"
          >{{item.title}}</p>
          <button 
            type="button" 
            @click="removeTask(item.id)"
          >X</button>
        </div>
          <ul 
          class="task-description" 
          v-if="item.showDescription"
          >
            <li 
            v-for="(value, key) of item.description" :key="key + value"
            >{{key}}: {{value}}</li>
          </ul>
        </li>
      </Task>
    </ul>
  </div>
</template>

<script>

import {v4 as uuidv4} from 'uuid';
import Form from './components/Form.vue'
import Task from './components/Task.vue'


export default {
  name: 'App',
  components: {
    Form,
    Task
  },
  data() {
    return {
        list: [
            {title: "bread", done: false, description: {description:"losadddddddddssasssa"}, showDescription: false, id: uuidv4()},
            {title: "butter", done: false, description: {description:"losadddddddddssasssa"}, showDescription: false, id: uuidv4()},
            {title: "milk", done: false, description: {description:"losadddddddddssasssa"}, showDescription: false, id: uuidv4()},
            {title: "shrimps", done: false, description: {description:"losadddddddddssasssa"}, showDescription: false, id: uuidv4()},
            {title: "potato", done: false, description: {description:"losadddddddddssasssa"}, showDescription: false, id: uuidv4()},
            {title: "water", done: false, description: {description:"losadddddddddssasssa"}, showDescription: false, id: uuidv4()},
        ],
        task: '',
        description: {},
        optional: false
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
  addTask() {
    if (this.task.trim()) {
      const newTask = {title:this.task, done:false, description: this.description, showDescription: false, id:uuidv4()}
      this.list = [...this.list, newTask]
      this.task = ''
      this.description = {}
    }
  },
}
}
</script>

<style lang="scss">


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
