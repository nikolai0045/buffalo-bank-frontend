<template>
	<div class="modal fade" id="editItemModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Edit Item</h4>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group">
							<label for='editItemName'>Name</label>
							<input id="editItemName" v-model="name" class="form-control" placeholder="Assignment Name" />
						</div>
						<div class="form-group">
							<label for='editItemDescription'>Description</label>
							<input id="editItemDescription" v-model="description" class="form-control" placeholder="Description"/>
						</div>
						<div class="form-group">
							<label for="editItemPrice">Price</label>
							<div class="input-group">
								<span class="input-group-addon">$</span>
								<input type="number" id="editItemPrice" v-model="current_price" class="form-control" placeholder="Price" />
							</div>
						</div>
						<div class="form-group">
							<label for="editItemQuantity">Quantity</label>
							<input type="number" id="editItemQuantity" v-model="quantity_remaining" class="form-control" placeholder="Quantity" />
						</div>
						<div class="clearfix"></div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" disabled style="display:none;" class="btn btn-danger"></button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-primary" @click="submit()" data-dismiss="modal">Save</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'EditPurchaseItemModalComponent',
	props: ['item','show'],
	data: function(){
		return {
			name: "",
			description: "",
			current_price: 0,
			quantity_remaining: 0,
		}
	},
	mounted: function(){
		$('#editItemModal').on('hide.bs.modal',this.close);
	},
	watch: {
		show: function(newValue){
			if(newValue){
				$('#editItemModal').modal('show');
			} else {
				$('#editItemModal').hide();
			}
		},
		item: function(item){
			var self = this;
			if(item!=null){
				self.name = item.name;
				self.description = item.description;
				self.current_price = item.current_price;
				self.quantity_remaining = item.quantity_remaining;
			}
		}
	},

	methods: {
		submit: function(){
			var item = {
				name: this.name,
				description: this.description,
				current_price: this.current_price,
				quantity_remaining: this.quantity_remaining,
			}
			var url = "/bank/marketplace/item/update/"+this.item.id+'/';
			var self = this;
			this.$http.put(url,item)
				.then(function(response){
				self.$emit('updateItems');
			});
			this.close();
		},
		close: function(){
			this.$emit('closeEditItemModal');
			this.current_price = null;
			this.quantity_remaining = null;
			this.description = null;
			this.name = null;
		},
	}
}
</script>
