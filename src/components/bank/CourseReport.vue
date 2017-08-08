<template>
  <div class="right_col" role="main">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_content">
                <div class="row">
                    <div class="col-xs-10">
                        <h2>Course Report for {{ report.course.name }} - {{ report.date }}</h2>
                    </div>
                    <div class="col-xs-2">
                        <button type="button" class="btn btn-success" style="float:right;" @click="submitReport">Submit</button>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="x_panel" id='bucks-panel'>
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
                  <td><button class='btn btn-info' @click="selectedStudent = deposit.student; studentModal = true">Profile</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_panel" id='check-and-connect-panel'>
          <div class="x_title">
            <h2>Check and Connect <small>Record scores for check and connect students</small></h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
              <table class="table table-striped">
                <thead>
                    <th>Student</th>
                    <th>Goal</th>
                    <th>Score</th>
                </thead>
                <tbody>
                    <tr v-for="r in report.ttworeport_set">
                        <td>{{r.goal.profile.student.last_name}}, {{r.goal.profile.student.first_name}}</td>
                        <td>{{r.goal.goal}}</td>
                        <td>
                            <ButtonGroup v-model="r.score">
                                <Radio :selected-value="1">1</Radio>
                                <Radio :selected-value="2">2</Radio>
                                <Radio :selected-value="3">3</Radio>
                                <Radio :selected-value="4">4</Radio>
                                <Radio :selected-value="5">5</Radio>
                            </ButtonGroup>
                        </td>
                    </tr>
                </tbody>
              </table>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="x_panel" id='pass-panel'>
          <div class="x_title">
            <h2>PASS <small>Record scores for check and connect students</small></h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <table class='table table-striped'>
              <thead>
                <th>Student</th>
                <th>Goals</th>
                <th>Score</th>
              </thead>
              <tbody>
                <tr v-for="r in report.tthreereport_set">
                  <td>{{r.profile.student.last_name}}, {{r.profile.student.first_name}}</td>
                  <td>
                      <ul>
                          <li v-for = "goal in r.profile.tthreegoal_set">{{goal.goal}}</li>
                      </ul>
                  </td>
                  <td>
                      <ButtonGroup v-model="r.score">
                        <Radio :selected-value="1" type="danger">Red</radio> 
                        <Radio :selected-value="2" type="warning">Yellow</radio>
                        <Radio :selected-value="3" type="success">Green</radio>
                        <Radio :selected-value="4" type="info">Blue</radio>
                      </ButtonGroup>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
	<StudentModal v-show="selectedStudent != null" :student.sync="selectedStudent"></StudentModal>
  </div>
</template>

<script>
import BootstrapToggle from 'vue-bootstrap-toggle'
import Radio from 'vue-strap/src/Radio.vue'
import ButtonGroup from 'vue-strap/src/buttonGroup.vue'
import StudentModal from '../helpers/StudentModal.vue'

export default {
	name: 'CourseReportComponent',
	components: {
		BootstrapToggle,
		Radio,
		ButtonGroup,
		StudentModal
	},
	created: function(){
		this.fetchGoals();
		this.fetchReport();
	},
	mounted: function(){
		var self = this;
		$("#studentModal").on("hidden.bs.modal", function(){
			self.selectedStudent = null;
		});	
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
				ttworeport_set: {},
				tthreereport_set: {},
				id: null,
			},
			goals: {},
			selectedStudent: {},
			showStudentModal: false
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
				self.report.ttworeport_set = response.data.ttworeport_set;
				self.report.tthreereport_set = response.data.tthreereport_set;
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
				if(response.status==200){
					self.$router.push('/reports')
				}
			});
		}
	}
}
</script>
