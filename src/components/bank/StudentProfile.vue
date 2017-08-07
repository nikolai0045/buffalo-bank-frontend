<template>
	<div class="right_col" role="main">
		<div class="row">
			<div class="col-xs-12">
				<div class="x_panel">
					<div class="x_title">
					<h2>Student Info <small>Basic information for {{student.first_name}} {{student.last_name}}</small></h2>
					<div class="clearfix"></div>
					</div>
				</div>
				<div class="x_panel">
					<div class="x_title">
						<h2>Deposits <small>Recent deposits for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<div class="clearfix"></div>
					</div>
				</div>
				<div v-if="student.is_ttwo" class="x_panel">
					<div class="x_title">
						<h2>Check and Connect</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
					</div>
				</div>
				<div v-if="student.is_tthree" class="x_panel">
					<div class="x_title">
						<h2>PASS</h2>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StudentProfileComponent',
	data: function(){
		return {
			student = {},
		}
	},
	props: {
		user: {},
	},
	created: function(){
		var self = this;
		self.fetchStudent();
	},
	methods: {
		fetchStudent: function(){
			var self = this;
			var url = '/students/'+self.$route.params.student_id+"/";
			self.$http.get(url)
			.then(function(response){
				this.student = response.data;
			});
		}
	}
}
</script>