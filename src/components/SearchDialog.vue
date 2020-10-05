<template>
  <v-dialog
    v-model="opened"
    persistent
    scrollable
    content-class="search-dialog"
    max-width="100%"
  >
  <!-- <app-quotation></app-quotation>
  <p>{{ message }}</p> -->

  <!-------------------------------------- Dialog boxes area -->
  <!-- Dialog box to add a new company -->
    <v-dialog
      v-model="createCompanyDialog"
      persistent
      max-width="500px"
    >
      <v-form @submit.prevent="addCompany()">
        <v-card>
          <v-toolbar color="grey lighten-2">
            <v-row class="pl-3 pr-3">
              <v-col>Nouvelle entreprise</v-col>
              <v-icon @click="cancelAddCompany()">clear</v-icon>
            </v-row>
          </v-toolbar>
          <v-text-field
            class="mt-4 mx-3"
            v-model="newCompanyName"
            label="Nouvelle entreprise à créer">
          </v-text-field>
          <v-card-actions>
            <v-col />
            <v-btn color="secondary" text @click="cancelAddCompany()" v-if="!isCreatingCompany">Annuler</v-btn>
            <v-btn color="blue lighten-1" type="submit" :loading="isCreatingCompany" dark>Créer</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- Dialog box to add a new company site -->
    <v-dialog
      v-model="createSiteDialog"
      persistent
      max-width="500px"
    >
      <v-form @submit.prevent="addSite()">
        <v-card>
          <v-toolbar color="grey lighten-2">
            <v-row class="pl-3 pr-3">
              <v-col>Nouveau site</v-col>
              <v-icon @click="cancelAddSite()">clear</v-icon>
            </v-row>
          </v-toolbar>
          <v-text-field
          class="mt-4 mx-3"
          v-model="selectedCompany"
          label="Entreprise concernée">
          </v-text-field>
          <!-- <p>ici : {{ selectedCompany }}</p> -->
          <v-text-field
          class="mt-4 mx-3"
          v-model="newSiteName"
          label="Nouveau site à créer">
          </v-text-field>
          <v-text-field
          class="mt-4 mx-3"
          v-model="newSiteAddress"
          label="Adresse du site à créer">
          </v-text-field>
          <v-text-field
          class="mt-4 mx-3"
          v-model="newSitePostalCode"
          label="Code postal"
          type="number">
          </v-text-field>
          <v-text-field
          class="mt-4 mx-3"
          v-model="newSiteCity"
          label="Ville">
          </v-text-field>
          <v-card-actions>
            <v-col />
            <v-btn color="secondary" text @click="cancelAddSite()" >Annuler</v-btn>
            <v-btn color="blue lighten-1" type="submit" dark>Créer</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- Dialog box to add a new company area -->
    <v-dialog
      v-model="createAreaDialog"
      persistent
      max-width="500px"
    >
      <v-form @submit.prevent="addArea()">
        <v-card>
          <v-toolbar color="grey lighten-2">
            <v-row class="pl-3 pr-3">
              <v-col>Nouveau secteur</v-col>
              <v-icon @click="cancelAddArea()">clear</v-icon>
            </v-row>
          </v-toolbar>
          <v-text-field
          class="mt-4 mx-3"
          v-model="selectedCompany"
          label="Entreprise concernée">
          </v-text-field>
          <v-text-field
          class="mt-4 mx-3"
          v-model="selectedSite"
          label="Site concerné">
          </v-text-field>
          <v-text-field
          class="mt-4 mx-3"
          v-model="newAreaName"
          label="Nouveau secteur à créer">
          </v-text-field>
          <v-card-actions>
            <v-col />
            <v-btn color="secondary" text @click="cancelAddArea()" v-if="!isCreatingArea">Annuler</v-btn>
            <v-btn color="blue lighten-1" type="submit" :loading="isCreatingArea" dark>Créer</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- Dialog box to add a new production_line in a company -->
    <v-dialog
      v-model="createProductionLineDialog"
      persistent
      max-width="500px"
    >
      <v-form @submit.prevent="addProduction_Line()">
        <v-card>
          <v-toolbar color="grey lighten-2">
            <v-row class="pl-3 pr-3">
              <v-col>Nouvelle ligne de production</v-col>
              <v-icon @click="createProductionLineDialog = false">clear</v-icon>
            </v-row>
          </v-toolbar>
          <v-text-field
          class="mt-4 mx-3"
          v-model="selectedCompany"
          label="Entreprise concernée">
          </v-text-field>
          <v-text-field
          class="mt-4 mx-3"
          v-model="selectedSite"
          label="Site concerné">
          </v-text-field>
          <v-text-field
          class="mt-4 mx-3"
          v-model="selectedArea"
          label="Secteur concerné">
          </v-text-field>
          <v-text-field
          class="mt-4 mx-3"
          v-model="newProductionLineName"
          label="Nouvelle ligne de production à créer">
          </v-text-field>
          <v-text-field
          class="mt-4 mx-3"
          v-model="newProd_LineMachineNumber"
          label="Nombre de machine sur la ligne"
          type="number">
          </v-text-field>
          <v-card-actions>
            <v-col />
            <v-btn color="secondary" text @click="createProductionLineDialog = false">Annuler</v-btn>
            <v-btn color="blue lighten-1" type="submit" dark>Créer</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- Dialog box to add a new company machine which is related to a site, area and a production line -->
    <v-dialog
      v-model="createMachineDialog"
      persistent
      max-width="800px"
      max-height="auto"
    >
      <v-form @submit.prevent="addMachine()">
        <v-card>
          <v-toolbar color="grey lighten-2">
            <v-row class="pl-3 pr-3">
              <v-col>Nouvelle machine</v-col>
              <v-icon @click="createMachineDialog = false">clear</v-icon>
            </v-row>
          </v-toolbar>
          <v-text-field
          class="mt-4 mx-3"
          v-model="newMachineName"
          label="Nouvelle machine à créer">
          </v-text-field>
            <v-card-text>
              <v-card
                class="mx-auto my-5"
              >
                <template>
                  <v-container id="dropdown">
                    <v-col cols="12" md="12" style="text-align: center;">
                      <p>Appartenant à</p>
                      <p>Entreprise : {{ selectedCompany }}</p>
                      <p>Site : {{ selectedSite }}</p>
                      <p>Secteur : {{ selectedArea }}</p>
                      <p>Ligne de production : {{ selectedProductionLine }}</p>
                    </v-col>
                  </v-container>
                </template>
              </v-card>
            </v-card-text>
          <v-card-actions>
            <v-col />
            <v-btn color="secondary" text @click="createMachineDialog = false">Annuler</v-btn>
            <!-- When the creation of a new machine is validate, it opens a modal to ask if the user wants directly make a quotation -->
            <v-btn color="blue lighten-1" type="submit" dark @click="ifQuotationOnMachineDialog = !ifQuotationOnMachineDialog">Créer</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- After creating a machine, the user can directly access to make a quotation in this dialog box -->
    <v-dialog
      v-model="ifQuotationOnMachineDialog"
      persistent
      hide-overlay
      max-width="500px"
      min-height="auto"
    >
      <v-card>
        <v-card-title style="border-bottom: 1px solid aliceblue; margin-bottom: 20px;">Saisir une nouvelle cotation maintenant ?</v-card-title>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="green"
            outlined
            text
            to="/quotation"
          >
            OUI
          </v-btn>
          <v-btn
            color="red"
            outlined
            text
            @click="ifQuotationOnMachineDialog = false"
          >
            NON
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!------------------------------------- End dialog boxes area -->


    <!------------------------------------- Begining of the content of the modal -->
    <v-card>
      <v-card-title class="pa-0">
        <!--topbar-->
        <v-toolbar color="primary" dark flat class="flex-row-reverse justify-space-around">
          <v-card-title class="headline">Rechercher une synthèse</v-card-title>
          <v-spacer />
          <v-card-actions class="closing_box">
            <v-icon @click="opened = false">clear</v-icon>
          </v-card-actions>
        </v-toolbar>
      </v-card-title>
      <p>selectedcompany : {{ selectedCompany }}</p>
      <p>companiesForFilter: {{ companiesForFilter }}</p>
      <p>filter: {{ filterCompanies }}</p>
      <!-- <p>companies: {{ companies }}</p> -->

      <v-card-text class="pa-0">
        <!-- filters to find my quotation -->
        <v-row class="cards" no-gutters style="height: 100%;">

          <!--filters for company, site, area ... -->

          <v-col class="filters">
            <v-toolbar flat>
              <v-icon class="mr-2">filter_list</v-icon><h4>Filtres</h4>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pa-4">

              <!-- <div class="filters_global_company"> -->
              <div class="all_companies">
                <v-autocomplete
                  :items="companiesForFilter"
                  item-text="name"
                  item-value="id"
                  :filter="filterCompanies"
                  clearable
                  color="white"
                  label="Filtrer par client"
                  v-model="selectedCompany"
                ></v-autocomplete>
              </div>

              <div class="all_sites">
                <v-autocomplete
                  :items="sitesForFilter"
                  item-text="name"
                  item-value="id"
                  :filter="filterSites"
                  clearable
                  color="white"
                  label="Filtrer par site"
                  v-model="selectedSite"
                ></v-autocomplete>
              </div>

              <div class="all_areas">
                <v-autocomplete
                  :items="areasForFilter"
                  item-text="name"
                  item-value="id"
                  :filter="filterAreas"
                  clearable
                  color="white"
                  label="Filtrer par secteur"
                  v-model="selectedArea"
                ></v-autocomplete>
              </div>

              <div class="all_production_lines">
                <v-autocomplete
                  :items="productionLinesForFilter"
                  item-text="name"
                  item-value="id"
                  :filter="filterProductionLines"
                  clearable
                  color="white"
                  label="Filtrer par ligne de production"
                  v-model="selectedProductionLine"
                ></v-autocomplete>
              </div>
            </v-list>
          </v-col>

          <v-col class="machines">
            <v-toolbar flat>
              <v-icon class="mr-2">build</v-icon><h4>Machines</h4>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon style="color:black" @click="createMachineDialog = !createMachineDialog">add_circle</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>

            <v-text-field
              v-model="searchMachine"
              clearable
              prepend-icon="search"
              placeholder="Rechercher"
              ffilter="filterMachines"
              hide-details
              class="mt-2 ml-4 mr-4 mb-2"
            ></v-text-field>
            <v-list dense>
              <!-- To display quotation overview by chosing a machine in the list below -->
              <template v-for="(machine, index) in filteredMachines">
                <v-list-item :key="machine.id" :class="{ active: selectedMachine && selectedMachine.id === machine.id }" @click="previewMachine(machine)">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-row no-gutters align="center">
                        <div>{{ machine.name }}</div>
                        <v-spacer></v-spacer>
                        <v-icon v-if="selectedMachine && selectedMachine.id === machine.id">chevron_right</v-icon>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index + 1 < filteredMachines.length"
                  :key="`divider-${index}`"
                ></v-divider>
              </template>
            </v-list>
          </v-col>

          <!-- Scoring for each machine and its indicators -->
          <v-col>
            <template v-if="selectedMachine">
              <v-toolbar flat>
                <v-icon class="mr-2">slideshow</v-icon><h4>Aperçu de "{{ selectedMachine.name }}"</h4>
                <v-spacer></v-spacer>
                <v-btn icon @click="closePreviewMachine()">
                  <v-icon>cancel</v-icon>
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>
              <div class="pa-3">
                <div>
                  <i>{{ selectedMachine.production_line.area.site.company.name }} / {{ selectedMachine.production_line.area.site.name }} / {{ selectedMachine.production_line.area.name }} / {{ selectedMachine.production_line.name }} / {{ selectedMachine.name }}</i>
                </div>
                <v-row no-gutters class="mt-3">
                  <v-menu>
                    <template v-slot:activator="{ on }">
                      <v-btn outlined color="primary" v-on="on">
                        Synthèse du {{ currentQuotation ? currentQuotation.$date : `` }}
                        <v-icon>arrow_drop_down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(quotation, index) in quotations"
                        :key="index"
                        @click="currentQuotation = quotation"
                      >
                        <v-list-item-title>Synthèse du {{ quotation.$date }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <div>
                    currentQuotation.$score/1000
                  </div>
                </v-row>
              </div>
              <div class="overview d-flex flex-column">

                <!-- Filters to search user quotation by date or show comment-->
                <!-- to="/quotation" -->
                <div class="quotation_by_date">
                  <v-col class="filter_add d-flex flex-row">
                    <v-form @submit.prevent="addQuotation()">
                      <v-card-actions style="">
                        <!-- <router-link to="/quotation/:quotationId"> -->
                        <v-btn rounded small type="submit" ><v-icon>add_circle</v-icon>Nouvelle cotation</v-btn>
                        <!-- </router-link> -->
                      </v-card-actions>
                    </v-form>
                  </v-col>
                  <p>{{ selectedQuotation }}</p>
                  
                  <div class="global_score">
                    <p><strong>Score pondéré Machine : </strong></p>
                  </div>
                </div>

                <div class="scoring-details d-flex flex-row">

                  <div class="scoring mt-5">
                    <p>Score pondéré Efforts : </p>
                    <p>Score pondéré Dimmensionnement : </p>
                    <p>Score pondéré Temporel : </p>
                    <p>Score pondéré Environnement : </p>
                    <p>Score pondéré Organisation : </p>
                  </div>
                </div>
              </div>

              <!-- Button to display details of user quotation -->
              <div class="quotation_details my-2">
                <v-col md="4" class="">
                  <!-- to="/quotation-item/:quotation-itemId" -->
                <v-btn small >Voir la cotation en détails<v-icon>more_horiz</v-icon></v-btn>
                </v-col>
              </div>
              <v-card-actions class="show_comment d-flex justify-end">
                <v-btn color="blue" rounded small dark height="32px" @click="show = !show"><v-icon>{{ show ? 'add_circle_outlined' : 'add_circle_outlined' }}</v-icon>Afficher commentaires</v-btn>
              </v-card-actions>

              <div class="d-flex flex-column">
                <v-overlay
                  :value="show"
                  :absolute="absolute"
                  :opacity="1"
                  style="width:300px; "
                >
                  <v-card-text style="overflow:auto;width:250px; margin-bottom:10px;" mt-10>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  </v-card-text>
                  <v-btn
                    class="white--text"
                    color="teal"
                    @click="show = false"

                  >
                    Fermer
                  </v-btn>
                </v-overlay>
              </div>
            </template>
          </v-col>
        </v-row>
      </v-card-text>
      <router-view></router-view>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from "lodash";
import moment from 'moment';
import { mapState } from 'vuex';
import api from '@/lib/api';
//import Quotation from '@/views/Quotation';

export default {
  name: 'SearchDialog',

  components: {

  },

  props: {
     value: Boolean
  },

  methods: {
    filterCompanies (company, queryText) {
      const companyName = company.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return companyName.indexOf(searchText) > -1 || company.id === -1;
    },
    filterSites (site, queryText) {
      const siteName = site.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return siteName.indexOf(searchText) > -1 || site.id === -1;
    },
    filterAreas (area, queryText) {
      const areaName = area.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (areaName.indexOf(searchText) > -1 || area.id === -1);

    },
    filterProductionLines (productionLine, queryText) {
      const productionLineName = productionLine.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return productionLineName.indexOf(searchText) > -1 || productionLine.id === -1;
    },

    filterQuotations (quotation, queryText) {
      const quotationDate = quotation.date.toLowerCase();
      const searchText = queryText.toLowerCase();

      return quotationDate.indexOf(searchText) > -1;
    },

    /**
     * to selected a machine and display quotation overview
     */
    previewMachine(machine) {
      this.selectedMachine = machine;
    },
    /**
     * close quotation overview box
     */
    closePreviewMachine() {
      this.selectedMachine = null;
    },

    cancelAddCompany() {
      this.createCompanyDialog = false;
      this.selectedCompany = 0;
    },

    async addCompany() {
      this.isCreatingCompany = true;
      const company = await this.$store.dispatch(`addCompany`, {
        name: this.newCompanyName,
      });
      this.isCreatingCompany = false;
      this.createCompanyDialog = false;
      this.newCompanyName = ``;
      this.selectedCompany = company.id;
    },

    cancelAddSite() {
      this.createSiteDialog = false;
    },

    async addSite() {
      //this.isCreatingSite = true;
      const site = await this.$store.dispatch(`addSite`, {
        name: this.newSiteName,
        address: this.newSiteAddress,
        company_id: this.selectedCompany,
        postalCode: parseInt(this.newSitePostalCode),  // To convert postal code in integer for site to insert in database
        city: this.newSiteCity,
      });
      this.newSiteName = ``;
      this.selectedSite = site.id;

      this.newSiteAddress = ``;
      this.newSitePostalCode = ``;
      this.newSiteCity = ``;
      this.createSiteDialog = false;
    },

    cancelAddArea() {
      this.createAreaDialog = false;
      this.selectedArea = 0;
    },

    async addArea() {
      this.isCreatingArea = true;
      const area = await this.$store.dispatch(`addArea`, {
        name: this.newAreaName,
        site_id: this.selectedSite
      });

      this.newAreaName = ``;
      this.selectedArea = area.id;
      this.createAreaDialog = false;
      this.isCreatingArea = false;
    },

    async addProduction_Line() {
      const production_line = await this.$store.dispatch(`addProduction_line`, {
        name: this.newProductionLineName,
        machineNumber: parseInt(this.newProd_LineMachineNumber), // To convert machine number in integer for production_line to insert in database
        area_id: this.selectedArea
      });

      this.newProductionLineName = ``;
      this.newProd_LineMachineNumber = ``;
      this.selectedProductionLine = production_line.id;
      this.createProductionLineDialog = false;
    },

    async addMachine() {
      const machine = await this.$store.dispatch(`addMachine`, {
        name: this.newMachineName,
        production_line_id: this.selectedProductionLine,
        company_id: this.selectedCompany,
        site_id: this.selectedSite,
        area_id: this.selectedArea,
      });

      this.newMachineName = ``;
      this.selectedMachine = machine.id;

      this.createMachineDialog = false;
    },

    async addQuotation() {

        const quotation = await this.$store.dispatch(`addQuotation`, {
        date: moment().format(),
        machine_id: this.selectedMachine.id,
        user_id: null,
      });

      this.selectedQuotation = quotation.id;
      this.$router.push({ path:`/user/quotation/${this.selectedQuotation}`});
    },



    async fetchData () {
      this.selectedQuotation = null;
      api.post(this.$route.params.id, (err, post) => {
        if (post) {
          this.post = post;
        }
        return this.selectedQuotation;
      })
    }
  },


  computed: {
    opened: {
      get () {
        return this.value
      },
      set (value) {
          this.$emit('input', value)
      },
    },
    /**
     * si je souhaite ajouter une nouvelle entreprise alors id=-1,
     * s'il me trouve une entreprise avec l'id alors il me l'affiche
     */
    companiesForFilter() {
      const companies = _.concat([], this.storeCompanies, { id: -1, name: `Ajouter une nouvelle entreprise` });
      return companies;
    },
    sitesForFilter() {
      const sites = _.concat([], this.$store.state.sites, { id: -1, name: `Ajouter un nouveau site` });
      return sites;
    },
    areasForFilter() {
      let areas = this.$store.state.areas;
      if (this.selectedSite !== null) {
        areas = _.filter(areas, { site_id: this.selectedSite });
      }
      return _.concat([], areas, { id: -1, name: `Ajouter un nouveau secteur` });
    },
    productionLinesForFilter() {
      let productionLines = this.$store.state.production_lines;
      if (this.selectedArea !== null) {
        productionLines = _.filter(productionLines, { area_id: this.selectedArea });
      } else if (this.selectedSite !== null) {
        const areasIds = _.map(this.areasForFilter, `id`);
        productionLines = _.filter(productionLines, productionLine =>
          areasIds.indexOf(productionLine.area_id) !== -1
        );
      }
      return _.concat([], productionLines, { id: -1, name: `Ajouter une nouvelle ligne de production` });
    },
    quotationsForFilter() {
      const quotations = _.concat([], this.cotations);
      return quotations;
    },

    /**
     * Choose my machine in filter
     */
    filteredMachines() {
      let machines = this.$store.state.machines;
      if (this.selectedProductionLine !== null) {
        machines = _.filter(machines, { production_line_id: this.selectedProductionLine });
      } else if (this.selectedArea !== null) {
        const productionLinesIds = _.map(this.productionLinesForFilter, `id`);
        machines = _.filter(machines, machine =>
          productionLinesIds.indexOf(machine.production_line_id) !== -1
        );
      }
      return _.concat([], machines);
    },
    /*
    filteredMachines() {
      if (!this.searchMachine) {
        return this.$store.state.machines;
      }


      const searchName = _.lowerCase(this.searchMachine);
      return _.filter(this.$store.state.machines, machine => {
        const machineName = _.lowerCase(machine.name);
        return machineName.indexOf(searchName) !== -1;
      });
    },
    */
    quotations() {
      return this.rawQuotations.map(quotation => {
        return {
          ...quotation,
          $date: moment(quotation.date, `YYYYMMDD`).format(`D MMMM YYYY`),
        };
      });
    },
    ...mapState({
      storeCompanies: `companies`,
    }),

  },

  data: () => ({
    //message: 'This is a great message!',
    resQuotation: null,

    show: false,
    absolute: true,

    createCompanyDialog: false,
    isCreatingCompany: false,
    newCompanyName: ``,
    selectedCompany: null,

    createSiteDialog: false,
    newSiteName: ``,
    newSiteAddress: ``,
    newSitePostalCode: 0,
    newSiteCity: ``,
    selectedSite: null,
    //newSiteCompanyId: null,

    createAreaDialog: false,
    isCreatingArea: false,
    newAreaName: ``,
    selectedArea: null,

    createProductionLineDialog: false,
    newProductionLineName: ``,
    newProd_LineMachineNumber: null,
    selectedProductionLine: null,

    createMachineDialog: false,
    newMachineName: ``,
    searchMachine: ``,

    selectedMachine: null,
    selectedQuotation: null,
    //dateToday: ``,

    ifQuotationOnMachineDialog: false,

    comment: {
      name: '',
    },
  
    rawQuotations: [{
      id: 1,
      date: `20180715`,
    },{
      id: 2,
      date: `20190316`,
    },{
      id: 3,
      date: `20200403`,
    }],

    currentQuotation: null,

  }),

  created() {
    this.fetchData()
  },

/**
 * Si l'id=-1 alors je peux créer une nouvelle entreprise et me génère une boîte de dialogue
 */
  watch: {
    selectedCompany (companyId) {
      if (companyId === -1) {
        this.createCompanyDialog = true;
      } else if (companyId) {
        this.$store.dispatch(`fetchSites`, companyId);
        this.$store.dispatch(`fetchAreas`, companyId);
        this.$store.dispatch(`fetchProduction_lines`, companyId);
        this.$store.dispatch(`fetchMachines`, companyId);

        //console.log(companyName);
        //const companyName = _.filter(companyId, {companies : company.name});
      }
      //return companyName;
    },
    selectedSite (siteId) {
      if (siteId === -1) {
        this.createSiteDialog = true;
      }
    },
    selectedArea (areaId) {
      if (areaId === -1) {
        this.createAreaDialog = true;
      }
    },
    selectedProductionLine (productionLineId) {
      if (productionLineId === -1) {
        this.createProductionLineDialog = true;
      }
    },
    selectedMachine () {
      this.currentQuotation = this.quotations[2];
      //return id;
    },

    '$route': 'fetchData'

  },
  beforeMount() {
    this.$store.dispatch(`fetchCompanies`);
  },
};
//module.exports = SearchDialog;


</script>

<style>

.search-dialog {
  height: 660px;
}

.filters {
  max-width: 300px;
  border-right: 1px solid #999;
}

.machines {
  max-width: 300px;
  border-right: 1px solid #999;
}

.machines .v-list-item.active {
  background-color: #f1f1f0;
}

/* @media screen and (max-width: 600px) {
  .cards {
    display: flex;
    flex-direction: column;
  }
} */

</style>
