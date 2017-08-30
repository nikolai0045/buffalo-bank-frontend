<template>
	<div class='right_col' role='main'>
		<div class='row'>
			<div class='col-md-12 col-sm-12 col-xs-12'>
				<div class='x_panel'>
					<div class='x_title'>
						<h2>Students by Grade</h2>
						<div class="clearfix"></div>
					</div>
					<div class='x_content'>
						<router-link class="btn btn-primary" :to="{name: 'students_by_grade', params: {grade: '6'}}">6th Grade</router-link>
						<router-link class="btn btn-primary" :to="{name: 'students_by_grade', params: {grade: '7'}}">7th Grade</router-link>
						<router-link class="btn btn-primary" :to="{name: 'students_by_grade', params: {grade: '8'}}">8th Grade</router-link>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="x_panel">
					<div class="x_title">
						<h2>Students by Mentoring Group</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<div class="col-md-4">
							<h4>6th Grade</h4>
							<hr>
							<table class="table table-condensed">
								<tr v-for="mentoring in sixthGradeMentoring">
									<router-link class="text-primary" :to="{name: 'course_roster',params: {course_id: mentoring.id}}">
										{{mentoring.teachers[0].first_name}} {{mentoring.teachers[0].last_name}}'s Mentoring Group
									</router-link>
								</tr>
							</table>
						</div>
						<div class="col-md-4">
							<h4>7th Grade</h4>
							<hr>
							<table class="table table-condensed">
								<tr v-for="mentoring in seventhGradeMentoring">
									<router-link class="text-primary" :to="{name: 'course_roster',params: {course_id: mentoring.id}}">
										{{mentoring.teachers[0].first_name}} {{mentoring.teachers[0].last_name}}'s Mentoring Group
									</router-link>
								</tr>
							</table>
						</div>
						<div class="col-md-4">
							<h4>8th Grade</h4>
							<hr>
							<table class="table table-condensed">
								<tr v-for="mentoring in eighthGradeMentoring">
									<router-link class="text-primary" :to="{name: 'course_roster',params: {course_id: mentoring.id}}">
										{{mentoring.teachers[0].first_name}} {{mentoring.teachers[0].last_name}}'s Mentoring Group
									</router-link>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StudentsComponent',
	props: ['user'],
	data: function(){
		return {
			sixthGradeMentoring: [],
			seventhGradeMentoring: [],
			eighthGradeMentoring: []
		}
	},
	created: function(){
		this.fetchMentoringGroups()
	},
	methods: {
		fetchMentoringGroups: function(){
			var self = this;

			var url = '/courses/search/'
			self.$http.post(url,{
				active: true,
				grade: "6",
				hour: "Mentoring"
			})
			.then(function(response){
				self.sixthGradeMentoring = response.data;
			});

			self.$http.post(url,{
				active: true,
				grade: "7",
				hour: "Mentoring"
			})
			.then(function(response){
				self.seventhGradeMentoring = response.data;
			});

			self.$http.post(url,{
				active: true,
				grade: "8",
				hour: "Mentoring"
			})
			.then(function(response){
				self.eighthGradeMentoring = response.data;
			});
		}
	}
}
</script>
