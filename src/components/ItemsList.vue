<template>
  <div
    class="items-list container p-0"
    tabindex="0"
  >
    <div class="row justify-content-evenly">
      <item-card
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import ItemCard from './ItemCard.vue';

export default {
  name: 'ItemsList',
  components: {
    ItemCard,
  },
  props: {
    items: {
      type: Array,
      required: true,
    }
  }
}
</script>