<template>
	<div class='right_col' role='main'>
		<div class='row'>
			<div class="x_panel">
				<div class="x_title">
					<h2>Recent Purchases by Grade</h2>
					<div class="clearfix"></div>
				</div>
				<div class="x_content">
					<button class="btn btn-default" @click="viewSixth=true;viewSeventh=false;viewEighth=false;" :disabled="viewSixth">Sixth Grade</button>
					<button class="btn btn-default" @click="viewSixth=false;viewSeventh=true;viewEighth=false;" :disabled="viewSeventh">Seventh Grade</button>
					<button class="btn btn-default" @click="viewSixth=false;viewSeventh=false;viewEighth=true;" :disabled="viewEighth">Eigth Grade</button>
					<div class="clearfix"></div>
					<div id="sixth" v-if="viewSixth">
						<table class='table table-condensed'>
							<thead>
								<th>Student</th>
								<th>Item</th>
								<th>Price</th>
								<th>Date</th>
							</thead>
							<tbody>
								<tr v-for="purchase in sixthPurchases">
									<td>{{purchase.student.first_name}} {{purchase.student.last_name}}</td>
									<td>{{purchase.item.name}}</td>
									<td>{{purchase.price}}</td>
									<td>{{purchase.date}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="seventh" v-if="viewSeventh">
						<table class='table table-condensed'>
							<thead>
								<th>Student</th>
								<th>Item</th>
								<th>Price</th>
								<th>Date</th>
							</thead>
							<tbody>
								<tr v-for="purchase in seventhPurchases">
									<td>{{purchase.student.first_name}} {{purchase.student.last_name}}</td>
									<td>{{purchase.item.name}}</td>
									<td>{{purchase.price}}</td>
									<td>{{purchase.date}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="eighth" v-if="viewEighth">
						<table class='table table-condensed'>
							<thead>
								<th>Student</th>
								<th>Item</th>
								<th>Price</th>
								<th>Date</th>
							</thead>
							<tbody>
								<tr v-for="purchase in eighthPurchases">
									<td>{{purchase.student.first_name}} {{purchase.student.last_name}}</td>
									<td>{{purchase.item.name}}</td>
									<td>{{purchase.price}}</td>
									<td>{{purchase.date}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:"RecentPurchasesComponent",
	data: function(){
		return {
			sixthPurchases: [],
			seventhPurchases: [],
			eighthPurchases: [],
			viewSixth: true,
			viewSeventh: false,
			viewEighth: false
		}
	},
	created: function(){
		var self = this;
		self.$http.get('bank/marketplace/purchases/6/')
		.then(function(response){
			self.sixthPurchases = response.data;
		})
		self.$http.get('bank/marketplace/purchases/7/')
		.then(function(response){
			self.seventhPurchases = response.data;
		})
		self.$http.get('bank/marketplace/purchases/8/')
		.then(function(response){
			self.eighthPurchases = response.data;
		})
	}
}
</script>