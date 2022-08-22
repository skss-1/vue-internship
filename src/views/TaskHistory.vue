<template>
  <ul class="task-history">
    <li class="list-item" v-for="task in elements" :key="task.id">
      <div class="task-title">
        {{ task.title }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TaskHistory",
  computed: {
    elements() {
      return this.$store.state.tasks;
    },
  },
};
</script>

<style scoped>

.list-item {
  background-color: #87ceeb;
  cursor: pointer;
  border-radius: 5px;
  transition: 250ms all ease-in-out;
  list-style: none;
}
.list-item:not(:last-child) {
  margin-bottom: 10px;
}
.list-item:hover {
  background-color: #4bc0ee;
}

.task-title {
  display: flex;
  justify-content: center;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
  text-transform: uppercase;
  font-style: italic;
}

</style>