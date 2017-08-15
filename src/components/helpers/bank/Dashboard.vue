<template>
  <div role='main' class='right_col' style='min-height: 712px;'>
    <div class="row">
		<div class="col-xs-12">
			<div class="x_panel">
				<div class="x_title">
					<h2>Schedule <small>Schedule for {{date}}</small></h2>
					<div class="clearfix"></div>
				</div>
				<div class="x_content">
					<table v-if="reports.length > 0" class="table table-striped table-hover">
					  <thead>
						<tr>
						  <th style='width: 20%'>Course</th>
						  <th style='width: 10%'>Section</th>
						  <th style='width: 15%'>Start Time</th>
						  <th style='width: 15%'>End Time</th>
						  <th style='width: 20%'>Action</th>
						  <th style='width: 20%' v-if="user.user_type == 'ADMIN'">Teachers</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="report in reports">
						  <td>{{ report.course.name }}</td>
						  <td>{{ report.course.section_number }}</td>
						  <td>{{ report.start_time }}</td>
						  <td>{{ report.end_time }}</td>
						  <td>
							<router-link v-if="report.completed" class="btn btn-default" :to="{ name: 'course_report', params: { report_id: report.id }}">Edit</router-link>
							<router-link v-else class="btn btn-info" :to="{ name: 'course_report', params: { report_id: report.id }}">View</router-link>
						  </td>
						  <td v-if="user.user_type == 'ADMIN' "> {{ report.course.teachers }}</td>
						</tr>
					  </tbody>
					</table>
					<p v-else>No courses scheduled for today</p>
					<div class='clearfix'></div>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data: function() {
    return{
		date: "",
		reports: {},
    }
  },
  created: function() {
	  var self = this;
	  self.date = moment().format("MMMM Do YYYY");
	  self.fetchReports();
  },
  props: {
	  user: {},
  },
  methods: {
    fetchReports: function(){
      var self = this;
	  var d = new Date();
	  var month = d.getMonth()+1;
      var url = '/bank/reports/'+d.getFullYear()+"/"+month+"/"+d.getDate()+"/";
      self.$http.get(url)
      .then(function(response){
        self.reports = response.data;
      });
    }
  }
}
</script>
