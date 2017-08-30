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
						<div class="col-sm-3">
							<ul class="pagination">
								<li class="page-item">
									<a class="page-link" style="width:100%;" :disabled="index==0" @click="index-=25;">Previous</a>
								</li>
							</ul>
						</div>
						<div class="col-sm-6">
						</div>
						<div class="col-sm-3">
							<ul class="pagination">
								<li class="page-item">
									<a class="page-link" style="width:100%;" :disabled="index+25 < students.length" @click="index+=25">Next</a>
								</li>
							</ul>
						</div>
						<div class="clearfix"></div>
						<hr>
						<input class="form-control" v-model="searchTerm" placeholder="Search..." />
						<table class="table table-condensed">
							<thead>
								<th>Last Name</th>
								<th>First Name</th>
								<th>Account Balance</th>
								<th></th>
							</thead>
							<tbody>
								<template v-for="student in students.slice(index,index+25)">
									<tr v-if="searchTerm == '' || student.first_name.indexOf(searchTerm)>-1 || student.last_name.indexOf(searchTerm)>-1">
										<td>{{student.last_name}}</td>
										<td>{{student.first_name}}</td>
										<td>{{student.account_balance}}</td>
										<td><router-link :to="{name:'student_profile', params: {student_id:student.id}}">Profile</router-link></td>
									</tr>
								</template>
							</tbody>
						</table>
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
