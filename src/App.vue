// -*- mode: vue; js-indent-level: 2; -*-
<script lang="js">
  import Menubar from '@/components/Menubar'

  export default {
    components: {
      Menubar
    }
  }
</script>

<template lang="html">
<!DOCTYPE html>
<html lang="fr">
  <head>

  <meta name="twitter:title" content="Le Singe Savant, brasserie urbaine à Lille">
    <meta name="twitter:description" content="Le Singe Savant est une nano-brasserie urbaine, un brewlab (espace de co-brassage) et un brewshop ; le tout au coeur de Lille.">
    <meta name="twitter:creator" content="@singesavantbrew">
    <meta name="twitter:image:src" content="http://www.singe-savant.com/images/meta-banner.jpg">

    <!-- Microdata / Google+ Schema.org markup -->
    <meta itemprop="name" content="Le Singe Savant, brasserie urbaine à Lille">
    <meta itemprop="description" content="Le Singe Savant est une nano-brasserie urbaine, un brewlab (espace de co-brassage) et un brewshop ; le tout au coeur de Lille.">
    <meta itemprop="image" content="http://www.singe-savant.com/images/meta-banner.jpg">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="57x57" href="/static/images/favicons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/static/images/favicons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/static/images/favicons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/static/images/favicons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/static/images/favicons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/static/images/favicons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/static/images/favicons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/static/images/favicons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/static/images/favicons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/static/images/favicons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/static/images/favicons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicons/favicon-16x16.png">
    <link rel="manifest" href="/static/images/favicons/manifest.json">
    <meta name="msapplication-TileColor" content="#092E41">
    <meta name="msapplication-TileImage" content="/static/images/favicons/ms-icon-144x144.png">
    <meta name="theme-color" content="#092E41">

  </head>
  <body>
      <div id="app">
          <transition name="fade" mode="out-in" appear>
              <menubar v-if="['home'].indexOf($route.name) == -1"></menubar>
          </transition>

          <transition name="fade" mode="out-in" appear>
              <router-view></router-view>
          </transition>
      </div>
  </body>
</html>

</template>



<style lang="scss">
</style>
