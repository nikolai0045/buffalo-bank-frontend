<template>
	<div class="x_panel">
		<div class="x_title">
			<h2>Statistics <small>Bucks statistics from past two weeks</small></h2>
			<div class="clearfix"></div>
		</div>
		<div class="x_content">
			<h4>Bucks by Course</h4>
			<table class="table table-condensed">
				<thead>
					<th>Course</th>
					<th>Bucks Earned</th>
					<th>Possible Bucks</th>
					<th>Percent Earned</th>
				</thead>
				<tbody>
					<tr v-for="course in statistics.bucks_by_course">
						<td style="text-align:left;">{{course.name}}</td>
						<td style="text-align:left;">{{course.earned}}</td>
						<td style="text-align:left;">{{course.earned + course.unearned}}</td>
						<td style="text-align:left;">{{(course.earned/(course.earned+course.unearned)*100).toFixed(1)}}%</td>
					</tr>
				</tbody>
			</table>
			<hr>
			<h4>Buck Breakdown</h4>
			<table class="table table-condensed">
				<thead>
					<th></th>
					<th>Bucks Earned</th>
					<th>Possible Bucks</th>
					<th>Percent Earned</th>
				</thead>
				<tbody>
					<tr v-for="goal in statistics.bucks_by_goal">
						<td style="text-align:left;">{{goal.name}}</td>
						<td style="text-align:left;">{{goal.earned}}</td>
						<td style="text-align:left;">{{goal.earned+goal.unearned}}</td>
						<td style="text-align:left;">{{(goal.earned/(goal.earned+goal.unearned)*100).toFixed(1)}}%</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	name:"StudentStatisticsComponent",
	props: ['student'],
	data: function(){
		return {
			statistics: {},
		}
	},
	created: function(){
		var self = this;
		var url = '/bank/student/statistics/'+self.student.id+'/';
		self.$http.get(url)
		.then(function(response){
			self.statistics = response.data;
		})
	}
}
</script>