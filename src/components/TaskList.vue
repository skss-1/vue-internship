<template>
    <ul class="list-container">
        <Task 
        v-for="item in list" :key="item.id"
        v-bind:item = 'item'
        v-on:remove-task="removeTask"
        />
    </ul>
</template>

<script lang="ts">
import Task from './Task.vue'

export default {
    name: 'TaskList',
    components: {
        Task
    },
    props: ['list'],
    methods: {
        removeTask(id) {
            this.$emit("remove-task", id)
        }
    }
}
</script>

<style scoped>
    .list-container {
        padding: 20px 0 0 0;
        max-width: 70%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
