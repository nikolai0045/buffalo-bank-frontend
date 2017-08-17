<template>
	<div class="x_panel" id="studentInfoPanel">
		<div class="x_title">
			<h2>Student Info <small>Basic information for {{student.first_name}} {{student.last_name}}</small></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<div class="col-md-6">
				<p><b>First Name: </b>{{student.first_name}}</p>
				<p><b>Last Name: </b>{{student.last_name}}</p>
				<p><b>Grade: </b>{{student.grade}}</p>
				<p v-if="student.is_ttwo"><b>Check and Connect </b><i class="fa fa-check" aria-hidden="true"></i></p>
				<p v-if="student.is_tthree"><b>PASS </b><i class="fa fa-check" aria-hidden="true"></i></p>
				<div v-if="mentee">
					<p><b>Mentoring Goals <i class="fa fa-plus-circle" @click.prevent="initGoal()"></i></b></p>
					<ul v-if="goals.length > 0">
						<li v-for="g in goals">{{g.name}} <i class="fa fa-pencil-square-o" @click="setSelectedGoal(g);"></i></li>
					</ul>
					<ul v-else>
						<li>Currently no goals</li>
					</ul>
				</div>
				<div v-else>
					<p><b>Goals</b></p>
					<ul v-if="goals.length > 0">
						<li v-for="g in goals">{{g.name}}</li>
					</ul>
					<ul v-else>
						<li>Currently no goals</li>
					</ul>
				</div>

			</div>
			<div class="col-md-6">
				<h4>Current Account Balance: <span style="font-size:25px;color:#32cd32;font-weight:bold">${{student.account_balance}}</span></h4>
			</div>
			<div v-if="create" class="col-md-12">
				<transition>
					<div>
						<hr>
						<form>
							<div class="form-group">
								<label for="new-goal-name">Goal</label>
								<input class="form-control" type="text" id="new-goal-name" v-model="newGoal.name">
							</div>
							<div class="form-group">
								<label for="new-goal-description">Description</label>
								<textarea class="form-control" id="new-goal-description" v-model="newGoal.description"></textarea>
							</div>
							<div class="form-group">
								<label for="new-goal-active">Active</label>
								<input class="form-check" type="checkbox" v-model="newGoal.active">
							</div>
							<button type="button" class="btn btn-default" @click.prevent="reset()">Cancel</button>
							<button type="button" class="btn btn-primary" @click.prevent="createGoal()">Save</button>
						</form>
					</div>
				</transition>
			</div>
			<div v-if="edit" class="col-md-12">
				<transition>
					<div>
						<hr>
						<h4>Edit Goal</h4>
						<form>
							<div class="form-group">
								<label for="goal-name">Goal</label>
								<input class="form-control" type="text" id="goal-name" v-model="selectedGoal.name"/>
							</div>
							<div class="form-group">
								<label for="goal-description">Description</label>
								<textarea class="form-control" id="goal-description" v-model="selectedGoal.description"></textarea>
							</div>
							<div class="form-group">
								<label for="goal-active">Active</label>
								<input class="form-check" type="checkbox" v-model="selectedGoal.active" />
							</div>
							<button type="button" class="btn btn-default" @click.prevent="reset()">Cancel</button>
							<button type="submit" class="btn btn-primary" @click.prevent="editGoal()">Save</button>
						</form>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<style>
	.fa:hover{
		color:forestgreen;
		cursor:pointer;
	}
</style>

<script>
export default {
	name: 'StudentInfoComponent',
	props: ['student','user'],
	data: function(){
		return {
			goals: [],
			selectedGoal: {},
			newGoal: {
				student: null
			},
			edit: false,
			create: false,
			mentee: false,
		}
	},
	created: function(){
		var self = this;
		var url = '/bank/student/goals/'+this.student.id+'/';
		self.$http.get(url)
		.then(function(response){
			self.goals = response.data;
		});
		var url = '/bank/is_mentee/'+this.student.id+'/'+this.user.id+'/';
		self.$http.get(url)
		.then(function(response){
			self.mentee = response.data.mentee;
		});
	},
	methods: {
		initGoal: function(){
			var self = this;
			self.newGoal.student = self.student;
			self.$http.post('bank/student/init_goal/',self.newGoal)
			.then(function(response){
				self.newGoal = response.data;
			});
			self.create = true;
			self.edit = false;
			self.selectedGoal = {};
		},
		setSelectedGoal: function(goal){
			var self = this;
			self.selectedGoal.name = goal.name;
			self.selectedGoal.description = goal.description;
			self.selectedGoal.id = goal.id;
			self.selectedGoal.active = goal.active;
			self.edit = true;
		},
		editGoal: function(){
			var self = this;
			self.$http.put('/bank/student/update_goal/'+self.selectedGoal.id+'/',self.selectedGoal)
			.then(function(response){
				var url = '/bank/student/goals/'+self.student.id+'/';
				self.$http.get(url)
				.then(function(response){
					self.goals = response.data;
				});
			});
			self.selectedGoal={};
			self.edit = false;
		},
		reset: function(){
			var self = this;
			if (self.newGoal.id){
				self.$http.delete('/bank/student/destroy_goal/'+self.newGoal.id+'/')
				.then(function(response){
					self.newGoal = {student:null};
				})
			};
			self.selectedGoal = {};
			self.edit = false;
			self.create = false;
		},
		createGoal: function(){
			var self = this;
			self.$http.put('/bank/student/update_goal/'+self.newGoal.id+'/',self.newGoal)
			.then(function(response){
				var url = '/bank/student/goals/'+self.student.id+'/';
				self.$http.get(url)
				.then(function(response){
					self.goals = response.data;
				});
			});
			self.newGoal = {student:null};
			self.create = false;
		}
	}
}
</script>
