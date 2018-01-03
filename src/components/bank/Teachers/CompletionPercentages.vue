<template>
	<div class="right_col" role="main">
		<div class="row">
			<div class="col-md-12 col-sm-12 col-xs-12">
				<div class="x_panel">
					<div class="x_title">
						<h2>Teacher Completion Percentages <small>Past two weeks</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<table class="table table-condensed">
							<thead>
								<th>Teacher</th>
								<th>Completion rate</th>
							</thead>
							<tbody>
								<tr v-for="p in percentages">
									<td>{{p.teacher}}</td>
									<td>{{p.percentage}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TeacherCompletionPercentagesComponent",
	data: function(){
		return {
			percentages: []
		}
	},
	created: function(){
		self.fetchPercentages();
	},
	methods: {
		fetchPercentages: function(){
			var self = this;
			var url = "/bank/teachers/completion_percentages/";
			self.$http.get(url)
			.then(function(response){
				self.percentages = response.data;
			})
		}
	}
}
</script>
