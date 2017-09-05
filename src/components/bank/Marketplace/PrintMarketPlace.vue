<template>
  <div id="customWrapper">
    <h2 style="text-align:center;">Buffalo Bank Marketplace Options</h2>
    <div v-for="block in blocks" class="container">
      <h3 style="text-align:center;">${{block.price}}</h3>
      <hr>
      <ul>
        <li v-for="item in block.items"><b>{{item.name}}</b><span v-if="item.description && item.description != ''"> - {{item.description}}</span></li>
      </ul>
      <!-- <p v-for="item in block.items">
        <b>{{item.name}}</b> - {{item.description}}
      </p> -->
    </div>
  </div>
</template>

<style>
#customWrapper{
  right: 0px;
  margin: 0px auto;
  margin-top: 5%;
  max-width: 750px;
  position: relative;
}
</style>

<script>
export default {
  name: "PrintMarketplaceComponent",
  data: function(){
    return {
      blocks: []
    }
  },
  created: function(){
    this.fetchBlocks();
  },
  methods: {
    fetchBlocks: function(){
      var url = "bank/marketplace/items_by_price/";
      var self = this;
      self.$http.get(url)
      .then(function(response){
        self.blocks = response.data;
      })
    }
  }
}
</script>
