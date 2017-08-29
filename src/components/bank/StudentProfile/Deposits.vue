<template>
	<div class="x_panel">
		<div class="x_title">
			<h2>Deposits <small>Recent deposits for {{student.first_name}} {{student.last_name}}</small></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<table class="table table-condensed">
				<thead>
					<th>Date</th>
					<th>Course</th>
					<th>Teacher(s)</th>
					<th v-for="goal in goals">{{goal.goal}}</th>
					<th>Total Earned</th>
				</thead>
				<tbody>
					<tr v-for="deposit in deposits">
						<td style="text-align:left;">{{deposit.course_report.date}}</td>
						<td style="text-align:left;">{{deposit.course_report.course.name}}</td>
						<td style="text-align:left;"><p v-for="teacher in deposit.course_report.course.teachers">{{teacher.first_name}} {{teacher.last_name}}</p></td>
						<td v-for="buck in deposit.buck_set"><i v-if="buck.earned" class="fa fa-check" aria-hidden="true"></i><i v-if="!buck.earned" class="fa fa-times" aria-hidden="true"></i></td>
						<td style="text-align:left;">{{deposit.amount_earned}}</td>
					</tr>
				</tbody>
			</table>
			<hr>
			<h4>Notes</h4>
			<table class="table table-condensed">
				<thead>
					<th>Date</th>
					<th>Course</th>
					<th>Note</th>
				</thead>
				<template v-for="deposit in deposits">
						<tr v-if="deposit.note && deposit.note != ''">
							<td>{{deposit.report.date}}</td>
							<td>{{deposit.report.course.name}}</td>
							<td>{{deposit.note}}</td>
						</tr>
				</template>
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
			goals: []
		}
	},
	created: function(){
		this.fetchGoals();
		this.fetchDeposits();
	},
	methods: {
		fetchDeposits: function(){
			var self = this;
			var url = '/bank/student/recent_deposits/'+self.student.id+'/';
			self.$http.get(url)
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
