<template>
	<div class="x_panel" v-if="charts.length > 0">
		<div class="x_title">
			<h2>Check and Connect <small>Recent reports for {{student.first_name}} {{student.last_name}}</small></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<div v-for="chart in charts">
				<h4>{{chart.goal.name}}</h4>
				<table class="table table-condensed">
					<thead>
						<th v-for="header in chart.col_headers">{{header}}</th>
						<th>4/5</th>
					</thead>
					<tbody>
						<tr v-for="row in chart.courses">
							<td>{{row.course}}</td>
							<td v-for="score in row.scores">{{score}}</td>
							<td>{{row.summary}}</td>
						</tr>
						<tr>
							<td>4/5</td>
							<td v-for="score in chart.totals.scores">{{score}}</td>
							<td>{{chart.totals.summary}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</template>

<script>
export default {
	name:"TierTwoReportComponent",
	props: ['student'],
	data: function(){
		return {
			charts: [],
		}
	},
	created: function(){
		this.fetchTTwoReports();	
	},
	methods: {
		fetchTTwoReports: function(){
			var self = this;
			var url = '/bank/student/ttwo_chart/';
			var data = {
				'student_id':self.student.id,
			}
			console.log(data);
			self.$http.post(url,data)
			.then(function(response){
				self.charts = response.data;
			})
		},
	}
}
</script>