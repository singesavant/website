// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
    <router-link :to="{name: 'beer-detail', params: {slug: beer.code}}">
      <div class="beer-card">
        <img class="beer-label-round" :src="beer.thumbnail|erp_static_url" :alt="beer.name">
        <!-- <p class="card-text" v-html="$options.filters.truncate(beer.description_html, 200, '...')"></p> -->
        <h3>{{ beer.name }}</h3>
      </div>
    </router-link>
</template>


<script lang="js">
export default {
  name: 'BeerCard',
  props: ['beer'],

  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  }
}
</script>


<style lang="scss" scoped>
.beer-card {
    color:black;
    font-variant: small-caps;
    padding-bottom: 5vh;

    h3 {
        font-size: 1.5em;
    }

    img {
        transition: all .3s ease-in-out;
    }

    &:hover {

      img {
        transition: all .3s ease-in-out;
        transform: scale(1.05);
      }
    }

    .beer-label-round {
        border: 1px solid black;
        width: 90%;
        object-fit: fill;
        clip-path: circle(35% at center);

        padding: 0px;
        margin: -30px;
    }

}
</style>

