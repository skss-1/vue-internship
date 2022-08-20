<template>
    <ul 
        class="task-description"
        v-if="Object.keys(isAvailable).length"
        >
        <li v-for="(value, key) of isAvailable" 
            :key="key" >
            <div>
                {{key}}: {{value}}
            </div>
        </li>
    </ul>
    <div v-else>No data to display</div>
</template>


<script>

export default {
    name: 'Description',
    props: {
        description: {
            description: String,
            quality: String,
            expDate: String,
            onSale: Boolean,
            comment: String
        },
    },
    computed: {
        isAvailable() {
            const newObj = {}
            for(let key in this.description) {
                if (this.description[key] !== '') {
                    newObj[key] = this.description[key]
                }
            }
            return newObj
        }
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