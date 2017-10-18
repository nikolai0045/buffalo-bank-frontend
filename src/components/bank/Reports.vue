<template>
  <div class='right_col' role='main'>
    <div class='row'>
      <div class='col-md-12 col-sm-12 col-xs-12'>
        <div class="alert alert-warning">
          <b>Notice:</b> With the start of the new term, schedules will be a little messy for the next couple of days. It is likely that you have a number of reports showing up for you that should not be showing up this term. For anything like this, just submit an issue report. I will be especially attentive to these reports for the next few days to make sure we get schedules solidified.
        </div>
        <div class='x_panel'>
          <div class="x_title">
            <h2>Reports <small>All of today's reports</small></h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <div class="row">
              <input v-model="date" id='reports_date' type="text" class="form-control datepicker" placeholder="" pattern="^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$">
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Hour</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th></th>
                  <th v-if="user.user_type == 'ADMIN' || user.administrator">Teachers</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in reports">
                  <td>{{ report.course.name }}</td>
                  <td>{{ report.course.hour }}</td>
                  <td>{{ report.start_time }}</td>
                  <td>{{ report.end_time }}</td>
                  <td>
					<router-link v-if="report.completed" class="btn btn-default" :to="{ name: 'course_report', params: { report_id: report.id }}">Edit</router-link>
					<router-link v-else class="btn btn-info" :to="{ name: 'course_report', params: { report_id: report.id }}">View</router-link>
                  </td>
                  <td v-if="user.user_type == 'ADMIN' || user.administrator ">
						<p style="text-align:left;" v-for="teacher in report.course.teachers">{{teacher.first_name}} {{teacher.last_name}}</p>
					       </td>
                 <td>
                   <a @click="markInactive(report)">Course not active this term</a>
                   <br>
                   <a @click="removeReport(report)">I don't have this course today</a>
                 </td>
                </tr>
              </tbody>
            </table>
            <div class='clearfix'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportsPageComponent',
  created: function() {
    var self = this;
    var today = new Date();
    var date = today.getDate()
    var month = today.getMonth()+1;
    if(date<10){
      date = "0"+date;
    }
    if(month<10){
      month = "0"+month;
    }
    self.date = month + "/" + date + "/" + today.getFullYear();
    self.fetchReports();
  },
  mounted: function() {
    var self = this;
    $('.datepicker').each(function() {
      $(this).daterangepicker(
        {
          locale: {
            format: 'MM/DD/YYYY',
          },
          singleDatePicker: true
        }
      ).on('apply.daterangepicker', function(ev, picker) {
        self.date = $(this).val();
      });
    });
  },
  data: function () {
    return {
      reports: [],
      date: "",
    }
  },
  computed: {
    day: function() {
      return this.date.split('/')[1]
    },
    month: function() {
      return this.date.split('/')[0]
    },
    year: function() {
      return this.date.split('/')[2]
    }
  },
  props: {
    user: {}
  },
  watch: {
    date: function(newDate) {
      console.log(newDate);
      this.fetchReports();
    }
  },
  methods: {
    fetchReports: function(){
      var self = this;
      var url = '/bank/reports/'+self.year+"/"+self.month+"/"+self.day+"/";
      self.$http.get(url)
      .then(function(response){
        self.reports = response.data;
      });
    },
    markInactive: function(report){
      var self = this;
      var url = '/bank/reports/mark_inactive/';
      self.$http.post(url,report)
      .then(function(response){
        self.fetchReports();
      })
    },
    removeReport: function(report){
      var self = this;
      var url = '/bank/reports/destroy/'+report.id+'/';
      self.$http.delete(url)
      .then(function(response){
        self.fetchReports();
      })
    }
  }
}
</script>
