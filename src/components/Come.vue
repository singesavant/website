// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product-list">
    <beer-header title-img="/static/images/home/beers_text.png" nolink></beer-header>

    <b-row align-h="center" no-gutters  class="paragraphs">
      <b-col cols="8">
        <b-row align-h="center" no-gutters>
          <b-col>
            <b-row class="paragraphs-row" no-gutters >
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/static/images/come/map.jpg" alt="carte"/>
              </b-col>
              <b-col class="text" align-v="bottom" sm="6">
                OHOO
              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                OHOO
              </b-col>
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/static/images/come/path-1.jpg" alt="chemin1"/>
              </b-col>

              <b-col align-v="bottom" sm="6">
                <img class="full" src="/static/images/come/path-2.jpg" alt="chemin1"/>
              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                OHOO
              </b-col>


              <b-col class="text" align-v="bottom" sm="6">
                OHOO
              </b-col>
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/static/images/come/path-3.jpg" alt="chemin 3"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>



      </b-col>
    </b-row>

    <monkey-footer/>


    <!--

    <b-row class="justify-content-md-center old-beers">
      <b-col cols="10">
        <h2>Vous avez tout bu :</h2>

        <b-row class="justify-content-md-center beer-list">
          <b-col align="center" cols="2" v-for="beer in orderBy(beers_not_produced_anymore, 'name')" :key="beer.name">
            <beer-card :beer="beer"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    -->

  </div>
</template>

<script lang="js">
import { mapState } from 'vuex'
import BeerHeader from './beers/Header'
import MonkeyFooter from './Footer'

var data = {
}

export default {
  name: 'Contact',

  computed: {
    ...mapState([
    ])
  },

  components: {
    BeerHeader,
    MonkeyFooter
  },

  data: function () {
    return data
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.beer-list {
  margin-top: 50px;
}

.paragraphs {
    background-color: #eee;
}

.paragraphs-row {
    margin-top: -10vh;
    background-color: white;
    margin-bottom: 10vh;
    padding-bottom: 10vh;

    img.full {
        width:100%;
        height: 100%;
        object-fit:contain;
    }

    .text {
        padding: 10px;
    }
}
</style>
