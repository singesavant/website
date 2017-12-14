// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product">
    <div class="header">
      <div class="title">
        <div class="rectangle">
          <h1>HopShot<br/>IPA</h1>
        </div>
        <div class="triangle">
        </div>
      </div>
    </div>

    <div class="about">
      <div class="left">
        <img src="/static/images/product/hopshot/product_big.jpg" alt="big">
      </div>
      <div class="right">
        <div class="text">
          <h2>Qu'est ce que ?</h2>
          <p>Blah!</p>
         </div>
      </div>
    </div>

    <div class="more">
      <div class="left">
        <div class="text">
          <h2>Caractéristiques</h2>
          <p>Blah!</p>
         </div>
      </div>
      <div class="right">
        <img src="/static/images/product/hopshot/logo.png" alt="logo">
      </div>
    </div>


  </div>
</template>

<script lang="js">
import { mapState } from 'vuex'

var data = {
}

export default {
  name: 'ProductDetail',

  components: {
  },
  data: function () {
    return data
  },
  mounted: function () {
    this.toggleFlickering()
  },
  methods: {
  },
  computed: mapState(['isAuthenticated'])
}
</script>

<style lang="scss">
.product {
    height: 100%;
    width: 100%;

    background-color: white;

    .about {
        background-color: black;
        display: flex;
        flex-direction: row;
        justify-content: center;


        .left {
          width: 35vw;
          img {
             max-width: 100%;
             height: 100%;
          }
        }

        .right {
          background-color: white;
          width: 35vw;
          .text {
            padding: 40px;
          }
        }
    }

    .more {
        background-color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;


        .left {
          .text {
            padding: 40px;
          }

          width: 35vw;
          background-color: #eee;
        }

        .right {
          background-color: white;
          width: 35vw;

          img {
             padding: 10%;
             max-width: 80%;
          }

        }
    }


    .header {
        height: 50vh;
        background-image: url(/static/images/product/hopshot/header.jpg);
        width: 100%;

        display: flex;
        justify-content: center;
        flex-direction: row;

        text-align: center;

        .title {

        margin-top: 20vh;

        .rectangle {
            border: 0.4vw solid black;
            width: 60vw;
            height: auto;
            text-align: center;

            display: flex;
            justify-content: center;

            z-index: 7;


            h1 {
                letter-spacing: 1em;
                line-height: 1.5em;
                text-transform: uppercase;
                margin: 20;
                padding: 0;

                z-index: 10;
            }
        }

        .triangle {
            height: 30vw;
            width: 30vw;
            position:relative;
            margin: 0 auto;

            overflow:hidden;
            top: -10vw;

            z-index: 8;

            &:after {
                height:100%;
                width:100%;
                position:relative;
                content:'';
                transform: rotate(45deg);
                display:block;
                position:absolute;
                top: -75%;
                background-image:url(/static/images/product/hopshot/header.jpg);
                background-size:cover;
                box-shadow: -1px 3px 5px 3px rgba(0, 0, 0, 0.7);
            }
         }

        }
    }
}
</style>
