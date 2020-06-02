<template>
    <div class="m-content">
        <h3>欢迎来到汇众优品程序园</h3>
        <div class="block">
            <el-avatar :size="50" :src="user.avatar"></el-avatar>
            <div>
                {{user.username}}
            </div>
        </div>
        <div class="maction">
            <span><el-link href="/blogs">主页</el-link></span>
            <el-divider direction="vertical"></el-divider>
            <span><el-link type="success" href="/blog/add">发表博客</el-link></span>

            <el-divider direction="vertical"></el-divider>
            <span v-show="!hasLogin"><el-link type="info" href="/login">登陆</el-link></span>
            <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Header",
        data() {
            return {
                user: {
                    username: '请先登陆',
                    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                hasLogin:false
            }
        },
        methods: {
            logout() {
                const _this = this;
                _this.$axios.get("/user/loginOut", {
                    headers:{
                        "token": localStorage.getItem("token")
                    }
                }).then(res => {
                    console.log(res);
                    _this.$store.commit("REMOVE_INFO");
                    _this.$router.push("/login")
                })
            }
        },
        created() {
            if (this.$store.getters.getUserInfo.username) {
                this.user.username = this.$store.getters.getUserInfo.username;
                this.hasLogin = true;
            }
        }
    }
</script>

<style scoped>
    .m-content {
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
    }

    .maction {
        margin: 10px 0;
    }
</style>