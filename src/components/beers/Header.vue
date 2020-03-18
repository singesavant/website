// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="beer-header">
    <b-row class="full-width" align-h="center" align-v="bottom" no-gutters>
      <b-col sm="8" md="5">
        <div class="title">
          <div class="rectangle">
            <h1 v-if="title">{{ title }}</h1>
            <img :src="titleImg" v-if="titleImg"/>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="!nolink" class="full-width" align-h="center" align-v="bottom" no-gutters>
      <b-col class="go-back" cols="4">
        <router-link :to="{name: 'beer-list'}">
          <img class="back" src="/images/product/back.png">
          Retour aux bières
        </router-link>
      </b-col>
    </b-row>
    <b-row class="spacer" align-h="center" no-gutters>
    </b-row>
  </div>
</template>

<script lang="js">
  export default {
    name: 'BeerHeader',
    props: {
      title: {
        type: String,
        default: null
      },
      titleImg: {
        type: String,
        default: null
      },
      nolink: {
        type: Boolean,
        default: false
      }

    }
  }
</script>

<style lang="scss" scoped>
.beer-header {
    height: 70vh;
    background-image: url(/images/product/header.jpg);
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-content: flex-end;
    align-items: flex-end;

    justify-content: flex-end;

    text-align: center;

    .full-width {
        width: 100%;
     }

    .spacer {
        height: 27vh;
    }

    .title {
        h1 {
            letter-spacing: 0.2em;
            line-height: 1.2em;
            text-transform: uppercase;
            font-weight: 350;
            padding: 0;
            color: white;
            font-size: 6vh;
            padding-bottom: 1vh;
        }

        img {
            height: 30vh;
            margin-top: 20vh;
        }

    }

    .go-back {
        text-align: center;

        a, a.visited {
            color: white;
            font-weight: 350;
            text-decoration: underline;
        }

        img {
            margin-left: auto;
            margin-right: auto;
            width: 3vh;
            }
    }
    .back {
        display: block;
    }
}
</style>
