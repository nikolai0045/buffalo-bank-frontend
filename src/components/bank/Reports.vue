<template>
  <div class='right_col' role='main'>
    <div class='row'>
      <div class='col-md-12 col-sm-12 col-xs-12'>
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
                    <button v-if="report.completed" class="btn btn-default">Edit</button>
                    <button v-else class="btn btn-info">View</button>
                  </td>
                  <td v-if="user.user_type == 'ADMIN' "> {{ report.course.teachers }}</td>
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
    }
  }
}
</script>
