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
						<table class="table table-condensed">
							<thead>
								<th>Last Name</th>
								<th>First Name</th>
								<th>Account Balance</th>
								<th></th>
							</thead>
							<tbody>
								<tr v-for="student in selectedStudents">
									
								</tr>
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
			grade: [],
			index: 0,
		}
	},
	methods: {
		fetchStudents: function(){
			
		},
		searchStudents: function(){
			
		}
	},
	computed: {
		selectedStudents: function(){
			
		}
	}
}
</script>