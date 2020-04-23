<template lang="html">
  <div>
    <ul class="ibus" :id="`ibu-container-`+id">
      <li :key="`ibu`+index" :index="index" v-for="(n, index) in get_ibus()" class="bullet ibu-bullet"></li>
      <li :key="`remainingibu`+index" :index="index" v-for="(n, index) in get_missing_ibus()" class="bullet no-ibu-bullet"></li>
    </ul>

    <b-tooltip :target="`ibu-container-`+id" placement="bottom" triggers="hover click blur">
      <span class="ibu-comment" v-if="get_ibus() == 1">Pas du tout amère</span>
      <span class="ibu-comment" v-if="get_ibus() == 2">Légèrement amère</span>
      <span class="ibu-comment" v-if="get_ibus() == 3">Assez amère</span>
      <span class="ibu-comment" v-if="get_ibus() == 4">Amertume soutenue</span>
      <span class="ibu-comment" v-if="get_ibus() == 5">Très amère</span>
    </b-tooltip>
  </div>
</template>


<script lang="js">

export default {
    name: 'IBUGauge',

    data: function() {
        return {id: null}
    },

    mounted: function() {
        this.id = this._uid
    },

    props: {
        ibus: String
    },

    methods: {
        get_ibus: function () {
            var ibus = parseInt(this.ibus)
            if (ibus >= 0 && ibus <= 5) {
                return ibus
            } else
                return 0

        },
        get_missing_ibus: function () {
            return (5 - this.get_ibus(this.ibus))
        }
    }
}

</script>

<style lang="scss" scoped>
.ibu-comment {
    text-align: center;
    width: 100%;
    font-weight: 300;
}

.ibus {
    list-style-type: none;
    text-align: center;
    padding: 0px;

    .bullet {
        display: inline-block;
        width: 20px;
        height: 20px;

        border: 1px solid;
        border-radius: 50px;

        margin-left: 2px;
        margin-right: 2px;
    }

    li.ibu-bullet {

        background-color: black;
        color: black
    }
    li.no-ibu-bullet {

    }


}
</style>
