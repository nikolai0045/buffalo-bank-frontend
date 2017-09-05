<template>
	<div class="x_panel">
		<div class="x_title">
			<h2>Schedule <small>{{student.first_name}} {{student.last_name}}'s current schedule</small></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<table class="table table-condensed">
				<thead>
					<th>Hour</th>
					<th>Course</th>
					<th>Start Time</th>
					<th>End Time</th>
				</thead>
				<tbody>
					<tr v-for="block in schedule">
						<td style="text-align:left;">{{block.hour}}</td>
						<td style="text-align:left;"><p v-for="c in block.courses">{{c.course.name}} <i style="cursor:pointer;" @click="removeStudentFromCourse(c.id)" class="fa fa-times" data-toggle="tooltip" title="Remove student from this course"></i></p></td>
						<td style="text-align:left;">{{block.start_time}}</td>
						<td style="text-align:left;">{{block.end_time}}</td>
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
			schedule: [],
			date: null
		}
	},
	created: function(){
		this.date = new Date();
		this.fetchSchedule();
	},
	computed: {
		cleanedDate: function(){
			return this.date.getFullYear() + '-' + (this.date.getMonth()+1) + '-' + this.date.getDate();
		}
	},
	methods: {
		fetchSchedule: function(){
			var self = this;
			var url = '/bank/student/daily_schedule/';
			var data = {
				student_id: self.student.id,
				date: self.cleanedDate
			}
			self.$http.post(url,data)
			.then(function(response){
				self.schedule = response.data;
			})
		},
		removeStudentFromCourse: function(reportId){
			var self = this;
			var url = "bank/course_report/remove_student/"
			var data = {
				student_id: self.student.id,
				report_id: reportId
			}
			self.$http.post(url,data)
			.then(function(response){
				self.fetchSchedule();
			})
		}
	}
}
</script>
