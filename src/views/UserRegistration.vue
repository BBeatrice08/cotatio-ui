<template>
    <v-container>
        <h1>Register</h1>
        <!-- Need a post method for register !!!!! -->
        <UserAuthForm :submitForm="registerUser" buttonText="Register" hasName=true />
    </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm.vue';

export default {
    components: {
        UserAuthForm
    },
    methods: {
        async registerUser(registrationInfo) {
            //récupère les infos des users (dispatch)
            let user = await this.$store.dispatch('registerUser', registrationInfo);
            if(user.error) {
                alert(user.error)
            } else {
                alert('Welcome to our app, ' + email);
                //this.$router.push({ path:`/user/home`});
            }
        }
        
    }
}
</script>