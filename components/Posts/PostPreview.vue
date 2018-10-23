<template>
    <nuxt-link :to="postLink">
        <article class="post-preview">
        <div class="post-thumbnail" :style="{backgroundImage: 'url('+ thumbnail +')'}"></div>
        <div class="post-content">
            <h2>{{ title }}</h2>
            <p>{{ previewText }}</p>
        </div>
        </article>
    </nuxt-link> 
</template>


<script>
export default {
    name: 'PostPreview',
    props: {
        id: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        previewText: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String
        }
    },
    computed: {
        postLink(){
            return this.isAdmin ? '/admin/' + this.id : '/posts/' + this.id
        }
    }
}
</script>

<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
  min-height: 350px;
  overflow: hidden;
  transition: 0.3s;
}
.post-preview:hover{
    background-color: #ccc;
    transform: scale(1.1);
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
  transition: 0.3s;
}

.post-content {
  padding: 10px;
  text-align: center;
}
</style>
