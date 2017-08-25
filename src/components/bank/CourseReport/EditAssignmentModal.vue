<template>
	<div class="modal fade" id="editAssignmentModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Edit Missing Assignment</h4>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group">
							<label for='assignmentName'>Name</label>
							<input id="assignmentName" v-model="name" class="form-control" placeholder="Assignment Name" />
						</div>
						<div class="form-group">
							<label for='assignmentDescription'>Description</label>
							<input id="assignmentDescription" v-model="description" class="form-control" placeholder="Description"/>
						</div>
						<label>Students</label>
						<fieldset class="form-group row">
							<div class="col-sm-10" id="editStudentsDiv">
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
	name: 'EditAssignmentModalComponent',
	props: ['assignment','report','show'],
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
		var self = this;
		$('#editAssignmentModal').on('hide.bs.modal',this.close);
		$('#editAssignmentModal').on('show.bs.modal',function(){
			var students = [];
			for (var i=0;i<self.assignment.students.length;i++){
				students.push(self.assignment.students[i].id)
			}
			self.selectedStudents = students;
		})
	},
	watch: {
		show: function(newValue){
			if(newValue){
				$('#editAssignmentModal').modal('show');
			} else {
				$('#editAssignmentModal').hide();
			}
		},
		assignment: function(selectedAssignment){
			var self = this;
			if(selectedAssignment!=null){
				for (var i = 0;i<selectedAssignment.students.length;i++){
					self.selectedStudents.push(selectedAssignment.students[i].id)
				}
				self.name = selectedAssignment.name;
				self.description = selectedAssignment.description;
			}
		}
	},
	methods: {
		submit: function(){
			var assignment = {
				course: this.report.course.id,
				name: this.name,
				description: this.description,
				students: this.selectedStudents,
			}
			var url = "/bank/courses/missing_work/update/"+this.assignment.id+'/';
			var self = this;
			this.$http.put(url,assignment)
				.then(function(response){
				self.$emit('updateAssignments');
			});
			this.close();
		},
		close: function(){
			this.$emit('closeEditAssignmentModal');
			this.selectedStudents = [];
			this.description = null;
			this.name = null;
		},
	}

}
</script>
