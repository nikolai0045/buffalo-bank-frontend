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
	</div>
</template>

<script>
export default {
	name: 'MarketPlaceComponent',
	props: ['user'],
	data: function(){
		return {

		}
	}
}
</script>
