<template>
  <div>
    <div>
      <div class="container-center">
        <h2>Log in</h2>

        <div v-if="error" class="error">{{ error }}</div>
        <div ref="form" :model="form">
          <div>
            <label>Email</label>
            <input v-model="form.email" placeholder="Email" />
            <input v-model="form.password" type="password" placeholder="Password" />
          </div>
          <div>
            <button
              @click.once="login"
              class="rounded bg-blue-500 text-white py-1 px-4 hover:text-gray-300 hover:bg-blue-600"
            >Log in</button>
          </div>
        </div>
        <div>
          <span>Don't have an account?</span>
          <router-link :to="{name: 'home'}" class="link">Create an account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Login } from '../constants/query.gql';
export default {
  data() {
    return {
      error: false,
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      const { email, password } = this.form;

      if (email && password) {
        this.$apollo
          .mutate({
            mutation: Login,
            variables: { email, password },
          })
          .then(async data => {
            const login = data.data.login;
            const id = login.id;
            const token = login.token;
            this.saveUserData(id, token);
            this.$router.push({ name: 'home' });
          })
          .catch(error => {
            this.error = 'Invalid email or password';
          });
      }
    },
    saveUserData(id, token) {
      localStorage.setItem('user-id', id);
      localStorage.setItem('user-token', token);
      this.$root.$data.userId = localStorage.getItem('user-id');
    },
  },
};
</script>