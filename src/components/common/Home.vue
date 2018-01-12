<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vHead,vSidebar
        },
        data(){
            return{
            url: '/api/v1.0/authtoken'
            }
        },
        created(){
            //console.log(this.$axios.defaults.auth);
            this.$axios.defaults.auth.username = localStorage.token;
            //this.$axios.defaults.auth.password = 'unused'; 
            this.auth();
        },
        methods:{
        auth(){
            this.$axios.get(this.url, {params: { 'token':localStorage.token  }}).then((res) => {
                if (! res.data.status){
                    //console.log(localStorage.getItem('token'));
                    //console.log(res.data);
                    localStorage.removeItem('ms_username');
                    localStorage.removeItem('token')
                    this.$router.push('/login');
                }        
              },res=>{
                this.$router.push('/login');
                //console.log (this.url+'调用失败');      
              })
            }
        }

    }

</script>
