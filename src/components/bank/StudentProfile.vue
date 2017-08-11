<template>
	<div class="right_col" role="main">
		<modal v-if="showEditModal">
			<h2 slot="header">Edit Goal for {{student.first_name}} {{student.last_name}}</h2>
			<div slot="body">
				<div class="row">
					<form>
						<div class="form-group">
							<label for="editGoalName">Goal</label>
							<input type="text" class="form-control" id="editGoalName" v-model="editedGoal.name">
						</div>
						<div class="form-group">
							<label for="editGoalDescription">Description</label>
							<textarea class="form-control" id="editGoalDescription" rows="3" v-model="editedGoal.description"></textarea>
						</div>
						<div class="form-check">
							<label class="form-check-label">
								Active
								<input type="checkbox" v-model="editedGoal.active" class="form-check-input">
							</label>
						</div>
					</form>
				</div>
			</div>
			<div slot="footer">
				<button class="btn btn-info" @click.prevent="submitEditedGoal">Save</button>
				<button class="btn btn-default" @click.prevent="selectedGoal=null;showEditModal=false;">Cancel</button>
			</div>
		</modal>
		<modal v-if="showAddGoalModal">
			<h2 slot="header">Add Goal for {{student.first_name}} {{student.last_name}}</h2>
			<div slot="body">
				<form>
					<div class="form-group">
						<label for="addGoalName">Goal</label>
						<input type="text" class="form-control" id="addGoalName" v-model="newGoal.name">
					</div>
					<div class="form-group">
						<label for="addGoalDescription">Description</label>
						<textarea class="form-control" id="addGoalDescription" rows="3" v-model="newGoal.description"></textarea>
					</div>
					<div class="form-check">
						<label class="form-check-label">
							Active
							<input type="checkbox" v-model="newGoal.active" class="form-check-input">
						</label>
					</div>
				</form>
			</div>
			<div slot="footer">
				<button class="btn btn-info" @click.prevent="submitNewGoal">Save</button>
				<button class="btn btn-default" @click.prevent="showAddGoalModal=false;">Cancel</button>
			</div>
		</modal>
		<div class="row">
			<div class="col-xs-12">
				<div class="x_panel">
					<div class="x_title">
						<h2>Student Info <small>Basic information for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<div class="col-md-6">
							<p><b>First Name: </b>{{student.first_name}}</p>
							<p><b>Last Name: </b>{{student.last_name}}</p>
							<p><b>Grade: </b>{{student.grade}}</p>
							<p v-if="student.is_ttwo"><b>Check and Connect </b><i class="fa fa-check" aria-hidden="true"></i></p>
							<p v-if="student.is_tthree"><b>PASS </b><i class="fa fa-check" aria-hidden="true"></i></p>
							<div v-if="goals.length > 0">
								<p><b>Goals <i class="fa fa-plus-circle" style="cursor:pointer;" @click="showAddGoalModal=true;"></i></b></p>
								<ul>
									<li v-for="g in goals">{{g.name}} <i class="fa fa-pencil-square-o" style="cursor:pointer;" @click="showEditModal=true;selectedGoal=g;editedGoal.description=g.description;editedGoal.name=g.name;editedGoal.active=g.active;editedGoal.id=g.id;"></i></li>
								</ul>
							</div>
						</div>
						<div class="col-md-6">
							<h4>Current Account Balance: <span style="font-size:25px;color:#32cd32;font-weight:bold">${{student.account_balance}}</span></h4>
						</div>
					</div>
				</div>
				<div class="x_panel">
					<div class="x_title">
						<h2>Schedule <small>{{student.first_name}} {{student.last_name}}'s current schedule</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<table class="table table-condensed">
							<thead>
								<th>Course</th>
								<th>Teacher(s)</th>
								<th>Start Time</th>
								<th>End Time</th>
							</thead>
							<tbody>
								<tr v-for="report in schedule">
									<td style="text-align:left;">{{report.course.name}}</td>
									<td style="text-align:left;"><p v-for="t in report.course.teachers">{{t.first_name}} {{t.last_name}}</p></td>
									<td style="text-align:left;">{{report.start_time}}</td>
									<td style="text-align:left;">{{report.end_time}}</td>
								</tr>
							</tbody>
						</table>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="x_panel">
					<div class="x_title">
						<h2>Statistics <small>Bucks statistics from past two weeks</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<h4>Bucks by Course</h4>
						<table class="table table-condensed">
							<thead>
								<th>Course</th>
								<th>Bucks Earned</th>
								<th>Possible Bucks</th>
								<th>Percent Earned</th>
							</thead>
							<tbody>
								<tr v-for="course in statistics.bucks_by_course">
									<td style="text-align:left;">{{course.name}}</td>
									<td style="text-align:left;">{{course.earned}}</td>
									<td style="text-align:left;">{{course.earned + course.unearned}}</td>
									<td style="text-align:left;">{{(course.earned/(course.earned+course.unearned)*100).toFixed(1)}}%</td>
								</tr>
							</tbody>
						</table>
						<hr>
						<h4>Buck Breakdown</h4>
						<table class="table table-condensed">
							<thead>
								<th></th>
								<th>Bucks Earned</th>
								<th>Possible Bucks</th>
								<th>Percent Earned</th>
							</thead>
							<tbody>
								<tr v-for="goal in statistics.bucks_by_goal">
									<td style="text-align:left;">{{goal.name}}</td>
									<td style="text-align:left;">{{goal.earned}}</td>
									<td style="text-align:left;">{{goal.earned+goal.unearned}}</td>
									<td style="text-align:left;">{{(goal.earned/(goal.earned+goal.unearned)*100).toFixed(1)}}%</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="x_panel">
					<div class="x_title">
						<h2>Deposits <small>Recent deposits for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<table class="table table-condensed">
							<thead>
								<th>Date</th>
								<th>Course</th>
								<th>Teacher(s)</th>
								<th v-for="goal in behavior_goals">{{goal.goal}}</th>
								<th>Total Earned</th>
							</thead>
							<tbody>
								<tr v-for="deposit in deposits">
									<td style="text-align:left;">{{deposit.course_report.date}}</td>
									<td style="text-align:left;">{{deposit.course_report.course.name}}</td>
									<td style="text-align:left;"><p v-for="teacher in deposit.course_report.course.teachers">{{teacher.first_name}} {{teacher.last_name}}</p></td>
									<td v-for="buck in deposit.buck_set"><i v-if="buck.earned" class="fa fa-check" aria-hidden="true"></i><i v-if="!buck.earned" class="fa fa-times" aria-hidden="true"></i></td>
									<td style="text-align:left;">{{deposit.amount_earned}}</td>
								</tr>
							</tbody>
						</table>
						<div class="clearfix"></div>
					</div>
				</div>
