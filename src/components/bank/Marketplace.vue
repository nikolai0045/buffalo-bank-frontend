<template>
	<div class="right_col" row="main" min-height="712px">
		<div class="x_panel" id="managementTools" v-if="user.merchant">
			<div class="x_title">
				<h2>Merchant Dashboard <small>Use these tools to manage your marketplace</small></h2>
				<div class="clearfix"></div>
			</div>
			<div class="x_content">
				<router-link class="btn btn-default" :to="{ name: 'marketplace_manager' }">Manage Items</router-link>
				<router-link class="btn btn-default" :to="{ name: 'merchant' }">Sell Items</router-link>
			</div>
		</div>
		<div class='col-xs-12'>
			<router-link class="btn btn-primary" :to="{name: 'print_marketplace'}" target="_blank">View Printable Version</router-link>
			<router-link class="btn btn-primary" :to="{name: 'recent_purchases'}">View Recent Purchases by Grade</router-link>
		</div>
		<div class="col-sm-6" v-for="item in purchaseItems">
			<div class="x_panel">
				<div class="x_title">
					<h2>{{item.name}}</h2>
					<div class="clearfix"></div>
				</div>
				<div class="x_content">
						<h3>${{item.current_price}}</h3>
						<p><b>{{item.name}}</b></p>
						<p>{{item.description}}</p>
						<p>{{item.quantity_remaining}} remaining</p>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="clearfix"></div>
	</div>
</template>

<script>
export default {
	name: 'MarketPlaceComponent',
	props: ['user'],
	data: function(){
		return {
			purchaseItems: []
		}
	},
	methods: {
		getItems: function(){
			var self = this;
			var url = '/bank/marketplace/items/';
			self.$http.get(url)
			.then(function(response){
				self.purchaseItems = response.data;
			});

		}
	},
	created: function(){
		this.getItems();
	}
}
</script>
