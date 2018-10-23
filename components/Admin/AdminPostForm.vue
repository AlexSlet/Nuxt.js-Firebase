<template>
    <form @submit.prevent="onSave">
        <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

        <AppControlInput v-model="editedPost.title">Title</AppControlInput>
                
        <div>
            <h4>Thumbnail</h4>
            <img style="width: 100%;" :src="editedPost.imageUrl ? editedPost.imageUrl : imageUrl">
            <input type="file" accept="image/*" @change="onFilePiked">
        </div>
                
        <AppControlInput
            control-type="textarea"
            v-model="editedPost.content">Content</AppControlInput>
        <AppControlInput
            control-type="textarea"
            v-model="editedPost.previewText">Preview Text</AppControlInput>
                
        <AppButton type="submit">Save</AppButton>
                
        <AppButton
            type="button"
            style="margin-left: 10px"
            btn-style="cancel"
            @click="onCancel">Cancel</AppButton>
    </form>
</template>

<script>
 
export default {
    props: {
        post: {
            type: Object,
            required: false
        }
    },
    data(){
        return {
            imageUrl: '',
            editedPost: this.post ? { ...this.post } : {
                author: '',
                title: '',
                content: '',
                previewText: '',
                image: ''
            }
        }
    },
    methods: {
        onFilePiked(event){
            const files = event.target.files;
            let fileName = files[0].name;
            if(fileName.lastIndexOf('.') <= 0){
                return alert('Please add a valid file!');
            }
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result;
            })
            fileReader.readAsDataURL(files[0]);
            this.editedPost.image = files[0];
            
        },
        onSave(){
            this.$emit('submit', this.editedPost)
        },
        onCancel(){
            this.$router.push('/admin')
        }
    }
}
</script>
<style scoped>

img{
    width: 100%;
}

</style>
