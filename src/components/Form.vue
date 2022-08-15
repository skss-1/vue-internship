<template>
    <form class="form" v-on:submit.prevent="onSubmit">
        <input type="text" v-model="task">
        <button type="submit">ADD</button>
    </form>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
export default {
    name: 'Form',
    data() {
        return {
            task: ''
        }
    },
    methods: {
        onSubmit() {
            if (this.task.trim()) {
                const newTask = {title:this.task, done:false, id:uuidv4()}
                this.$emit('add-task', newTask)
                this.task = ''
            }
        }
    }
}
</script>

<style scoped>
    button {
        margin-left: 10px;
        appearance: none;
        border: 0;
        border-radius: 5px;
        background-color: #4bc0ee;
        color: #fff;
        padding: 4px 16px;
        font-size: 16px;
        transition: 250ms all ease-in-out;
    }

    button:active {
        background-color: #08aef0;
    }
</style>