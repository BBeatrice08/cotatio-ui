<template>
  <v-app>

    <!----------------------- HEADER --------------------------->
    <div class="header d-flex flex-row justify-space-around my-3">


        <v-row no-gutters >
          <v-col>
            <v-card-title >
              <v-toolbar>
                <v-card-title>Entreprise / Site / Secteur / Ligne / selectedMachine </v-card-title>
              </v-toolbar>
              <v-spacer></v-spacer>
              <v-toolbar>
                <v-card-title>Synthèse du</v-card-title>
              </v-toolbar>
            </v-card-title>
            <!-- <p>{{ message }}</p> -->
            <!-- <p>{{ company.name }}</p> -->
            <!-- <p>{{ quotationId }}</p> -->
            <!-- <p>{{ $route.params.selectedQuotation }}</p> -->
          </v-col>
        </v-row>
    </div>

    <!----------------------- END of HEADER -------------------->

    <!--------------------------- BODY ---------------------------->

    <v-row no-gutters>
      <v-col>
        <div class="page_center d-flex flex-row">

          <!-- On side, menu to navigation between the differents indicators/items -->
          <div class="indicators_menu">

            <v-row class="menu" no-gutters>
              <v-col>
                <v-card>
                  <v-toolbar
                    color="teal"
                    dark
                  >
                    <v-toolbar-title>Indicateurs / Items</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-list >
                    <v-list-group
                      v-for="indicator in indicatorsMenu"
                      :key="indicator.id"
                      :name="indicator.name"
                    >
                      <template v-slot:activator >
                        <!-- <v-list-item-content> -->
                          <v-list-item-title >{{ indicator.name }}</v-list-item-title>
                        <!-- </v-list-item-content> -->
                      </template>

                      <v-list-group
                        v-for="group in indicator.groups"
                        :key="group.id"
                        :name="group.name"
                        no-action
                        sub-group
                      >
                        <template v-slot:activator >
                          <v-list-item-content>
                            <v-list-item-title>{{ group.name }}</v-list-item-title>
                          </v-list-item-content>
                        </template>

                        <v-list-item
                          v-for="item in group.items"
                          :key="item.id"
                          :class="{ active: selectedItem && selectedItem.id === item.id }" @click="previewItem(item); "
                        >
                          <!-- <v-list-item-content> -->
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                          <!-- </v-list-item-content> -->
                        </v-list-item>
                      </v-list-group>
                    </v-list-group>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- All the informations to complete the quotation -->
          <v-col class="quotation_form">

            <template v-if="selectedItem && selectedItem.name=='Synthèse'">
              <v-btn icon @click="closePreviewItem()">
                  <v-icon>cancel</v-icon>
              </v-btn>
              <p>Synthèse</p>
              
              <p>Score pondéré machine</p>
              <p>Score pondéré Efforts</p>
              <p>Score pondéré Dimensionnement</p>
              <p>Score pondéré Temporel</p>
              <p>Score pondéré Environnement</p>
              <p>Score pondéré Organisation</p>

              <div class="scoring_table d-flex flex-row justify-end" v-if="true">
                <!-- To display the table of score scale -->
                <template>
                  <div class="text-center">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          color="blue-grey darken-3"
                          dark
                          v-on="on"
                          class="pr-0 mr-2"
                        >
                          Echelle des scores
                          <v-icon>arrow_drop_down</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-col pl-4>Score minimal = 100</v-col>
                        <v-list-item
                          v-for="(scores, index) in scores"
                          :key="index"
                        >
                          <v-list-item-title>{{ scores.title }} : <v-icon :color= scores.color >label</v-icon> {{ scores.valeur }}</v-list-item-title>

                        </v-list-item>
                        <v-col pl-4>Score maximal = 1000</v-col>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
              </div>
            </template>

            <template v-else-if="selectedItem && selectedItem.name!='Synthèse'">
              <v-form @submit.prevent="addQuotation_Item()">

                <div class="item_title d-flex flex-row">
                  <v-list-item>{{ selectedItem.name }}</v-list-item>
                  <v-tooltip bottom max-width="800px">
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">help</v-icon>
                    </template>
                    <span>{{ selectedItem.description }}</span>
                  </v-tooltip>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="closePreviewItem()">
                    <v-icon>cancel</v-icon>
                  </v-btn>
                </div>

                <div class="is_concerned">
                  <v-checkbox
                    v-model="concerned"
                    :label="`Non concerné`"
                    false
                  ></v-checkbox>
                </div>

                <div class="global_rating d-flex flex-row justify-center" style="padding: 100px 0;">

                  <div class="rating_dark_green d-flex flex-column align-center mr-10" >

                    <v-btn :disabled="concerned" id="btn_1" fab small>
                      <h2>0</h2>
                    </v-btn>
                    <input type="radio" :disabled="concerned" name="rank" value="0" onclick="" />
                    <p class="mt-3">{{selectedItem.score_label_1}}</p>
                  </div>

                  <div class="rating_light_green d-flex flex-column align-center mr-10">
                    <v-btn :disabled="concerned" id="btn_2" value="1" fab small>
                      <h2>+</h2>
                    </v-btn>
                    <input type="radio" :disabled="concerned" name="rank" value="1" onclick="" />
                    <p class="mt-3">{{selectedItem.score_label_2}}</p>
                  </div>

                  <div class="rating_yellow d-flex flex-column align-center mr-10">
                    <v-btn :disabled="concerned" id="btn_3" value="2" fab small>
                      <h2>++</h2>
                    </v-btn>
                    <input type="radio" :disabled="concerned" name="rank" value="2" onclick="" />
                    <p class="mt-3">{{selectedItem.score_label_3}}</p>
                  </div>

                  <div class="rating-red d-flex flex-column align-center">
                    <v-btn :disabled="concerned" id="btn_4" value="3" fab small>
                      <h2>+++</h2>
                    </v-btn>
                    <input type="radio" :disabled="concerned" name="rank" value="3" onclick="" />
                    <p class="mt-3">{{selectedItem.score_label_4}}</p>
                  </div>
                </div>

                <v-card-actions>
                  <v-btn rounded small type="submit" ><v-icon>done</v-icon>Valider</v-btn>
                </v-card-actions>

                <div class="add_comment">
                  <v-expansion-panels>
                    <v-expansion-panel style="height:200px; width:350px;">
                      <v-expansion-panel-header>
                        <template v-slot:default="{ open }" >
                          <v-row class="d-flex align-center" >
                            <v-col
                              cols="12"
                              class="text--secondary"

                            >
                              <v-toolbar flat>
                                <v-icon>add_comment</v-icon><h4>Ajouter un commentaire</h4>
                                <v-spacer></v-spacer>
                              </v-toolbar>
                              <v-fade-transition leave-absolute>
                                <span
                                  v-if="open"
                                  key="1"
                                >
                                </span>
                              </v-fade-transition>
                            </v-col>
                          </v-row>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content ma-5>
                        <div class="d-flex flex-row ma-5">
                          <v-text-field
                            v-model="comment.name"
                            placeholder="Nouveau commentaire"
                          ></v-text-field>
                          <v-card-actions class="pa-0 ml-5">
                            <v-btn
                            text
                            color="primary"
                            >
                            Valider
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>                

              </v-form>
            </template>
          </v-col>
        </div>        
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import _ from "lodash";
//import SearchDialog from "@/components/SearchDialog"
//get information from url started by /api/smthg
//import api from '@/lib/api.js';
//import { mapState } from 'vuex';

