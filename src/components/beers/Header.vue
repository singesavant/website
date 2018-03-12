// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="beer-header">
    <div class="title">
      <div class="rectangle">
        <h1>{{ title }}</h1>
      </div>
      <div class="triangle">
      </div>
    </div>
  </div>
</template>

<script lang="js">
  export default {
    name: 'BeerHeader',
    props: {
      title: {
        type: String,
        default: '??'
      }
    }
  }
</script>

<style lang="scss" scoped>
.beer-header {
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

            pointer-events: none;

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
</style>
