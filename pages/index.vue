<template>
    <div class="home-page">
      <section class="intro">
        <h1>Get the latest tech news!</h1>
      </section>
      <input class="searchInput" type="text" v-model="search" placeholder="Search">
      <post-list :posts="filteredPost"/>
    </div>
</template>

<script>

export default {
  data(){
    return {
      search: ''
    }
  },
  computed: {
    loadedPosts(){
      return this.$store.getters.loadedPosts
    },
    filteredPost(){
      return this.loadedPosts.filter((post) => {
        return post.title.match(this.search);
      })
    }
  }
}
</script>

<style scoped>

.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  background-image: url('~assets/images/main-page-background.jpg');
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}
.searchInput{
  width: 75%;
  display: flex;
  margin: 20px auto;
  padding: 15px;
  border-radius: 5px; 
  font-size: 15px;
  color: black;
  outline: none;
  border: 2px solid #ccc;
  box-shadow: 1px 1px 5px #ccc;
  transition: 0.3s;
}
.searchInput:focus{
  box-shadow: 1px 1px 5px #000;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
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
