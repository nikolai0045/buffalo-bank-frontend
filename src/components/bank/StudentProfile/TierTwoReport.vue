<template>
	<div class="x_panel cac_panel" v-if="charts.length > 0">
		<div class="x_title">
			<h2>Check and Connect <small>Recent reports for {{student.first_name}} {{student.last_name}}</small></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<div v-for="chart in charts">
				<h4>{{chart.goal.goal}}</h4>
				<table class="table table-condensed">
					<thead>
						<th v-for="header in chart.col_headers">{{header}}</th>
						<th>3 and 4</th>
					</thead>
					<tbody>
						<tr v-for="row in chart.courses">
							<td>{{row.course}}</td>
							<td v-for="score in row.scores">{{score}}</td>
							<td>{{row.summary}}</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td style="text-align:left;">3 and 4</td>
							<td v-for="score in chart.totals.scores">{{score}}</td>
							<td>{{chart.totals.summary}}</td>
						</tr>
					</tfoot>
				</table>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</template>

<style>
	div.cac_panel tfoot tr td {
		font-weight: bold;
	}
	div.cac_panel tbody tr td:last-child {
		font-weight: bold;
	}
	div.cac_panel tbody tr td:first-child {
		text-align: left;
	}
	div.cac_panel tfoot tr td:first-child {
		text-align: left;
	}
</style>

<script>
export default {
	name:"TierTwoReportComponent",
	props: ['student'],
	data: function(){
		return {
			charts: [],
			notes: []
		}
	},
	created: function(){
		this.fetchTTwoReports();
		this.fetchTTwoNotes();
	},
	methods: {
		fetchTTwoReports: function(){
			var self = this;
			var url = '/bank/student/ttwo_chart/';
			var data = {
				'student_id':self.student.id,
			}
			self.$http.post(url,data)
			.then(function(response){
				self.charts = response.data;
			})
		},
		fetchTTwoNotes: function(){
			var self = this;
			var url = '/bank/student/ttwo_notes/';
			var data = {
				'student_id':self.student.id,
			}
			self.$http.post(url,data)
			.then(function(response){
				self.notes = response.data;
			})
		}
	}
}
</script>
