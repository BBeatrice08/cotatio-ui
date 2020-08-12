<template>
    <!-- formulaire pour se loguer -->
    <v-form v-model="valid">
        <v-text-field v-model="userInfo.firstName" 
                        label="Prénom" 
                        :rules="[required('firstname')]" 
                        v-if="hasName" />
        <v-text-field v-model="userInfo.lastName" 
                        label="Nom" 
                        :rules="[required('lastname')]" 
                        v-if="hasName" />
        <v-text-field v-model="userInfo.user_email" 
                        label="Email" 
                        :rules="[required('email'), emailFormat()]" />
        <v-text-field v-model="userInfo.user_password" 
                        label="Password" 
                        :type="showPassword ? 'text' : 'password'" 
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                        @click:append="showPassword = !showPassword"
                        counter=true
                        :rules="[required('password'), minLength('password', 4)]">
        </v-text-field>
<!-- Need a post method for register !!!!! -->

        <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
    </v-form>
</template>

<script>
import validations from '@/utils/validations';

export default {
    data: () => ({
        showPassword: false,
        userInfo: {
            user_email: '',
            user_password: '',
        },
        registerInfo: {
            email: '',
            password: ''
        },
        valid: true,
        ...validations
    }),
    props: ['submitForm', 'buttonText', 'hasName']
}
</script>