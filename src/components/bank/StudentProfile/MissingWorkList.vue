<template>
	<div class="x_panel" v-if="missingWork.length > 0">
		<div class="x_title">
			<h2>Missing Work <small>Assignments outstanding for {{student.first_name}} {{student.last_name}}</small><i class="fa fa-exclamation-triangle"></i></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<table class="table table-condensed">
				<thead>
					<th>Course</th>
					<th>Assignment</th>
					<th>Teacher</th>
					<th>Date Added</th>
				</thead>
				<tbody>
					<tr v-for="assignment in missingWork">
						<td style="text-align:left;">{{assignment.course.name}}</td>
						<td style="text-align:left;">{{assignment.name}}</td>
						<td style="text-align:left;"><p v-for="teacher in assignment.course.teachers">{{teacher.first_name}} {{teacher.last_name}}</p></td>
						<td style="text-align:left;">{{assignment.date}}</td>
					</tr>
				</tbody>
			</table>
			<div class="clearfix"></div>
		</div>
	</div>
</template>

<script>
export default {
	name:'MissingWorkListComponent',
	props: ['student'],
	data: function(){
		return {
			missingWork: [],
		}
	},
	created: function() {
		var url = '/bank/student/'+this.student.id+'/missing_assignments/';
		var self = this;
		this.$http.get(url)
		.then(function(response){
			self.missingWork = response.data;
		});
	},
}
</script>