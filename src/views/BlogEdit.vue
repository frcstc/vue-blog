<template>
    <div class="container">
        <div class="content">
            <Header></Header>
            <div class="m-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>

                    <el-form-item label="摘要" prop="description">
                        <el-input type="textarea" v-model="ruleForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <mavon-editor v-model="ruleForm.content"></mavon-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";

    export default {
        name: "BlogEdit",
        components: {
            Header,
            Footer
        },
        data() {
            return {
                ruleForm: {
                    id: '',
                    title: '',
                    description: '',
                    content: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入摘要', trigger: 'change'}
                    ],
                    content: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this;
                        _this.$axios.post("/blog/edit", this.ruleForm, {
                            headers: {
                                "token": localStorage.getItem("token")
                            }
                        }).then(res => {
                            _this.$alert('发布成功', '发布博客', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push("/blogs")
                                }
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            const blogId = this.$route.params.blogId;
            const _this = this;
            if (blogId) {
                this.$axios.get("/blog/" + blogId).then(res => {
                    const blog = res.data.data;
                    _this.ruleForm.id = blog.id;
                    _this.ruleForm.title = blog.title;
                    _this.ruleForm.content = blog.content;
                    _this.ruleForm.description = blog.description;
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
    .m-content {
        text-align: center;
    }
</style>