export default {
  name: 'Quotation',

  components: {
   //'SearchDialog': SearchDialog,

  },

  props: 
  {
    value: Boolean,
    //selectedMachine: {},
    //message: SearchDialog.message,
  },

  methods: {
    previewItem(item) {
      this.selectedItem = item;
    },

    closePreviewItem() {
      this.selectedItem = null;
    },

    // isSelected() {
    //   this.$refs.SearchDialog.selectedMachine();
    // }

    async addQuotation_Item() {
      var rank = document.forms[0];
      var i;
      var getValue = null;
      //getValue = null;

      for (i=0; i<rank.length; i++) {
        if (rank[i].checked) {
          getValue = rank[i].value;
        }
        return getValue;
      }

      const quotation_item = await this.$store.dispatch(`addQuotation_Item`, {
        isConcerned: false,
        score: this.getValue,
        //comment: this.newQuotationItemComment,
        quotation_id: this.selectedQuotation,
        item_id: this.selectedItem

      });
      //this.newQuotationItemComment = ``;
      this.selectedQuotationItem = quotation_item.id;
      
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

    indicatorsMenu() {
      const indicators = _.concat([], this.$store.state.indicators);
      return indicators;
    },

  },

  data: () => ({

    // component: 'SearchDialog',

    // selectedMachine: null,

    selectedItem: null,
    //searchItem: ``,
    selectedIndicator: null,

    concerned: false,

    comment:false,

    scores: [
      { title: 'Score entre 100 et 167', color:'green darken-1', valeur:'très bien' },
      { title: 'Score entre 168 et 333', color:'light-green lighten-1', valeur:'bien' },
      { title: 'Score entre 334 et 500', color:'yellow', valeur:'passable' },
      { title: 'Score entre 501 et 667', color:'amber darken-1', valeur:'moyen' },
      { title: 'Score entre 668 et 834', color:'red', valeur:'mauvais' },
      { title: 'Score entre 835 et 1000', color:'red darken-4', valeur:'très mauvais' },
    ],
  }),

//api called
  mounted () {

    },

    watch: {
      
    },

    beforeMount() {
      this.$store.dispatch(`fetchIndicators`);
    }

};
</script>
<style>

/*default button's score color*/
#btn_1 {
  background-color: #00897B;
  margin-bottom: 20px;
}

#btn_2 {
  background-color: #7CB342;
  margin-bottom: 20px;
}

#btn_3 {
  background-color: #FFFF00;
  margin-bottom: 20px;
}

#btn_4 {
  background-color: #E53935;
  margin-bottom: 20px;
}


/*Button's score color on click*/

#btn_1:focus {
  color: #fff;
  border: solid black;
}

#btn_2:focus {
  color: #fff;
  border: solid black;
}

#btn_3:focus {
  color: #fff;
  border: solid black;
}

#btn_4:focus {
  color: #fff;
  border: solid black;
}
</style>