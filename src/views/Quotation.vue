<template>
  <v-app>

    <!--------------------------- BODY ---------------------------->
    <v-row no-gutters class="mt-10">

      <!-- On side, menu to navigation between the differents indicators/items -->
      <v-col class="menu" no-gutters  sm="4">
        <v-card class="menu_card" max-width= "300px">
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
                  <v-list-item-title >{{ indicator.name }}</v-list-item-title>
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
                  :class="{ active: selectedItem && selectedItem.id === item.id }" @click="previewItem(item);"                          
                >
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">help</v-icon>
                    </template>
                    <span>{{ item.name }}</span>
                  </v-tooltip>

                    <v-list-item-title class="ml-2">{{ item.name }}</v-list-item-title>                        
                </v-list-item>
              </v-list-group>
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>

      <!-- All the informations to complete the quotation -->
      <v-col class="quotation_form" sm="">

        <template v-if="selectedItem && selectedItem.name=='Synthèse'">
          <v-col class="column_1">
            <v-toolbar flat class="d-flex justify-end">
              <v-btn icon @click="closePreviewItem()">
                  <v-icon>cancel</v-icon>
              </v-btn>
            </v-toolbar>
            
            <template>
              <v-card
                class="mx-auto mb-4"
                outlined
              >
                <v-list-item three-line>
                  <v-list-item-content class="py-4">
                    <div class="overline text-decoration-underline mb-4">
                      Synthèse de la machine
                    </div>
                    <v-list-item-title class="headline mb-1">
                      Score global de la machine :
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-h2 d-flex justify-center">{{ machineScore }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                  <v-btn
                    outlined
                    rounded
                    text
                    @click="showQuotation_ItemContent()" 
                    :value="machineScore"
                  >
                    Générer le score
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>

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
          </v-col>
        </template>

        <template v-else-if="selectedItem && selectedItem.name!='Synthèse' && itemContent == 0">
          <v-col class="column_2">
            <v-form @submit.prevent="addQuotation_Item()" >

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

              <form>
                <div class="global_rating d-flex flex-row justify-center" style="padding: 100px 0;">

                  <div class="rating">
                    <v-btn :disabled="concerned" id="btn_1" fab small>
                      <h2>0</h2>
                    </v-btn>
                    <input type="radio" :disabled="concerned" name="rank" id="one" value="5" v-model="scored" />
                    <label for="one" class="mt-3">{{selectedItem.score_label_1}}</label>
                  </div>

                  <div class="rating">
                    <v-btn :disabled="concerned" id="btn_2" fab small>
                      <h2>+</h2>
                    </v-btn>
                    <input type="radio" :disabled="concerned" name="rank" id="two" value="10" v-model="scored" />
                    <label for="two" class="mt-3">{{selectedItem.score_label_2}}</label>
                  </div>

                  <div class="rating">
                    <v-btn :disabled="concerned" id="btn_3" fab small>
                      <h2>++</h2>
                    </v-btn>
                    <input type="radio" :disabled="concerned" name="rank" value="20" v-model="scored" />
                    <label class="mt-3">{{selectedItem.score_label_3}}</label>
                  </div>

                  <div class="rating">
                    <v-btn :disabled="concerned" id="btn_4" fab small>
                      <h2>+++</h2>
                    </v-btn>
                    <input type="radio" :disabled="concerned" name="rank" value="25" v-model="scored" />
                    <label class="mt-3">{{selectedItem.score_label_4}}</label>
                  </div>

                </div>
              </form>

              <v-card-actions>
                <v-btn rounded small type="submit" ><v-icon>done</v-icon>Valider</v-btn>
              </v-card-actions>

              <div class="add_comment">
                <v-expansion-panels>
                  <v-expansion-panel style="height:200px; width:350px;">
                    <v-expansion-panel-header>
                      <template v-slot:default="{ open }">
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
                          v-model="newQuotationItemComment"
                          placeholder="Nouveau commentaire"
                        ></v-text-field>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>                

            </v-form>
          </v-col>
        </template>

        <template v-else-if="selectedItem && selectedItem.name!='Synthèse' && itemContent !== 0">

          <p>Sur cet item, les éléments déjà renseignés sont :</p>
          <v-list-item
            v-for="content in itemContent"
            :key="content.id"
            >          
            <v-card class="mx-auto">
              <v-card-text>
                <p class="display-1 text--primary pb-4">
                  {{selectedItem.name}}
                </p>
                <p class="body-1">Est-il concerné : {{content.isConcerned}}</p>
                <p class="headline">Score enregistré : {{content.score}}</p>
                <p class="body-2">Commentaire : {{content.comment}}</p>
              </v-card-text>
            </v-card>
          </v-list-item>
        </template>        
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import _ from "lodash";

