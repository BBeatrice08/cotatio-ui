<template>
    <!-- formulaire pour se loguer -->
    <v-form v-model="valid">
        <v-text-field v-model="userInfo.firstName" 
                        label="Prénom" 
                        :rules="[required('email')]" 
                        v-if="hasName" />
        <v-text-field v-model="userInfo.lastName" 
                        label="Nom" 
                        :rules="[required('email')]" 
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

        <!-- <v-icon
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
            @click="showPassword = !showPassword"
            >visibility
        </v-icon> -->
        <!-- <v-spacer></v-spacer> -->

        <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
    </v-form>
</template>

<script>
import validations from '@/utils/validations';

export default {
    data: () => ({
        showPassword: true,
        userInfo: {
            user_email: '',
            user_password: '',
        },
        ...validations
    }),
    props: ['submitForm', 'buttonText', 'hasName']
}
</script>