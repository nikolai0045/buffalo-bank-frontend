<template>
	<div class="x_panel cac_panel" v-if="charts.length > 0">
		<div class="x_title">
			<h2>Check and Connect <small>Recent reports for {{student.first_name}} {{student.last_name}}</small></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<div class="col-md-6 pull-right">
				<label>Select Date</label>
				<input v-model="date" type="date" class="form-control" />
			</div>
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
			<div>
				<h4>Notes</h4>
				<table class="table table-condensed">
					<thead>
						<th>Date</th>
						<th>Course</th>
						<th>Note</th>
					</thead>
					<tbody>
						<tr v-for="note in notes">
							<td>{{note.report.date}}</td>
							<td>{{note.report.course.name}}</td>
							<td>{{note.note}}</td>
						</tr>
					</tbody>
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
			notes: [],
			date: false
		}
	},
	created: function(){
		this.fetchTTwoReports();
		this.fetchTTwoNotes();
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = today.getDate();
		if (month < 10){
			month = "0" + month;
		}
		if (day < 10){
			day = "0" + date;
		}
		var date = year + '-' + month + '-' + day;
		this.date = date;
	},
	watch: {
		date: function(newVal){
			if(newVal){
				this.fetchTTwoReports();
			}
		}
	},
	methods: {
		fetchTTwoReports: function(){
			var self = this;
			var url = '/bank/student/ttwo_chart/';
			var data = {
				'student_id':self.student.id,
			}
			if (self.date){
				data.date = self.date;
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
