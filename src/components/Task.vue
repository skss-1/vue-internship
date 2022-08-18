<template>
    <li class="list-item">
        <slot name="task-slot"></slot>
    </li>
</template>

<script>

export default {
    name: 'Task'
}
</script>

<style lang="scss" scoped>
    .list-item {
        background-color: #87CEEB;
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
        margin: 0;
        top: 50%;
        transform: translateY(-50%);
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

    .task-description {
        padding: 10px 30px;
        li {
            text-align: left;
            list-style: none;
        }
    }

</style>
