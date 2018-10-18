<template>
    <div class="single-post-page">
        <section class="post">
            <h1 class="post-title">{{ loadedPost.title }}</h1>
            <div class="post-details">
                <img :src="loadedPost.thumbnail" alt="image">
                <div class="post-detail">Lats updated on {{ loadedPost.updatedDate | date}}</div>
                <div class="post-detail">Written by {{ loadedPost.author }}</div>
            </div>
            <p class="post-content">{{ loadedPost.content }}</p>
        </section>
        <section class="post-feedback">
            <p>Feedback <a href="mailto:feedback@mydomain.com">feedback@mydomain.com</a></p>
        </section>
        <div class="container">
          <div id="disqus_thread"></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  head: {
    script: [
      { src: '/disqus.js', type: 'text/javascript', body: true }
    ]
  },
  asyncData(context){
    return axios.get('https://nuxt-blog-69de4.firebaseio.com/posts/' + context.params.id + '.json')
    .then(res => {
      return {
        loadedPost: res.data
      }
    })
    .catch(e => context.error(e)
    )
  }
}
</script>

<style scoped>
.container{
  margin: 0 auto;
  max-width: 1000px;
}
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}

</style>
