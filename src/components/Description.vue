<template>
    <div>
        <li>
            {{title}}: {{descr}}
        </li>
    </div>

</template>


<script>

export default {
    name: 'Description',
    props: {
        title: String,
        descr: [String, Number, Boolean]
    }
}
</script>

<style lang="scss" scoped>

    .task-description {
        padding: 10px 30px;
        li {
            text-align: left;
            list-style: none;
        }
    }

</style>