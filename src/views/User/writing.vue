<template>
  <div>
      <mavon-editor  @save="saveDoc"
            @change="updateDoc" ref="editor" v-model="doc"></mavon-editor>
      <!-- {{doc}} -->
  </div>

</template>

<script>
import { articleCreate,articleDetail} from '@/api/article'

export default {
  name: "userWriting",
  // components: {mavonEditor},
    data(){
      return {
        doc: '',
        uid: '',
        aritcleInfo: {
          articleId: this.$route.query.articleId,
          type: this.$route.query.type
        },
      }
    },
    methods: {
      initData(){
         this.uid = this.$store.state.userInfo.uid
         // 判断是否是更新操作
         if (this.aritcleInfo.type=="update"){
            this.getArticleDetail(this.aritcleInfo.articleId) 
         }
      },
      // 获取文章详情
      getArticleDetail(articleId) {
        articleDetail(articleId)
          .then(response => {
            this.doc = response.data.data.body_md;
          })
          .catch(error => {
            console.log(error);
          });
      
     },
      updateDoc(markdown, html) {
          // 此时会自动将 markdown 和 html 传递到这个方法中
          console.log("markdown内容: " + markdown);
          console.log("html内容:" + markdown);
      },
      saveDoc(markdown, html) {
          let requestData = {
            body_md: markdown,
            body_html: html,
            author_id:this.uid,
            article_id: this.aritcleInfo.type? this.aritcleInfo.articleId:""
          }
          articleCreate(requestData).then(response =>{
              let data = response.data
              this.$message({
                message:data.message,
                type:"success"
              })
            }).catch(error =>{
              console.log(error)
          })
      }
    },
    created(){
     this.initData()
    }
      
    
}
</script>

<style lang="scss" scoped>

</style>