import Vue from 'vue';
import Vuex from 'vuex';
// import _ from 'lodash';
import api from '@/lib/api';

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
  },
  actions: {

    // GET

    async fetchCompanies({ commit }) {
      const { data: companies } = await api.get(`/companies`);
      commit(`SET_COMPANIES`, companies);
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
  },
  getters: {},
});
