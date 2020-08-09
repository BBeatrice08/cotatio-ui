<template>
    <v-container>
        <!-- <p>vsezonvoe</p> -->
        <v-form>
            <v-text-field v-model="loginInfo.user_email" label="Email" />
            <v-text-field v-model="loginInfo.user_password" label="Password" type="password" />

            <v-btn @click="loginUser">Login</v-btn>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        loginInfo: {
            user_email: '',
            user_password: '',
        }
    }),

    methods: {
        async loginUser() {
           let user = await this.$store.dispatch('loginUser', this.loginInfo);
           if(user.error) {
               alert(user.error)
           } else {
               alert('Thank you for signing in, ' + user.email);
           }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>