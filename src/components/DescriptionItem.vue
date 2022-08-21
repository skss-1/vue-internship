<template>
    <li>
        <span class="input-title">{{ title + " :" }}</span>
        <select
            class="input-description"
            type="text"
            v-model="inputValue"
            v-if="edit && title === 'onSale'"
        >
            <option value="true">true</option>
            <option value="false">false</option>
        </select>
        <select
            class="input-description"
            type="text"
            v-model="inputValue"
            v-if="edit && title === 'quality'"
        >
            <option value="low">low</option>
            <option value="high">high</option>
        </select>
        <input
            class="input-description"
            type="date"
            v-model="inputValue"
            v-if="edit && title === 'expDate'"
        />
        <textarea
            class="input-description"
            type="text"
            v-model="inputValue"
            v-if="(edit && title === 'comment') || (edit && title === 'description')"
        />
        <div 
            class="input-description" 
            v-if="!edit"
        >{{ description }}</div>
    </li>
</template>

<script>

export default {
    name: "DescriptionItem",
    props: {
        description: [String, Boolean],
        title: String,
        edit: Boolean,
    },
    data() {
        return {
            inputValue: this.description,
        };
    },
    watch: {
        inputValue: function() {
            this.$emit('change-values', this.title, this.inputValue)
        }
    }
};

</script>

<style lang="scss" scoped>
    .input-title {
        padding: 0;
        margin: 0;
        text-align: left;
        font-size: 16px;
        text-transform: uppercase;
        font-style: italic;
        width: 30%;
    }
    .input-description {
        outline: none;
        border: none;
        background-color: transparent;
        padding: 0;
        margin: 0;
        text-align: left;
        font-size: 15px;
        text-transform: uppercase;
        font-style: italic;
        word-break: break-word;
        width: 70%;
    }

    .input-description:focus {
        border: 1px dashed orange;
    }

    li {
        display: flex;
        position: relative;
    }
    li:nth-child(2n + 1) {
        background-color: #05a6e6;
    }

    textarea {
        resize: none;
    }
</style>