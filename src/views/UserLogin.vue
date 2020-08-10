<template>
    <v-container>
        <v-form v-model="valid">
            <v-text-field v-model="loginInfo.user_email" 
                          label="Email" 
                          :rules="[required('email'), emailFormat()]" />
            <v-text-field v-model="loginInfo.user_password" 
                          label="Password" 
                          :type="showPassword ? 'text' : 'password'" 
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                          @click:append="showPassword = !showPassword"
                          counter=true
                          :rules="[required('password'), minLength('password', 5)]">
            </v-text-field>

            <!-- <v-icon
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                @click="showPassword = !showPassword"
                >visibility
            </v-icon> -->
            <!-- <v-spacer></v-spacer> -->

            <v-btn @click="loginUser" :disabled="!valid">Login</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import validations from '@/utils/validations';

export default {
    data: () => ({
        showPassword: true,
        loginInfo: {
            user_email: '',
            user_password: '',
        },
        ...validations
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