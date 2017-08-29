<template>
	<div class='right_col' role='main'>
		<div class='row'>
			<div class='col-md-12 col-sm-12 col-xs-12'>
				<div class="x_panel">
					<div class="x_title">
						<h2>Step 1 <small>Select grade</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<button class="btn btn-primary" :disabled="selectedGrade=='6'" @click="selectedGrade='6'">6th Grade</button>
						<button class="btn btn-primary" :disabled="selectedGrade=='7'" @click="selectedGrade='7'">7th Grade</button>
						<button class="btn btn-primary" :disabled="selectedGrade=='8'" @click="selectedGrade='8'">8th Grade</button>
						<div class="clearfix"></div>
					</div>
				</div>
				<div v-if="mentorGroups.length > 0" class="x_panel">
					<div class="x_title">
						<h2>Step 2 <small>Select mentoring group</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<button v-for="group in mentorGroups" class="btn btn-primary" :disabled="selectedMentorGroup==group" @click="selectedMentorGroup=group">{{group.teachers[0].first_name}} {{group.teachers[0].last_name}}'s Mentoring Group</button>
					</div>
				</div>
				<div v-if="eligibleStudents.length != 0" class="x_panel">
					<div class="x_title">
						<h2>Step 3 <small>Select students and items</small></h2>
						<div class="clearfix"></div>
						<div class="x_content">
							<div class="col-md-6" style="width:50%;">
								<h4>Select Students</h4>
								<input type="text" v-model="studentSearchTerm" placeholder="Search..." />
								<table class="table table-condensed">
									<thead>
										<th></th>
										<th>Student</th>
										<th>Account Balance</th>
									</thead>
									<tbody>
										<template v-for="student in eligibleStudents">
											<tr v-if="studentSearchTerm == '' || student.last_name.toLowerCase().indexOf(studentSearchTerm.toLowerCase())>-1 || student.first_name.toLowerCase().indexOf(studentSearchTerm)>-1">
												<td>
													<input class="form-check-input" :disabled="student.account_balance < transactionTotal && selectedStudents.indexOf(student) < 0" type="checkbox" :value="student" v-model="selectedStudents">
												</td>
												<td>{{student.last_name}}, {{student.first_name}}</td>
												<td>${{student.account_balance}}</td>
											</tr>
										</template>
									</tbody>
								</table>
								<hr>
								<h4 v-if="selectedStudents.length==1">{{selectedStudents.length}} Student</h4>
								<h4 v-else>{{selectedStudents.length}} Students</h4>
							</div>
							<div class="col-md-6" style="width:50%;">
								<h4>Select Items</h4>
								<input type="text" v-model="searchTerm" placeholder="Search..."/>
								<table class="table table-condensed">
									<thead>
										<th></th>
										<th>Item</th>
										<th>Price</th>
										<th>Quantity</th>
									</thead>
									<tbody>
										<template v-for="item in purchaseItems">
											<tr v-if="searchTerm == '' || item.name.toLowerCase().indexOf(searchTerm.toLowerCase())>-1">
												<td><input class="form-check-input" :disabled="transactionTotal+item.current_price > lowestBalance && selectedItems.indexOf(item)<0" type="checkbox" :value="item" v-model="selectedItems"></td>
												<td>{{item.name}}</td>
												<td>{{item.current_price}}</td>
												<td>{{item.quantity_remaining}}</td>
											</tr>
										</template>
									</tbody>
								</table>
								<hr>
								<h4>Transaction Total: ${{transactionTotal}}</h4>
							</div>
							<div class="clearfix"></div>
							<hr>
							<button class="btn btn-default" @click="clearTransaction()">Clear</button>
							<button class="btn btn-success" @click="submitTransaction()">Submit Transaction</button>
							<div class="clearfix"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "MerchantComponent",
	data: function(){
		return {
			selectedGrade: null,
			mentorGroups: [],
			selectedMentorGroup: {},
			purchaseItems: [],
			eligibleStudents: [],
			ineligibleStudents: [],
			selectedStudents: [],
			selectedItems: [],
			searchTerm: '',
			studentSearchTerm: ''
		}
	},
	created: function(){
		this.fetchPurchaseItems();	
	},
	methods: {
		fetchPurchaseItems: function(){
			var self = this;
			var url = '/bank/marketplace/items/';
			self.$http.get(url)
			.then(function(response){
				self.purchaseItems = response.data;
			})
		},
		submitTransaction: function(){
			var self = this;
			var url = '/bank/marketplace/submit_transaction/';
			self.$http.post(url,{selectedStudents:self.selectedStudents,selectedItems:self.selectedItems})
			.then(function(response){
				var url = '/bank/marketplace/eligible_students/'+self.selectedMentorGroup.id+'/';
				self.$http.get(url)
				.then(function(response){
					self.eligibleStudents = response.data;
				});
				var url = '/bank/marketplace/ineligible_students/'+self.selectedMentorGroup.id+'/';
				self.$http.get(url)
				.then(function(response){
					self.ineligibleStudents = response.data;
				});
				self.selectedStudents = [];
				self.selectedItems = [];
				self.fetchPurchaseItems();
			});
		},
		clearTransaction: function(){
			this.selectedStudents = [];
			this.selectedItems = [];
		}
	},
	watch: {
		selectedGrade: function(newGrade){
			var self = this;
			self.mentorGroups = [];
			self.eligibleStudents = [];
			self.ineligibleStudents = [];
			self.selectedStudents = [];
			self.selectedItems = [];
			var data = {
				grade:newGrade,
				active:true,
				hour:'Mentoring'
			}
			var url = '/courses/search/';
			self.$http.post(url,data)
			.then(function(response){
				self.mentorGroups = response.data;
			});
		},
		selectedMentorGroup: function(newMentorGroup){
			var self = this;
			var url = '/bank/marketplace/eligible_students/'+newMentorGroup.id+'/';
			self.$http.get(url)
			.then(function(response){
				self.eligibleStudents = response.data;
			})
			var url = '/bank/marketplace/ineligible_students/'+newMentorGroup.id+'/';
			self.$http.get(url)
			.then(function(response){
				self.ineligibleStudents = response.data;
			})
		}
	},
	computed: {
		lowestBalance: function(){
			var lowest = 100000000;
			for (var i=0;i<this.selectedStudents.length;i++){
				if(this.selectedStudents[i].account_balance < lowest){
					lowest = this.selectedStudents[i].account_balance;
				}
			}
			return lowest;
		},
		transactionTotal: function(){
			var total = 0;
			for (var i=0;i<this.selectedItems.length;i++){
				total += this.selectedItems[i].current_price;
			}
			return total;
		}
	}
}
</script>
