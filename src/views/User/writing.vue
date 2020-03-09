<template>
  <div>
      <mavon-editor  @save="saveDoc"
            @change="updateDoc" ref="editor" v-model="doc"></mavon-editor>
      <!-- {{doc}} -->
  </div>

</template>

<script>
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { articleCreate } from '@/api/article'

export default {
  name: "userWriting",
  components: {mavonEditor},
    data(){
      return {
        doc: '',
        uid: ''
      }
    },
    methods: {
      updateDoc(markdown, html) {
          // 此时会自动将 markdown 和 html 传递到这个方法中
          console.log("markdown内容: " + markdown);
          console.log("html内容:" + markdown);
      },
      saveDoc(markdown, html) {
          let requestData = {
            body_md: markdown,
            body_html: html,
            author_id:this.uid
          }
          articleCreate(requestData).then(response =>{
              let data = response.data.data
              console.log(data);
              
            }).catch(error =>{
              console.log(error)
          })
      }
    },
    created(){
      this.uid = this.$store.state.userInfo.uid
    }
      
    
}
</script>

<style lang="scss" scoped>

</style>