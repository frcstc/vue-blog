<template>
    <div class="container">
        <div class="content">
            <Header></Header>
            <div class="mblog">
                <h2>{{blog.title}}</h2>
                <el-link icon="el-icon-edit" v-if="ownBlog">
                    <router-link :to="{name:'BlogEdit', params:{blogId: blog.id}}">编辑</router-link>
                </el-link>
                <el-divider></el-divider>
                <div v-html="blog.content" class="markdown-body"></div>
            </div>
            <div style="text-align: center">
                <p style="font-size: larger">喜欢就打赏下呗：</p>
                <img src="../assets/a.png" width="200px" >
                <img src="../assets/b.png" width="200px" >
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import "github-markdown-css"
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    export default {
        name: "BlogDetail",
        components:{
            Header,
            Footer
        },
        data() {
            return {
                blog:{
                    id:"",
                    title:"no title",
                    content:"no content"
                },
                ownBlog:false
            }
        },
        created: function () {
            const blogId = this.$route.params.blogId;
            const _this = this;
            if (blogId) {
                this.$axios.get("/blog/" + blogId).then(res => {
                    const blog = res.data.data;
                    _this.blog.id = blog.id;
                    _this.blog.title = blog.title;
                    var MarkdownIt = require("markdown-it");
                    var md = new MarkdownIt();
                    var result = md.render(blog.content);
                    _this.blog.content = result;
                    _this.ownBlog = (blog.userId === _this.$store.getters.getUserInfo.id)
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        height: 100%;
    }
    .content{
        min-height: calc(100% - 100px);
    }
    .mblog{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        min-height: 700px;
        padding: 20px 15px;
    }
</style>