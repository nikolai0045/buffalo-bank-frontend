<template>
  <div class="right_col" role="main">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Bucks <small>Award bucks for {{ report.course.name }} - {{ report.date }}</small></h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <table class='table table-striped table-hover'>
              <thead>
                <th>Student</th>
                <th v-for="goal in goals">{{ goal.goal }}</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr v-for="deposit in report.deposits">
                  <td>{{ deposit.student.last_name }}, {{ deposit.student.first_name }}</td>
                  <td v-for="buck in deposit.buck_set">
                    <input type="checkbox" data-toggle='toggle' data-on="$" data-off="-" data-onstyle="success" />
                    <div class='clearfix'></div>
                  </td>
                  <td><button class='btn btn-default'>Profile</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_panel">
          <div class="x_title">
            <h2>Check and Connect <small>Record scores for check and connect students</small></h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">

          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_panel">
          <div class="x_title">
            <h2>PASS <small>Record scores for check and connect students</small></h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseReportComponent',
  created: function(){
    this.fetchGoals();
    this.fetchReport();
  },
  data: function(){
    return {
      report: {
        course: {},
        date: null,
        start_time: null,
        end_time: null,
        completed: null,
        deposits: {},
        id: null,
      },
      goals: {}
    }
  },
  props: {
    user: {},
  },
  methods: {
    fetchReport: function(){
      var self = this;
      var url = "/bank/course_report/"+self.$route.params.report_id+"/";
      self.$http.get(url)
      .then(function(response){
        self.report.course = response.data.course;
        self.report.date = response.data.date;
        self.report.start_time = response.data.start_time;
        self.report.end_time = response.data.end_time;
        self.report.completed = response.data.completed;
        self.report.deposits = response.data.deposit_set;
        self.report.id = response.data.id;
        console.log(response.data);
      });
    },
    fetchGoals: function(){
      var self = this;
      var url = "bank/behavior_goals/active";
      self.$http.get(url)
      .then(function(response){
        self.goals = response.data;
      })
    }
  }
}
</script>