export default {
  name: 'Quotation',

  components: {
    
  },

  props: 
  {
    value: Boolean,
    
  },

  methods: {

    async previewItem(item) {
      this.selectedItem = item;
      var getQuotationId = JSON.parse(window.localStorage.selectedQuotation);
      var selectedQuotation = parseInt(getQuotationId, 10);
      var content = await this.$store.dispatch(`fetchQuotation_Items`, { 
        selectedQuotation,
        itemId: this.selectedItem.id,
      });

      return content;
    },

    closePreviewItem() {
      this.selectedItem = null;
    },

    async addQuotation_Item() {

      try {
        if(this.concerned == true) {
          await this.$store.dispatch(`addQuotation_Item`, {
          isConcerned : this.concerned,
          score : 0,
          comment: this.newQuotationItemComment,
          quotation_id: parseInt(this.$route.params.selectedQuotation), /*received a string to convert in int to add in database*/
          item_id: this.selectedItem.id,
          });
          this.newQuotationItemComment = ``;
        } else {
            await this.$store.dispatch(`addQuotation_Item`, {
            isConcerned : this.concerned,
            score : parseInt(this.scored),
            comment: this.newQuotationItemComment,
            quotation_id: parseInt(this.$route.params.selectedQuotation), /*received a string to convert in int to add in database*/
            item_id: this.selectedItem.id,      
            });
            this.newQuotationItemComment = ``;
        }
      } catch {
        console.log("error sending infos to database");
      }  
      
    },

    async showQuotation_ItemContent() {
      var thisQuotation = JSON.parse(window.localStorage.selectedQuotation);
      var myQuotation = parseInt(thisQuotation, 10);
      var synthesisQuotation_Item = await this.$store.dispatch(`fetchAllQuotation_ItemsByAQuotation`, 
        myQuotation,
      );
      return synthesisQuotation_Item;
    },
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

    itemContent() {
      var myContent = this.$store.state.quotation_items;
      return myContent;
    },

    machineScore() {

      var forArray = this.$store.state.quotation_items;
      var totalItem = Array.from(forArray);

      let scoreTotal = 0;
      for(let i=0; i < totalItem.length; i++){          

          if (totalItem[i].score){
            scoreTotal = totalItem[i].score + scoreTotal;
          }
        }
      return scoreTotal;
      
    },

  },

  data: () => ({
    selectedItem: null,
    newQuotationItemComment: ``,
    scored: null,
    content: {},
    synthesisQuotation_Item: [],
    totalItem: {},
    scoreTotal: null,
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

  watch: {

  },

  mounted () {
      
    },

    beforeMount() {
      this.$store.dispatch(`fetchIndicators`);

      window.localStorage.selectedQuotation = JSON.stringify(this.$route.params.selectedQuotation);
    },

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

.quotation_form {
  margin-left: 10px;
}

.menu {
  min-width: 300px;
}

.menu_card {
  width: 300px;
}

.body-1 {
  color: #424242;
}

@media screen and (max-width: 599px) {
  .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1%;
    min-width: 70px;
  }
}

@media screen and (min-width: 600px) {
  .quotation_form {
    max-width: 100%;
  }

  .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 4%;
  }
}
</style>