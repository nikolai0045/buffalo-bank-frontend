<template>
  <div class="right_col" role="main">
		<div class="row">
			<div class="col-xs-12">
        <div class="x_panel" id="purchase-items">
          <div class="x_title">
            <h2>Items for Sale <small>Items currently for sale in the Buffalo Market</small></h2>
      			<div class="clearfix"></div>
          </div>
          <div class="x_content">
            <table class="table table-condensed">
              <thead>
                <th style="width:25%">Name</th>
                <th style="width:25%">Description</th>
                <th style="width:25%">Price</th>
                <th style="width:25%"></th>
              </thead>
              <tbody>
                <paginate name="purchaseItems" :list="purchaseItems" :per="15">
                  <tr v-for="item in paginated('purchaseItems')">
                    <td>{{item.name}}</td>
                    <td>{{item.description}}</td>
                    <td>${{item.price}}</td>
                    <td><i @click.prevent="deleteItem(item)" class="fa fa-trash"></i></td>
                  </tr>
                </paginate>
                <paginate-links for="purchaseItems"></paginate-links>
              </tbody>
            </table>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="x_panel">
          <div class="x_title">
            <h2>Add Item <small>Add a new item to the Buffalo Marketplace</small></h2>
      			<div class="clearfix"></div>
          </div>
          <div class="x_content">
            <form>
              <div class="form-group">
                <label for="newItemName">Name</label>
                <input v-model="newItem.name" type="text" class="form-control" id="newItemName" placeholder="Name your item">
              </div>
              <div class="form-group">
                <label for="newItemDescription">Description</label>
                <textarea v-model="newItem.description" class="form-control" rows="3"></textarea>
              </div>
              <div class="form-group">
                <label for="newItemPrice">Price</label>
                <div class="input-group">
                  <span class="input-group-addon">$</span>
                  <input type="text" class="form-control" id="newItemPrice">
                </div>
              </div>
              <button type="submit" @click.prevent="addItem()" class="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name:"ManagePurchaseItemsComponent",
  data: function(){
    return {
      purchaseItems: [],
      paginate: ['purchaseItems'],
      newItem: {
        name: "",
        description: "",
        price: 0,
      }
    }
  },
  props: ['user'],
  created: function(){
    var self = this;
    var url = '/bank/marketplace/items/';
    self.$http.get(url)
    .then(function(response){
      self.purchaseItems = response.data;
    })
  },
  methods: {
    addItem: function(){
      var self = this;
      var url = '/bank/marketplace/add_item/';
      self.$http.post(url,self.newItem)
      .then(function(response){
        self.newItem = {
          name: "",
          description: "",
          price: 0
        }
      });
      var url = '/bank/marketplace/items/';
      self.$http.get(url)
      .then(function(response){
        self.purchaseItems = response.data;
      })
    },
    deleteItem: function(item){
      var self = this;
      var url = '/bank/marketplace/delete_item/'+item.id+'/';
      self.$http.delete(url)
      .then(function(response){
        var index = self.purchaseItems.indexOf(item);
        purchaseItems.splice(index,1);
      })
    }
  }
}
</script>
