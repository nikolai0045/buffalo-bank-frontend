<template>
	<div class="modal fade" id="studentProfileModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header" v-if="student != null">
					<h2 class="modal-title">{{student.first_name}} {{student.last_name}}</h2>
				</div>
				<div class="modal-body" v-if="student != null">
					<div class="row">
						<div class="col-sm-8">Account Balance:</div>
						<div class="col-sm-4">{{student.account_balance}}</div>
					</div>
					<div v-if="missingAssignments.length > 0" class="container">
						<h5><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Missing Work</h5>
						<table class="table table-condensed">
							<thead>
								<th>Course</th>
								<th>Assignment</th>
								<th>Date</th>
							</thead>
							<tbody>
								<tr v-for="assignment in missingAssignments">
									<td>{{assignment.course.name}}</td>
									<td>{{assignment.name}}</td>
									<td>{{assignment.date}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" v-if="student != null">Profile</button>
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
		}
	},
	watch: {
		student: function(newStudent){
			if(newStudent != null){
				this.updateMissingAssignments();
				console.log('watcher function called');
				$("#studentProfileModal").modal('show');
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
		}
	}
}
</script>