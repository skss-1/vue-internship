<template>
    <div>
        <form 
            class="task-form" 
            @submit.prevent="addTask"
        >
            <div class="wrapper">
                <input 
                    type="text" 
                    placeholder="Task" 
                    v-model.trim="task"
                >
                <button type="submit">ADD</button>
            </div>
            <textarea 
                maxlength="150"
                placeholder="Description for task" 
                v-model.trim="description"
            ></textarea>
            <button 
                class="optional-button"
                type="button"
                @click="optional = !optional"
            >OPTIONAL</button>
            <div 
                class="optional-form" 
                v-if="optional"
            >
                <FormOptional @add-details="addDetails"/>
            </div>
        </form>
    </div>
</template>

<script>

import {v4 as uuidv4} from 'uuid';
import FormOptional from './FormOptional.vue'

export default {
    name: 'Form',
    components: {
        FormOptional
    },
    data() {
        return {
            task: '',
            description: '',
            optional: false,
            details: {},
        }
    },
    methods: {
        addTask() {
            if (this.task) {
                const newTask = {title:this.task, done:false, description: {...this.details, description: this.description}, showDescription: false, id:uuidv4()}
                this.task = ''
                this.description = ''
                this.details = {}
                this.optional = false
                this.$emit('add-task', newTask)
            }
        },
        addDetails(detail) {
            this.details = {...this.details, ...detail}
        }
    }
}
</script>

<style lang="scss" scoped>
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

    .optional-button {
        margin: 0;
        margin-top: 10px;
        max-width: 120px;
        padding: 5px 10px;
    }

    .wrapper {
        display: flex;
        input {
            width: 100%;
        }
    }

    textarea {
        display: block;
        width: 100%;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 3px;
        resize: none;
        padding: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    textarea::placeholder, 
    input::placeholder {
        opacity: 0.5;
        font-style: italic;
    }

    textarea, 
    input{
        font-style: italic;
        padding: 2px 8px;
        border: none;
    }



    .task-form {
        display: flex;
        flex-direction: column;
        max-width: 70%;
        margin-left: auto;
        margin-right: auto;
    }



</style>