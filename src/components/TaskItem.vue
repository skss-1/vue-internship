<template>
  <div class="task-item" :class="{ 'item-checked': task.checked }">
    <input
      type="checkbox"
      :checked="task.checked"
      @click.stop="task.checked = !task.checked"
    />
    <span
      v-if="!editMode"
      @click="showDetails = !showDetails"
      :class="{ checked: task.checked }"
    >
      {{ task.title }}
    </span>
    <input v-else v-model="task.title" />

    <button @click.stop="task.hidden = true">Hide</button>
    <button @click.stop="editMode = !editMode">Edit</button>

    <slot name="prioroty"></slot>

    <task-details v-show="showDetails" :task="task" :editMode="editMode">
      <div v-if="!editMode">{{ task.details }}</div>
      <textarea v-else v-model="task.details" maxlength="150" />
    </task-details>
  </div>
</template>

<script>
import TaskDetails from "./TaskDetails.vue";
export default {
  components: { TaskDetails },
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      showDetails: false,
      editMode: false,
    };
  },
  method: {},
};
</script>

<style></style>
