<template>
    <div class="post-page">
        <h1>This Post Page</h1>
        <post-list :posts="loadedPosts"/>
    </div>
</template>
<script>

export default {
  middleware: 'log',
  computed: {
    loadedPosts(){
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style scoped>
.post-page{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
