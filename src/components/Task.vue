<template>
  <li class="list-item">
    <div class="wrapper">
      <input
        class="checkbox-linethrow"
        type="checkbox"
        v-model="done"
        @change="changeStatus(done)"
      />
      <div class="task-title" @click="show = !show" v-if="!edit">
        <input
          class="input-title"
          :class="{ completed: done }"
          type="text"
          v-model="inputTitle"
          v-if="edit"
        />
        <div class="input-title" :class="{ completed: done }" v-else>
          {{ title }}
        </div>
      </div>
      <div class="task-title"  v-else>
        <input
          class="input-title"
          :class="{ completed: done }"
          type="text"
          v-model="inputTitle"
          v-if="edit"
        />
        <div class="input-title" :class="{ completed: done }" v-else>
          {{ title }}
        </div>
      </div>
      <button
        class="edit-button"
        type="button"
        @click="(edit = !edit), (show = true)"
        v-if="!edit"
      >
        EDIT
      </button>
      <button
        class="save-button"
        type="button"
        @click="
          (saved = !saved), updateProps(inputTitle,id), (edit = !edit), (saved = !saved)
        "
        v-if="edit"
      >
        SAVE
      </button>
      <button type="button" @click="removeTask(id)">X</button>
    </div>
    <Description
      :description="description"
      :edit="edit"
      :saved="saved"
      v-if="show"
      @update-props="updateProps"
    />
  </li>
</template>

<script>
import Description from "./Description.vue";

export default {
  name: "Task",
  components: {
    Description,
  },
  props: {
    title: String,
    description: {
      description: String,
      quality: String,
      expDate: String,
      onSale: Boolean,
      comment: String,
    },
    id: String,
  },
  data() {
    return {
      done: false,
      show: false,
      inputTitle: this.title,
      edit: false,
      saved: false,
    };
  },
  methods: {
    removeTask(id) {
      this.$emit("remove-task", id, this.done);
    },
    changeStatus(done) {
      this.$emit("change-status", done);
    },
    updateProps(inputTitle,id) {
      if (this.saved) {
        this.$emit("update-props", inputTitle,id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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

.wrapper {
  position: relative;
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
  color: transparent;
}

.completed {
  text-decoration: line-through;
}

.checkbox-linethrow {
  position: absolute;
  left: 10px;
  margin: 0;
  top: 50%;
  transform: translateY(-50%);
}

.input-title {
  display: inline-block;
  outline: none;
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 20px;
  text-transform: uppercase;
  font-style: italic;
  color: black;
}

button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  margin: 0;
  width: 20px;
  height: 20px;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: 200ms all ease-in-out;
}

button:active {
  background-color: rgb(175, 2, 2);
}

.edit-button,
.save-button {
  right: 40px;
  padding: 0 3px;
  width: auto;
}

.edit-button:active {
  background-color: rgb(32, 32, 250);
}

.save-button {
  background-color: rgb(51, 168, 51);
}

.edit-button {
  background-color: rgb(118, 118, 245);
}

.save-button:active {
  background-color: rgb(31, 107, 31);
}
</style>