<!--
				<div v-if="missing_assignments.length > 0" class="x_panel">
					<div class="x_title">
						<h2>Missing Assignments <small>All outstanding past-due work for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<table class="table table-condensed">
							<thead>
								<th>Course</th>
								<th>Assignment</th>
								<th>Teacher</th>
								<th>Date Added</th>
							</thead>
							<tbody>
								<tr v-for="assignment in missing_assignments">
									<td style="text-align:left;">{{assignment.course.name}}</td>
									<td style="text-align:left;">{{assignment.name}}</td>
									<td style="text-align:left;"><p v-for="teacher in assignment.course.teachers">{{teacher.first_name}} {{teacher.last_name}}</p></td>
									<td style="text-align:left;">{{assignment.date}}</td>
								</tr>
							</tbody>
						</table>
						<div class="clearfix"></div>
					</div>
				</div>
-->
				<div v-if="student.is_ttwo" class="x_panel">
					<div class="x_title">
						<h2>Check and Connect <small>Recent reports for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<table class="table table-condensed">
							<thead>
								<th>Date</th>
								<th>Course</th>
								<th>Goal</th>
								<th>Score</th>
							</thead>
							<tbody>
								<tr v-for="report in ttwo_reports">
									<td style="text-align:left;">{{report.report.date}}</td>
									<td style="text-align:left;">{{report.report.course.name}}</td>
									<td style="text-align:left;">{{report.goal.goal}}</td>
									<td style="text-align:left;">{{report.score}}</td>
								</tr>
							</tbody>
						</table>
						<div class="clearfix"></div>
					</div>
				</div>
				<div v-if="student.is_tthree" class="x_panel">
					<div class="x_title">
						<h2>PASS <small>Recent reports for {{student.first_name}} {{student.last_name}}</small></h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<table class="table table-condensed">
							<thead>
								<th>Date</th>
								<th>Course</th>
								<th>Score</th>
							</thead>
							<tbody>
								<tr v-for="report in tthree_reports">
									<td style="text-align:left;">{{report.report.date}}</td>
									<td style="text-align:left;">{{report.report.course.name}}</td>
									<td v-if="report.score==1" style="text-align:left;background-color:red;">Red</td>
									<td v-if="report.score==2" style="text-align:left;background-color:yellow;">Yellow</td>
									<td v-if="report.score==3" style="text-align:left;background-color:green;">Green</td>
									<td v-if="report.score==4" style="text-align:left;background-color:blue;">Blue</td>
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
import BasicModalComponent from "../helpers/BasicModal.vue"

