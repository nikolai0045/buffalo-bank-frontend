<template>
	<div class="right_col" role="main">
		<div class="row">
			<div class="col-xs-12">
				<div class="x_panel">
					<div class="x_title">
						<h2>Student Info <small>Basic information for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<p><b>First Name: </b>{{student.first_name}}</p>
						<p><b>Last Name: </b>{{student.last_name}}</p>
						<p><b>Grade: </b>{{student.grade}}</p>
						<p v-if="student.is_ttwo"><b>Check and Connect </b><i class="fa fa-check" aria-hidden="true"></i></p>
						<p v-if="student.is_tthree"><b>PASS </b><i class="fa fa-check" aria-hidden="true"></i></p>
						<h4>Current Account Balance: <span style="color:#32cd32;">${{student.account_balance}}</span></h4>
					</div>
				</div>
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
				<div class="x_panel">
					<div class="x_title">
						<h2>Deposits <small>Recent deposits for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						{{deposits}}
						<div class="clearfix"></div>
					</div>
				</div>
				<div v-if="missing_assignments.length > 0" class="x_panel">
					<div class="x_title">
						<h2>Missing Assignments <small>All outstanding past-due work for {{student.first_name}} {{student.last_name}}</small></h2>
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
								<tr v-for="assignment in missing_assignments">
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
				<div v-if="student.is_ttwo" class="x_panel">
					<div class="x_title">
						<h2>Check and Connect <small>Recent reports for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						{{ttwo_reports}}
						<div class="clearfix"></div>
					</div>
				</div>
				<div v-if="student.is_tthree" class="x_panel">
					<div class="x_title">
						<h2>PASS <small>Recent reports for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						{{tthree_reports}}
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StudentProfileComponent',
	data: function(){
		return {
			student: {},
			goals: {},
			deposits: {},
			schedule: {},
			ttwo_reports: {},
			tthree_reports: {},
			missing_assignments: {},
			statistics: {},
		}
	},
	props: {
		user: {},
	},
	created: function(){
		var self = this;
		self.fetchStudent();
		self.fetchGoals();
		self.fetchDeposits();
		self.fetchMissingAssignments();
		self.fetchSchedule();
		self.fetchTTwoReports();
		self.fetchTThreeReports();
	},
	mounted: function(){
		var self = this;
		self.fetchStatistics();
	},
	methods: {
		fetchStudent: function(){
			var self = this;
			var url = '/bank/student/'+self.$route.params.student_id+"/";
			self.$http.get(url)
			.then(function(response){
				self.student = response.data;
			});
		},
		fetchGoals: function(){
			var self = this;
			var url = '/bank/student/goals/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.goals = response.data;
			})
		},
		fetchDeposits: function(){
			var self = this;
			var url = '/bank/student/recent_deposits/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.deposits = response.data;
			})
		},
		fetchMissingAssignments: function(){
			var self = this;
			var url = '/bank/student/'+self.$route.params.student_id+'/missing_assignments/';
			self.$http.get(url)
			.then(function(response){
				self.missing_assignments = response.data;
			})
		},
		fetchTTwoReports: function(){
			var self = this;
			var url = '/bank/student/recent_ttwo_reports/'+self.$route.params.student_id+'/';
			if (self.student.is_ttwo){
				self.$http.get(url)
				.then(function(response){
					self.ttwo_reports = response.data;
				})
			}
		},
		fetchTThreeReports: function(){
			var self = this;
			var url = '/bank/student/recent_tthree_reports/'+self.$route.params.student_id+'/';
			if (self.student.is_tthree){
				self.$http.get(url)
				.then(function(response){
					self.tthree_reports = response.data;
				})
			}
		},
		fetchSchedule: function(){
			var self = this;
			var url = '/bank/student/schedule/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.schedule = response.data;
			})
		},
		fetchStatistics: function(){
			var self = this;
			var url = '/bank/student/statistics/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.statistics = response.data;
			})
		}
	}
}
</script>