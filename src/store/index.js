import Vue from 'vue';
import Vuex from 'vuex';
//import _ from 'lodash';
import api from '@/lib/api';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import router from '../router';
//import secret from './config.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: [],
    sites: [],
    areas: [],
    production_lines: [],
    machines: [],
    indicators: [],
    quotations: [],
    quotation_items: [],
    //items: [],
    users: [],
    currentUser: {},
    sessions: [],
    //token: {},
    status: '',
      token: localStorage.getItem('token') || '',
      user: {}
  },
  mutations: {
    SET_COMPANIES(state, companies) {
      state.companies = companies;
    },
    ADD_COMPANY(state, company) {
      state.companies.push(company);
    },

    SET_SITES(state, sites) {
      state.sites = sites;
    },
    ADD_SITE(state, site){
      state.sites.push(site);
    },

    SET_AREAS(state, areas) {
      state.areas = areas;
    },
    ADD_AREA(state, area) {
      state.areas.push(area);
    },

    SET_PRODUCTION_LINES(state, production_lines) {
      state.production_lines = production_lines;
    },
    ADD_PRODUCTION_LINE(state, production_line) {
      state.production_lines.push(production_line);
    },

    SET_MACHINES(state, machines) {
      state.machines = machines;
    },
    ADD_MACHINE(state, machine) {
      state.machines.push(machine);
    },

    SET_INDICATORS(state, indicators) {
      state.indicators = indicators;
    },
    SET_ITEMS(state, items) {
      state.items = items;
    },

    SET_QUOTATIONS(state, quotations) {
      state.quotations = quotations;
    },
    ADD_QUOTATION(state, quotation) {
      state.quotations.push(quotation);
    },

    ADD_QUOTATION_ITEM(state, quotation_item) {
      state.quotation_items.push(quotation_item);
    },

    SET_USERS(state, users) {
      state.users = users;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },

    // se déconnecter => ne renvoi aucun 'user' dans le localstorage
    LOGOUT_USER(state) {
      state.currentUser = {};
      window.localStorage.currentUser = JSON.stringify({});
      //window.localStorage.token = JSON.stringify({});
      state.status = '';
      state.token = '';
      //alert("thank you for visiting");
    },
    // garde les infos dans le localStorage de l'utilisateur connecté
    SET_CURRENT_USER(state, user, token) {
      state.token = token;
      state.currentUser = user;
      window.localStorage.currentUser = JSON.stringify(user);
      //window.localStorage.token = JSON.stringify(token);
      localStorage.getItem('token', token);
      //localStorage.setItem('token', token);
    },

    // AUTH_SUCCESS(state, token, user){
    //   state.status = 'success'
    //   state.token = token
    //   state.user = user
    // },

    ADD_SESSION(state, session) {
      state.sessions.push(session);
    },
  
    
  },
  actions: {

    // GET

    async fetchCompanies({ commit }) {
      try {
        //var user = localStorage.getItem('currentUser');
        var token = localStorage.getItem('token');
        //if (localStorage.getItem('currentUser')) {
          if (token) {
          //console.log(user);
          const { data: companies } = await api.get(`/companies`);
          commit(`SET_COMPANIES`, companies);
        } else {
          alert("access denied");
        }
      } catch {
        alert("you don't have authorization");

      }

    },
    async fetchSites({ commit }, companyId) {
      const { data: sites } = await api.get(`/sites/company/${companyId}`);
      commit(`SET_SITES`, sites);
    },
    async fetchAreas({ commit }, companyId) {
      const { data: areas } = await api.get(`/areas/company/${companyId}`);
      commit(`SET_AREAS`, areas);
    },
    async fetchProduction_lines({ commit }, companyId) {
      const { data: production_lines } = await api.get(`/production-lines/company/${companyId}`);
      commit(`SET_PRODUCTION_LINES`, production_lines);
    },
    async fetchMachines({ commit }, companyId) {
      const { data: machines } = await api.get(`/machines/company/${companyId}`);
      commit(`SET_MACHINES`, machines);
    },
    async fetchIndicators({ commit }) {
      const { data: indicators } = await api.get(`/indicators`);
      commit(`SET_INDICATORS`, indicators);
    },
    /*
    async fetchItems({ commit }, indicatorId) {
      const { data: items } = await api.get(`/items/indicator/${indicatorId}`);
      commit(`SET_ITEMS`, items);
    },
    */
    async fetchQuotations({ commit }, selectedQuotation) {
      const { data: quotations } = await api.get(`/quotation/${selectedQuotation}`);
      commit(`SET_QUOTATIONS`, quotations);
    },
    async fetchQuotation_Items({ commit }) {
      const { data: quotation_items } = await api.get(`/quotation-items`);
      commit(`SET_QUOTATION_ITEMS`, quotation_items);
    },

    // receive all my users registered and in particular current_user
    async loadUsers({ commit }) {
      const { data: users } = await api.get(`/users`);
      commit(`SET_USERS`, users);
      //commit(`SET_USERS`, users.map());
    },

    async loadCurrentUser({ commit }) {
      let user = JSON.parse(window.localStorage.currentUser);
      //let token = JSON.parse(window.localStorage.token);
      //console.log(user);
      commit(`SET_CURRENT_USER`, user);
    },


    // POST

    async addCompany({ commit }, company) {
      const { data: resCompany } = await api.post(`/companies`, company);
      commit(`ADD_COMPANY`, resCompany);
      return resCompany;
    },
    async addSite({ commit }, site) {
      const { data: resSite } = await api.post(`/sites`, site);
      commit(`ADD_SITE`, resSite);
      return resSite;
    },
    async addArea({ commit }, area) {
      const { data: resArea } = await api.post(`/areas`, area);
      commit(`ADD_AREA`, resArea);
      return resArea;
    },
    async addProduction_line({ commit }, production_line) {
      const { data: resProduction_line } = await api.post(`/production-lines`, production_line);
      commit(`ADD_PRODUCTION_LINE`, resProduction_line);
      return resProduction_line;
    },
    async addMachine({ commit }, machine) {
      const { data: resMachine } = await api.post(`/machines`, machine);
      commit(`ADD_MACHINE`, resMachine);
      return resMachine;
    },
    async addQuotation({ commit }, quotation) {
      const { data: resQuotation } = await api.post(`/quotations`, quotation);
      commit(`ADD_QUOTATION`, resQuotation);
      return resQuotation;
    },
    async addQuotation_Item({ commit }, quotation_item) {
      const { data: resQuotation_Item } = await api.post(`/quotation-items`, quotation_item);
      commit(`ADD_QUOTATION_ITEM`, resQuotation_Item);
      return resQuotation_Item;
    },
    async addSession({ commit }, session) {
      const { data: resSession } = await api.post(`/sessions`, session);
      commit(`ADD_SESSION`, resSession);
      return resSession;
    },


    // OTHERS METHODS

    logoutUser({ commit }) {
      localStorage.removeItem('token');
      router.push('/');
      commit('LOGOUT_USER');
    },

    /**
     * récupère les infos du serveur (depuis le faux post) et analyse:
     * 
     * 1ère ligne du tableau renvoyée [response.data] est l'email
     * s'agit-il d'un email référencé dans la table 'user'
     * 
     * si oui la combinaison email/mdp est-elle bonne ?
     * 
     * si non (non référencé ou combinaison incorrecte) -> message d'erreur
     * 
     * => enregistre les infos du user dans le localStorage
     *
     */
    async loginUser({ commit }, loginInfo) {
        let response = await api.post(`/sessions`, loginInfo);

        //pour découper les infos reçues de l'API
        let user = response.data[0];

        //si je n'ai pas d'utilisateur :
        if (user == null){
          return { error: loginInfo.email + " " /*+ loginInfo.user_password + " "*/ + "Utilisateur inconnu" }
        //vérifie la combinaison email / pwd => si incorrecte message d'erreur
        } else if (!bcrypt.compareSync(loginInfo.password, user.password)) {
          return { error: "La combinaison email/mot de passe est incorrecte. Essayez à nouveau" }
          
          //si combinaison OK => login !
        } else {
          var token = jwt.sign({ id: user.id}, 'secret', { expiresIn: '1h' });
          localStorage.setItem('token', token);

          commit('SET_CURRENT_USER', user, token);
          //console.log(token);
          //return [token, user];
          return token;
        }
    },

  /* FONCTION TEST (model function) */
  async registerUser({commit}, registrationInfo) {
    try {
      let response = await api.post('/users', registrationInfo);
      let user = response.data;
      //console.log(user);

      commit('SET_CURRENT_USER', user);
      return user;
    } catch {
      return {error: "Il y a eu une erreur à l'enregistrement du nouvel utilisateur. Essayez à nouveau"}
    }
  }
  },
  getters: {
    
  },
});
