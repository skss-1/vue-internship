<template>
    <div>
        <div class="quality-option">
            <label>
                <input 
                    type="radio" 
                    name="quality" 
                    value="low"
                    v-model="details.quality"
                    @change="addDetails(details)"
                >Low quality
            </label>
            <label>
                <input 
                    type="radio" 
                    name="quality" 
                    value="best"
                    v-model="details.quality"
                    @change="addDetails(details)"
                >Best quality
            </label>
        </div>
        <div class="sale-option">
            <label>
                <input 
                    type="checkbox" 
                    value="on-sale"
                    v-model="details.onSale"
                    @change="addDetails(details)"
                >ON SALE
            </label>
        </div>
        <div class="date-option" >
            <label>
                Exp. date
                <input 
                    type="date"
                    v-model="details.expDate"
                    @change="addDetails(details)"
                >
            </label>
        </div>
        <div class="comment-option" >
            <label>
                Comment
                <textarea 
                    v-model.trim="details.comment"
                    @change="addDetails(details)"
                ></textarea>
            </label>
        </div>
    </div>
</template>

<script>

export default {
    name: 'FormOptional',
    data() {
        return {
            details: {}
        }
    },
    methods: {
        addDetails() {
            this.$emit('add-details', this.details)            
        }
    }
}

</script>

<style lang="scss" scoped>

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
