<template>
	<div class="right_col" role="main">
		<div class="row">
			<div class="col-xs-12">
				
				<student-info v-if="student.id" :student="student"></student-info>
				<student-schedule v-if="student.id" :student="student"></student-schedule>
				<student-statistics v-if="student.id" :student="student"></student-statistics>
				<deposits v-if="student.id" :student="student"></deposits>
				<missing-work-list v-if="student.id" :student="student"></missing-work-list>
				<tier-two-report v-if="student.id && student.is_ttwo" :student="student"></tier-two-report>
				<div v-if="student.is_tthree" class="x_panel">
					<div class="x_title">
						<h2>PASS <small>Recent reports for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<table class="table table-condensed">
							<thead>
								<th>Date</th>
								<th>Course</th>
								<th>Score</th>
							</thead>
							<tbody>
								<tr v-for="report in tthree_reports">
									<td style="text-align:left;">{{report.report.date}}</td>
									<td style="text-align:left;">{{report.report.course.name}}</td>
									<td v-if="report.score==1" style="text-align:left;background-color:red;">Red</td>
									<td v-if="report.score==2" style="text-align:left;background-color:yellow;">Yellow</td>
									<td v-if="report.score==3" style="text-align:left;background-color:green;">Green</td>
									<td v-if="report.score==4" style="text-align:left;background-color:blue;">Blue</td>
								</tr>
							</tbody>
						</table>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BasicModalComponent from "../helpers/BasicModal.vue"
import MissingWorkListComponent from "./StudentProfile/MissingWorkList.vue"
import StudentInfoComponent from "./StudentProfile/StudentInfo.vue"
import StudentScheduleComponent from "./StudentProfile/StudentSchedule.vue"
import StudentStatisticsComponent from "./StudentProfile/StudentStatistics.vue"
import DepositsComponent from "./StudentProfile/Deposits.vue"
import TierTwoReportComponent from "./StudentProfile/TierTwoReport.vue"

export default {
	name: 'StudentProfileComponent',
	data: function(){
		return {
			student: {},
			ttwo_reports: {},
			tthree_reports: {},
		}
	},
	props: {
		user: {},
	},
	components: {
		'modal': BasicModalComponent,
		'MissingWorkList':MissingWorkListComponent,
		'StudentInfo':StudentInfoComponent,
		'StudentSchedule':StudentScheduleComponent,
		'StudentStatistics':StudentStatisticsComponent,
		'Deposits':DepositsComponent,
		'TierTwoReport':TierTwoReportComponent,
	},
	created: function(){
		var self = this;
		self.fetchStudent();
	},
	mounted: function(){
		var self = this;
		self.fetchTTwoReports();
//		self.fetchTThreeReports();
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
		fetchTTwoReports: function(){
			var self = this;
			var url = '/bank/student/ttwo_chart/';
			var data = {
				'student_id':self.$route.params.student_id,
			}
			console.log(data);
			self.$http.post(url,data)
			.then(function(response){
				console.log(response);
			})
		},
		fetchTThreeReports: function(){
			var self = this;
			var url = '/bank/student/recent_tthree_reports/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.tthree_reports = response.data;
			})
		},
	}
}
</script>
