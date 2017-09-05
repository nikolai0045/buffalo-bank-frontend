<template>
	<div class="x_panel">
		<div class="x_title">
			<input class="pull-right" type="date" v-model="date" />
			<h2>Deposits <small>Recent deposits for {{student.first_name}} {{student.last_name}}</small></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<table class="table table-condensed">
				<thead>
					<th>Course</th>
					<th>Teacher(s)</th>
					<th v-for="goal in goals">{{goal.goal}}</th>
					<th>Total Earned</th>
				</thead>
				<tbody>
					<tr v-for="deposit in deposits">
						<td style="text-align:left;">{{deposit.course_report.course.name}}</td>
						<td style="text-align:left;"><p v-for="teacher in deposit.course_report.course.teachers">{{teacher.first_name}} {{teacher.last_name}}</p></td>
						<td v-for="buck in deposit.buck_set"><i v-if="buck.earned" class="fa fa-check" aria-hidden="true"></i><i v-if="!buck.earned" class="fa fa-times" aria-hidden="true"></i></td>
						<td style="text-align:left;">{{deposit.amount_earned}}</td>
					</tr>
				</tbody>
			</table>
			<div class="clearfix"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DepositsComponent",
	props: ['student'],
	data: function(){
		return {
			deposits: [],
			goals: [],
			date: null
		}
	},
	created: function(){
		var raw_date = new Date();
		var year = raw_date.getFullYear();
		var month = raw_date.getMonth()+1;
		if (month<10){
			month = "0"+month;
		}
		var day = raw_date.getDate();
		if (day<10){
			day = "0"+day;
		}
		this.date = year + "-" + month + "-" + day;
		this.fetchGoals();
		this.fetchDeposits();
	},
	watch: {
		date: function(newVal){
			this.fetchDeposits();
		}
	},
	methods: {
		fetchDeposits: function(){
			var self = this;
			var data = {
				student_id:this.student.id,
				date:this.date
			}
			var url = '/bank/student/daily_deposits/';
			self.$http.post(url,data)
			.then(function(response){
				self.deposits = response.data;
			});
		},
		fetchGoals: function(){
			var self = this;
			var url = "bank/behavior_goals/active/";
			self.$http.get(url)
			.then(function(response){
				self.goals = response.data;
			});
		}
	}
}
</script>
