<template>
	<div class="x_panel">
		<div class="x_title">
			<h2>Schedule <small>{{student.first_name}} {{student.last_name}}'s current schedule</small></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<table class="table table-condensed">
				<thead>
					<th>Course</th>
					<th>Teacher(s)</th>
					<th>Start Time</th>
					<th>End Time</th>
				</thead>
				<tbody>
					<tr v-for="report in schedule">
						<td style="text-align:left;">{{report.course.name}}</td>
						<td style="text-align:left;"><p v-for="t in report.course.teachers">{{t.first_name}} {{t.last_name}}</p></td>
						<td style="text-align:left;">{{report.start_time}}</td>
						<td style="text-align:left;">{{report.end_time}}</td>
					</tr>
				</tbody>
			</table>
			<div class="clearfix"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "StudentScheduleComponent",
	props: ['student'],
	data: function(){
		return {
			schedule: []
		}
	},
	created: function(){
		var self = this;
		var url = '/bank/student/schedule/'+self.student.id+'/';
		self.$http.get(url)
		.then(function(response){
			self.schedule = response.data;
		})
	}
}
</script>