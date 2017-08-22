<template>
	<div class="modal fade" id="studentProfileModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header" v-if="student != null">
					<h2 class="modal-title">{{student.first_name}} {{student.last_name}}</h2>
				</div>
				<div class="modal-body" v-if="student != null">
					<div class="row">
						<div class="col-sm-5"><h4 style="color:green;">Account Balance:</h4></div>
						<div class="col-sm-7"><h1 style="color:green;">${{student.account_balance}}</h1></div>
					</div>
					<hr>
					<div class="clearfix"></div>
					<div class="row" v-if="goals.length > 0">
						<div class="col-sm-12">
							<h4 style="color:blue;">Mentoring Goals</h4>
							<ul>
								<li v-for="goal in goals">{{goal.name}}<span v-if="goal.description != '' && goal.description != null"> - {{goal.description}}</span></li>
							</ul>
						</div>
						<div class="clearfix"></div>
					</div>
					<div v-if="missingAssignments.length > 0" class="row">
						<div class="col-sm-12">
							<h4 style="color:red;">Missing Work <i class="fa fa-exclamation-circle" aria-hidden="true"></i></h4>
							<table class="table table-condensed">
								<thead>
									<th>Course</th>
									<th>Assignment</th>
									<th>Date</th>
								</thead>
								<tbody>
									<tr v-for="assignment in missingAssignments">
										<td style="text-align:left;">{{assignment.course.name}}</td>
										<td style="text-align:left;">{{assignment.name}}</td>
										<td style="text-align:left;">{{assignment.date}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<router-link class="btn btn-default" target="_blank" :to="{name: 'student_profile', params: {student_id:student.id}}">Profile</router-link>
					<button type="button" class="btn btn-default" @click="clearStudent" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StudentModalComponent',
	props: {
		student: {}
	},
	data: function(){
		return {
			missingAssignments: {},
			goals: [],
		}
	},
	watch: {
		student: function(newStudent){
			if(newStudent != null){
				this.updateMissingAssignments();
				console.log('watcher function called');
				$("#studentProfileModal").modal('show');
				this.fetchPersonalGoals();
			}
		}
	},
	methods: {
		updateMissingAssignments: function(){
			var self = this;
			var url = "/bank/student/"+this.student.id+"/missing_assignments/";
			this.$http.get(url)
			.then(function(response){
				self.missingAssignments = response.data;
			});
		},
		clearStudent: function(){
			this.$emit('update:student',null);
		},
		fetchPersonalGoals: function(){
			var self = this;
			var url = '/bank/student/goals/'+self.student.id+'/';
			self.$http.get(url)
			.then(function(response){
				self.goals = response.data;
			})
		},
	}
}
</script>
