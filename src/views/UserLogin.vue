<template>
    <v-container>
        <h1>Login</h1>
        <UserAuthForm :submitForm="loginUser" buttonText="Login" />
    </v-container>
</template>

<script>

import UserAuthForm from '@/components/UserAuthForm';

export default {
    components: {
        UserAuthForm
    },

    methods: {
        async loginUser(loginInfo) {
            //récupère les infos des users (dispatch)
           let user = await this.$store.dispatch('loginUser', loginInfo);
           if(user.error) {
               alert(user.error)
           } else {
               alert('Thank you for signing in, ' + user.email);
               //this.$router.push({ path:`/user/home`});
           }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>