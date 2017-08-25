<template>
	<div class="right_col" role="main">
		<edit-purchase-item-modal-component @updateItems="getItems()" @closeEditItemModal="showEditItemModal=false;selectedItem=null;" :show="showEditItemModal" :item="selectedItem"></edit-purchase-item-modal-component>
		<div class="row">
			<div class="col-xs-12">
				<div class="x_panel" id="purchase-items">
					<div class="x_title">
						<div class="col-md-6">
							<h2>Items for Sale <small>Items currently for sale in the Buffalo Market</small></h2>
						</div>
						<!-- <div class="col-md-6">
							<div class="pull-right">
								<input class="form-control" type="text" placeholder="Search..."/>
							</div>
						</div> -->
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<table class="table table-condensed">
							<thead>
								<th style="width:20%">Name</th>
								<th style="width:20%">Description</th>
								<th style="width:20%">Price</th>
								<th style="width:20%">Quantity Remaining</th>
								<th style="width:20%"></th>
							</thead>
							<tbody>
								<tr v-for="item in selectedItems">
									<td style="text-align:left;">{{item.name}}</td>
									<td style="text-align:left;">{{item.description}}</td>
									<td style="text-align:left;">${{item.current_price}}</td>
									<td style="text-align:left;">{{item.quantity_remaining}}</td>
									<td>
										<i style="cursor:pointer;" @click.prevent="deleteItem(item)" class="fa fa-trash"></i> |
										<i style="cursor:pointer;" @click.prevent="selectedItem=item;showEditItemModal=true" class="fa fa-pencil"></i>
									</td>
								</tr>
							</tbody>
						</table>
						<button class="btn btn-default" v-if="itemIndex != 0" @click="decrementPage()">Previous Page</button>
						<button class="btn btn-default" v-if="hasNextPage()" @click="itemIndex=itemIndex+10">Next Page</button>
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
								<label for="newItemQuantity">Quantity</label>
								<input v-model="newItem.quantity_remaining" type="number" class="form-control" id="newItemQuantity" />
							</div>
							<div class="form-group">
								<label for="newItemPrice">Price</label>
								<div class="input-group">
									<span class="input-group-addon">$</span>
									<input type="text" v-model="newItem.current_price" class="form-control" id="newItemPrice">
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
import EditPurchaseItemModalComponent from './ManagePurchaseItems/EditPurchaseItemModal.vue'
export default {
	name:"ManagePurchaseItemsComponent",
	components: {
		EditPurchaseItemModalComponent
	},
	data: function(){
		return {
			purchaseItems: [],
			itemsPerPage: 10,
			itemIndex: 0,
			showEditItemModal: false,
			selectedItem: null,
			newItem: {
				name: "",
				description: "",
				current_price: 0,
				quantity_remaining: 0,
			}
		}
	},
	props: ['user'],
	computed: {
		selectedItems: function(){
			var self = this;
			if (self.itemIndex + self.itemsPerPage < self.purchaseItems.length) {
				return self.purchaseItems.slice(self.itemIndex,self.itemIndex+self.itemsPerPage);
			} else {
				return self.purchaseItems.slice(self.itemIndex,self.purchaseItems.length);
			}
		}
	},
	created: function(){
		this.getItems();
	},
	methods: {
		getItems: function(){
			var self = this;
			var url = '/bank/marketplace/items/';
			self.$http.get(url)
			.then(function(response){
				self.purchaseItems = response.data;
			});
		},
		addItem: function(){
			var self = this;
			var url = '/bank/marketplace/add_item/';
			self.$http.post(url,self.newItem)
			.then(function(response){
				self.getItems();
				self.newItem = {
					name: "",
					description: "",
					current_price: 0,
					quantity_remaining: 0
				}
			});
		},
		deleteItem: function(item){
			var self = this;
			var url = '/bank/marketplace/delete_item/'+item.id+'/';
			self.$http.delete(url)
			.then(function(response){
				var index = self.purchaseItems.indexOf(item);
				self.purchaseItems.splice(index,1);
			});
		},
		decrementPage: function(){
			var self = this;
			if (self.itemIndex - self.itemsPerPage < 0) {
				self.itemIndex = 0;
			} else {
				self.itemIndex = self.itemIndex - self.itemsPerPage;
			}
		},
		hasNextPage: function(){
			var self = this;
			if (self.itemIndex + self.itemsPerPage < self.purchaseItems.length){
				return true;
			} else {
				return false;
			}
		}
	}
}
</script>