export default {
	name: 'StudentProfileComponent',
	data: function(){
		return {
			student: {},
			goals: {},
			deposits: {},
			schedule: {},
			ttwo_reports: {},
			tthree_reports: {},
			missing_assignments: [],
			statistics: {},
			behavior_goals: {},
			selectedGoal: null,
			showEditModal: false,
			showAddGoalModal: false,
			editedGoal: {
				description: "",
				name: "",
				active: true,
				id: 0,
			},
			newGoal: {
				description: "",
				name: "",
				active: true,
			}
		}
	},
	props: {
		user: {},
	},
	components: {
		'modal': BasicModalComponent,
	},
	created: function(){
		var self = this;
		self.fetchStudent();
		self.fetchGoals();
		self.fetchDeposits();
		self.fetchMissingAssignments();
		self.fetchSchedule();
		self.fetchPersonalGoals();
	},
	mounted: function(){
		var self = this;
		self.fetchTTwoReports();
		self.fetchTThreeReports();
		self.fetchStatistics();
	},
	methods: {
		submitNewGoal: function(){
			var self = this;
			var url = "/bank/student/new_goal/";
			var data = {
				'name':self.newGoal.name,
				'description':self.newGoal.description,
				'active':self.newGoal.active,
				'student':self.student.id
			}
			self.$http.post(url,data)
			.then(function(response){
				self.newGoal.name = "";
				self.newGoal.description = "";
				self.newGoal.active = true;
				self.showAddGoalModal = false;
				self.fetchPersonalGoals();
			});
		},
		submitEditedGoal: function(){
				var self = this;
				var url = '/bank/student/update_goal/'+self.selectedGoal.id+'/'
				self.$http.put(url,self.editedGoal)
				.then(function(response){
					console.log(response);
					self.selectedGoal = null;
					self.showEditModal = false;
					self.fetchPersonalGoals();
				});
		},
		fetchStudent: function(){
			var self = this;
			var url = '/bank/student/'+self.$route.params.student_id+"/";
			self.$http.get(url)
			.then(function(response){
				self.student = response.data;
			});
		},
		fetchPersonalGoals: function(){
			var self = this;
			var url = '/bank/student/goals/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.goals = response.data;
			})
		},
		fetchDeposits: function(){
			var self = this;
			var url = '/bank/student/recent_deposits/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.deposits = response.data;
			})
		},
		fetchMissingAssignments: function(){
			var self = this;
			var url = '/bank/student/'+self.$route.params.student_id+'/missing_assignments/';
			self.$http.get(url)
			.then(function(response){
				self.missing_assignments = response.data;
			})
		},
		fetchTTwoReports: function(){
			var self = this;
			var url = '/bank/student/recent_ttwo_reports/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.ttwo_reports = response.data;
			})
		},
		fetchTThreeReports: function(){
			var self = this;
			var url = '/bank/student/recent_tthree_reports/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.tthree_reports = response.data;
			})
		},
		fetchSchedule: function(){
			var self = this;
			var url = '/bank/student/schedule/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.schedule = response.data;
			})
		},
		fetchStatistics: function(){
			var self = this;
			var url = '/bank/student/statistics/'+self.$route.params.student_id+'/';
			self.$http.get(url)
			.then(function(response){
				self.statistics = response.data;
			})
		},
		fetchGoals: function(){
			var self = this;
			var url = "bank/behavior_goals/active";
			self.$http.get(url)
			.then(function(response){
				self.behavior_goals = response.data;
			})
		},
	}
}
</script>
