<template>
    <div>
        <slot name="form-slot"></slot>
    </div>
</template>

<script>

export default {
    name: 'Form'
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

    label {
        display: flex;
        align-items: center;
        input {
            margin: 0;
        }
    }

    .quality-option, .sale-option {
        margin-top: 10px;
        input {
            margin-right: 5px;
        }
    }

    .date-option, .comment-option {
        margin-top: 10px;
        input, textarea {
            margin-left: 10px;
        }

    }

</style>