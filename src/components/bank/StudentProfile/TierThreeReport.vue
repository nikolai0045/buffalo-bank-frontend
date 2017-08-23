<template>
	<div class="x_panel pass_panel" v-if="loaded">
		<div class="x_title">
			<h2>PASS <small>Recent reports for {{student.first_name}} {{student.last_name}}</small></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<h4>Goals</h4>
			<ul v-if="goals.length > 0">
				<li v-for="goal in goals">{{goal.goal}}</li>
			</ul>
			<ul v-else>
				<li>No goals currently defined</li>
			</ul>
			<hr>
			<table class="table table-condensed">
				<thead>
					<th v-for="header in chart.col_headers">{{header}}</th>
				</thead>
				<tbody>
					<tr v-for="row in chart.courses">
						<td>{{row.course}}</td>
						<td v-for="score in row.scores" :class="{redCell: score==1, yellowCell: score==2, greenCell: score==3, blueCell: score==4}">	</td>
						<td>{{row.summary}}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td style="text-align:left;">Blues and Greens</td>
						<td v-for="score in chart.totals.scores">{{score}}</td>
						<td>{{chart.totals.summary}}</td>
					</tr>
				</tfoot>
			</table>
			<hr>
			<h4>Notes</h4>
			<table class="table table-condensed">
				<thead>
					<th>Date</th>
					<th>Course</th>
					<th>Note</th>
				</thead>
				<tbody>
					<tr v-for="report in notes">
						<td>{{report.date}}</td>
						<td>{{report.course.name}}</td>
						<td>{{report.note}}</td>
					</tr>
				</tbody>
			</table>
			<div class="clearfix"></div>
		</div>
	</div>

</template>

<style>
	div.pass_panel tfoot tr td {
		font-weight: bold;
	}
	div.pass_panel tbody tr td:last-child {
		font-weight: bold;
	}
	div.pass_panel tbody tr td:first-child {
		text-align: left;
	}
	div.pass_panel tfoot tr td:first-child {
		text-align: left;
	}
	td.redCell {
		background-color: red;
	}
	td.yellowCell {
		background-color: yellow;
	}
	td.greenCell {
		background-color: green;
	}
	td.blueCell {
		background-color:blue;
	}
</style>

<script>
export default {
	name: "TierThreeReportComponent",
	props: ['student'],
	data: function(){
		return {
			chart: {},
			goals: [],
			loaded: false,
			notes: []
		}
	},
	created: function(){
		this.fetchTThreeReports();
		this.fetchTThreeNotes();
	},
	methods: {
		fetchTThreeReports: function(){
			var self = this;
			var url = '/bank/student/tthree_chart/';
			var data = {
				'student_id':self.student.id,
			}
			self.$http.post(url,data)
			.then(function(response){
				self.chart = response.data.chart;
				self.goals = response.data.goals;
				self.loaded = true;
			})
		},
		fetchTThreeNotes: function(){
			var self = this;
			var url = '/bank/student/tthree_notes/';
			var data = {
				'student_id':self.student.id,
			}
			self.$http.post(url,data)
			.then(function(response){
				console.log(response.data);
				self.notes = response.data;
			})
		}
	}
}
</script>
