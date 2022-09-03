<template>
  <div class="person-page">
    {{ person.name }}
  </div>
</template>

<script>
export default {
    name: 'PersonPageView',
    computed: {
        person() {
            return this.$store.getters['person/getPerson']
        },  
        credits() {
            return this.$store.getters['person/getCredits']
        }  
    },
    mounted() {
        this.$store.dispatch('person/fetchPerson',{ id:this.$route.params.id });
    },
}
</script>

<style>

</style>