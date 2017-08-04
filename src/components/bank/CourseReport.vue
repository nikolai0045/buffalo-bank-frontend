<template>
  <div class="right_col" role="main">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_content">
                <div class="col-md-4 offset-md-8">
                    <button type="button" class="btn btn-success" @click="submitReport">Submit</button>
                </div>
            </div>
        </div>
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
                <tr v-for="deposit in report.deposit_set">
                  <td>{{ deposit.student.last_name }}, {{ deposit.student.first_name }}</td>
                  <td v-for="buck in deposit.buck_set">
                    <bootstrap-toggle v-model="buck.earned" :options="{ on: '<i class=\'fa fa-usd\'></i>', off: '<i class=\'fa fa-times\'></i>', onstyle: 'success', offstyle: 'danger' }"/>
                  </td>
                  <td><button class='btn btn-info'>Profile</button></td>
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
import BootstrapToggle from 'vue-bootstrap-toggle'
    
export default {
  name: 'CourseReportComponent',
  components: {
    BootstrapToggle  
  },
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
        deposit_set: {},
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
        self.report.deposit_set = response.data.deposit_set;
        self.report.id = response.data.id;
      });
    },
    fetchGoals: function(){
      var self = this;
      var url = "bank/behavior_goals/active";
      self.$http.get(url)
      .then(function(response){
        self.goals = response.data;
      })
    },
    submitReport: function(){
        var self = this;
        var url = "bank/course_report/save/"+self.$route.params.report_id+"/";
        self.$http.put(url,self.report)
        .then(function(response){
           console.log(response); 
        });
    }
  }
}
</script>
