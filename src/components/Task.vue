<template>
    <li class="list-item">
        <input type="checkbox" v-on:change="item.done = !item.done">
        <p v-bind:class="{completed:item.done}" v-on:click="$emit('remove-task', item.id)">{{item.title}}</p>
    </li>
</template>

<script>


export default {
    name: 'Task',
    props: ['item']
}
</script>

<style scoped>
    .list-item {
        display: flex;
        align-items: center;
        background-color: #87CEEB;
        cursor: pointer;
        border-radius: 5px;
        transition: 250ms all ease-in-out;
        position: relative;
    }
    .list-item:not(:last-child) {
        margin-bottom: 10px;
    }
    .list-item:hover {
        background-color: #4bc0ee;
    }

    p {
        margin: 0;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        font-size: 20px;
        text-transform: uppercase;
        font-style: italic;
    }

    .completed {
        text-decoration: line-through;
    }

    input {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
    }

</style>
