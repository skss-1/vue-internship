<template>
  <ul class="task-description">
    <DescriptionItem
      v-for="(description, title) of descriptionValues"
      :key="title"
      :description="description"
      :title="title"
      :edit="edit"
      :canceled="canceled"
      @change-values="changeValues"
    />
  </ul>
</template>

<script>
import DescriptionItem from "./DescriptionItem.vue";

export default {
    name: "Description",
    components: {
        DescriptionItem,
    },
    props: {
        description: {
            description: String,
            quality: String,
            expDate: String,
            onSale: Boolean,
            comment: String,
        },
        edit: Boolean,
        canceled: Boolean,
        saved:Boolean,
    },
    data() {
        return {
            descriptionValues: this.description
        }
    },
    methods: {
        changeValues(key, value) {  
            this.descriptionValues[key] = value;
            this.$emit('update-props', this.descriptionValues)
        },
    }
};
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