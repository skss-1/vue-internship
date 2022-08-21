<template>
  <div
    class="task-item"
    :class="{ 'item-checked': task.checked }"
    v-show="!task.hidden"
  >
    <h1 @click="detailsShow = !detailsShow" :class="{ checked: task.checked }">
      <input
        type="checkbox"
        :checked="task.checked"
        @click.stop="task.checked = !task.checked"
      />
      {{ task.title }}

      <button @click.stop="task.hidden = true">Hide</button>
    </h1>
    <textarea
      v-show="detailsShow"
      v-model="task.details"
      maxlength="150"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      require: true,
    },
  },
  methods: {},
  data() {
    return {
      detailsShow: false,
    };
  },
};
</script>

<style></style>
