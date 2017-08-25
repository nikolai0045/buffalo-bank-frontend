<template>
	<div class="modal fade" id="newAssignmentModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Add Missing Assignment</h4>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group">
							<label for='newAssignmentName'>Name</label>
							<input id="newAssignmentName" v-model="name" class="form-control" placeholder="Assignment Name" />
						</div>
						<div class="form-group">
							<label for='newAssignmentDescription'>Description</label>
							<input id="newAssignmentDescription" v-model="description" class="form-control" placeholder="Description"/>
						</div>
						<label>Students</label>
						<fieldset class="form-group row">
							<div class="col-sm-10" id="studentSelectDiv">
								<div class="form-check" v-for="student in students">
									<label class="form-check-label">
										<input class="form-check-input" type="checkbox" :value="student.id" v-model="selectedStudents">
										{{student.last_name}}, {{student.first_name}}
									</label>
								</div>
							</div>
						</fieldset>
						<div class="clearfix"></div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" style="display:none;" class="btn btn-danger"></button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-primary" @click="submit()" data-dismiss="modal">Save</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NewAssignmentModalComponent',
	props: ['report','show'],
	data: function(){
		return {
			selectedStudents: [],
			name: null,
			description: null
		}
	},
	computed: {
		students: function(){
			var self = this;
			var students = [];
			for(var i=0;i<self.report.deposit_set.length;i++){
				students.push(self.report.deposit_set[i].student);
			}
			return students;
		}
	},
	mounted: function(){
		$('#newAssignmentModal').on('hide.bs.modal',this.close);
	},
	watch: {
		show: function(newValue){
			if(newValue){
				$('#newAssignmentModal').modal('show');
			} else {
				$('#newAssignmentModal').hide();
			}
		}
	},
	methods: {
		submit: function(){
			var newAssignment = {
				course: this.report.course.id,
				name: this.name,
				description: this.description,
				students: this.selectedStudents
			}
			var url = "/bank/courses/missing_work/create/"
			var self = this;
			this.$http.post(url,newAssignment)
				.then(function(response){
				self.$emit('updateAssignments');
			});
			this.close();
		},
		close: function(){
			this.$emit('closeNewAssignmentModal');
			this.selectedStudents = [];
			this.description = null;
			this.name = null;
		},
	}
}
</script>
