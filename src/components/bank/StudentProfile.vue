<template>
	<div class="right_col" role="main">
		<div class="row">
			<div class="col-xs-12">

				<student-info v-if="student.id" :student="student" :user="user"></student-info>
				<student-schedule v-if="student.id" :student="student"></student-schedule>
				<student-statistics v-if="student.id" :student="student"></student-statistics>
				<recent-notes v-if="student.id" :student="student"></recent-notes>
				<deposits v-if="student.id" :student="student"></deposits>
				<recent-absences v-if="student.id" :student="student"></recent-absences>
				<missing-work-list v-if="student.id" :student="student"></missing-work-list>
				<tier-two-report v-if="student.id && student.is_ttwo" :student="student"></tier-two-report>
				<tier-three-report v-if="student.id && student.is_tthree" :student="student"></tier-three-report>
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
import TierThreeReportComponent from "./StudentProfile/TierThreeReport.vue"
import RecentNotesComponent from './StudentProfile/RecentNotes.vue'
import RecentAbsencesComponent from './StudentProfile/RecentAbsences.vue'

export default {
	name: 'StudentProfileComponent',
	data: function(){
		return {
			student: {},
		}
	},
	props: ['user'],
	components: {
		'modal': BasicModalComponent,
		'MissingWorkList':MissingWorkListComponent,
		'StudentInfo':StudentInfoComponent,
		'StudentSchedule':StudentScheduleComponent,
		'StudentStatistics':StudentStatisticsComponent,
		'Deposits':DepositsComponent,
		'TierTwoReport':TierTwoReportComponent,
		'TierThreeReport':TierThreeReportComponent,
		'RecentNotes':RecentNotesComponent,
		'RecentAbsences':RecentAbsencesComponent
	},
	created: function(){
		var self = this;
		self.fetchStudent();
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
	}
}
</script>
