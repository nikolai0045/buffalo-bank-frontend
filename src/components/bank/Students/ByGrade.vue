<template>
	<div class='right_col' role='main'>
		<div class='row'>
			<div class='col-md-12 col-sm-12 col-xs-12'>
				<div class='x_panel'>
					<div class='x_title'>
						<h2>{{grade}}th Grade Students</h2>
						<div class="clearfix"></div>
					</div>
					<div class='x_content'>
						<div class="col-md-8">
							<table class="table table-condensed">
								<thead>
									<th>Last Name</th>
									<th>First Name</th>
									<th>Account Balance</th>
									<th></th>
								</thead>
								<tbody v-if="searchTerm==''">
									<template v-for="student in students.slice(index,index+25)">
										<tr v-if="searchTerm == '' || student.first_name.toLowerCase().indexOf(searchTerm.toLowerCase())!=-1 || student.last_name.toLowerCase().indexOf(searchTerm.toLowerCase())>-1">
											<td style="text-align:left;">{{student.last_name}}</td>
											<td style="text-align:left;">{{student.first_name}}</td>
											<td style="text-align:left;">{{student.account_balance}}</td>
											<td style="text-align:left;"><router-link :to="{name:'student_profile', params: {student_id:student.id}}">Profile</router-link></td>
										</tr>
									</template>
								</tbody>
								<tbody v-else>
									<template v-for="student in students">
										<tr v-if="searchTerm == '' || student.first_name.toLowerCase().indexOf(searchTerm.toLowerCase())!=-1 || student.last_name.toLowerCase().indexOf(searchTerm.toLowerCase())>-1">
											<td style="text-align:left;">{{student.last_name}}</td>
											<td style="text-align:left;">{{student.first_name}}</td>
											<td style="text-align:left;">{{student.account_balance}}</td>
											<td style="text-align:left;"><router-link :to="{name:'student_profile', params: {student_id:student.id}}">Profile</router-link></td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
						<div class="col-md-4">
							<nav>
								<ul class="pagination">
									<li class="page-item">
										<a class="page-link" :disabled="index==0" @click="index-=25;">Previous Page</a>
									</li>
									<li class="page-item">
										<a class="page-link" :disabled="index+25 < students.length" @click="index+=25">Next Page</a>
									</li>
								</ul>
							</nav>
							<input class="form-control" v-model="searchTerm" placeholder="Search..." />

							<div class="clearfix"></div>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
export default {
	name: "StudentsByGradeComponent",
	data: function(){
		return {
			students: [],
			grade: 0,
			index: 0,
			searchTerm: ""
		}
	},
	created: function(){
		var self = this;
		self.grade = self.$route.params.grade;
		self.fetchStudents();
	},
	methods: {
		fetchStudents: function(){
			var self = this;
			var url = '/bank/students/search/';
			var data = {
				grade:self.grade
			}
			self.$http.post(url,data)
			.then(function(response){
				self.students = response.data;
			})
		},
	},
}
</script>
