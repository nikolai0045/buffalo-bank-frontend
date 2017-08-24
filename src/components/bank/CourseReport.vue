<template>
	<div class="right_col" role="main">
		<modal v-if="showEditAssignmentModal">
		<h2 slot="header">Edit Missing Assignment</h2>
			<div slot="body">
				<div class="row">
					<form>
						<div class="col-md-6">
									<div class="form-group">
										<label for="editAssignmentName">Name</label>
										<input type="text" class="form-control" id="editAssignmentName" v-model="selectedAssignment.name">
									</div>
									<div class="form-group">
										<label for="editAssignmentDescription">Description</label>
										<textarea class="form-control" id="editAssignmentDescription" rows="3" v-model="selectedAssignment.description"></textarea>
									</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<h4>Missing</h4>
								<div class="form-check" v-for="student in selectedAssignment.students">
									<label class="form-check-label">
										{{student.last_name}}, {{student.first_name}}
										<i class='fa fa-minus' style="cursor:pointer;" @click="studentsNotMissingAssignment.push(student);var index=selectedAssignment.students.indexOf(student);selectedAssignment.students.splice(index,1);"></i>
									</label>
								</div>
							</div>
						<hr>
						<div class="form-group">
							<h4>Not Missing</h4>
								<div class="form-check" v-for="student in studentsNotMissingAssignment">
									<label class="form-check-label">
										{{student.last_name}}, {{student.first_name}}
										<i class="fa fa-plus" style="cursor:pointer;" @click="selectedAssignment.students.push(student);var index=studentsNotMissingAssignment.indexOf(student);studentsNotMissingAssignment.splice(index,1);"></i>
									</label>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		<div slot="footer">
			<button class="btn btn-info" @click="saveEditAssignment();showEditAssignmentModal=false;">Save</button>
			<button class="btn btn-default" @click="showEditAssignmentModal=false;selectedAssignment={};studentsNotMissingAssignment=[];fetchMissingAssignments();">Cancel</button>
		</div>
	</modal>
		<modal v-if="showNewAssignmentModal">
	  <h2 slot="header">Add Missing Assignment</h2>
	  <div slot="body">
		<div class="row">
		  <form>
			<div class="form-group">
							<label for="addAssignmentName">Name</label>
							<input type="text" class="form-control" id="addAssignmentName" v-model="newAssignment.name">
						</div>
						<div class="form-group">
							<label for="addAssignmentDescription">Description</label>
							<textarea class="form-control" id="addAssignmentDescription" rows="3" v-model="newAssignment.description"></textarea>
						</div>
			<div class="form-group">
			  <h4>Missing</h4>
			  <div class="form-check" v-for="student in newAssignment.students">
				<label class="form-check-label">
				  {{student.last_name}}, {{student.first_name}}
				  <i class='fa fa-minus-circle' style="cursor:pointer;" @click="studentList.push(student);var index=newAssignment.students.indexOf(student);newAssignment.students.splice(index,1);"></i>
				</label>
			  </div>
			</div>
			<div class="form-group">
			  <h4>Not Missing</h4>
			  <div class="form-check" v-for="student in studentList">
				<label class="form-check-label">
				  {{student.last_name}}, {{student.first_name}}
				  <i class="fa fa-plus-circle" style="cursor:pointer;" @click="newAssignment.students.push(student);var index=studentList.indexOf(student);studentList.splice(index,1);"></i>
				</label>
			  </div>
			</div>
		  </form>
		</div>
	  </div>
	  <div slot="footer">
		<button class="btn btn-info" @click="saveNewAssignment();showNewAssignmentModal=false;">Save</button>
		<button class="btn btn-default" @click="showNewAssignmentModal=false">Cancel</button>
	  </div>
	</modal>
		<div class="modal fade" id="newAssignmentModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-header">Add new missing assignment</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-group">
								<label for='newAssignmentName'>Assignment</label>
								<input id="newAssignmentName" v-model="newAssignment.name" class="form-control" placeholder="Assignment" />
							</div>
							<div class="form-group">
								<label for='newAssignmentDescription'>Description</label>
								<input id="newAssignmentDescription" v-model="newAssignment.description" class="form-control" placeholder="Description"/>
							</div>
						</form>
					</div>
					<div class="modal-footer">
		
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="addGoalModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Add goal for {{selectedStudentForGoal.first_name}} {{selectedStudentForGoal.last_name}}</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-group">
								<label for="newGoalName">Goal</label>
								<input id="newGoalName" v-model="newGoal.name" class="form-control" placeholder="Goal" />
							</div>
							<div class="form-group">
								<label for="newGoalDescription">Description (optional)</label>
								<textarea id="newGoalDescription" v-model="newGoal.description" class="form-control" rows="3" />
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" @click="addNewgoal()" class="btn btn-primary">Save</button>
						<button type="button" @click="clearNewGoal()" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
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
								<th v-for="goal in goals">{{goal.goal}}</th>
								<th v-if="report.course.hour=='Mentoring'">Mentoring</th>
								<th v-else>Note</th>
								<th>Action</th>
							</thead>
							<tbody>
								<tr v-for="deposit in report.deposit_set">
									<td>{{ deposit.student.last_name }}, {{ deposit.student.first_name }}</td>
									<td v-for="buck in deposit.buck_set">
										<span v-if="!deposit.absent && !deposit.iss">
											<bootstrap-toggle v-model="buck.earned" :options="{ on: '<i class=\'fa fa-usd\'></i>', off: '<i class=\'fa fa-times\'></i>', onstyle: 'success', offstyle: 'danger' }"/>
										</span>
									</td>
									<td v-if="report.course.hour=='Mentoring'">
										<p v-for="goal in deposit.student.personalbehaviorgoal_set">
											<i class="fa fa-times-circle" style="cursor:pointer;" @click="deleteGoal(deposit,goal);var index=deposit.student.personalbehaviorgoal_set.indexOf(goal);deposit.student.personalbehaviorgoal_set.splice(index,1);"></i>
											{{goal.name}}
										</p>
										<a @click="initializeCreateGoalModal(deposit.student)">Add goal</a>
									</td>
									<td v-else >
										<input type="text" style="width:80%" :placeholder="'Note for '+ deposit.student.first_name + ' ' + deposit.student.last_name" v-model="deposit.note">
									</td>
									<td>
										<button v-if="!deposit.absent" :disabled="deposit.iss" class="btn btn-danger" @click="deposit.absent=true;markAbsent(deposit.student,true);">Absent</button>
										<button v-if="deposit.absent" :disabled="deposit.iss" class="btn btn-success" @click="deposit.absent=false;markAbsent(deposit.student,false)">Present</button>
										<button v-if="!deposit.iss" :disabled="deposit.absent" class="btn btn-warning" @click="deposit.iss=true;markIss(deposit.student,true);">ISS</button>
										<button v-if="deposit.iss" :disabled="deposit.absent" class="btn btn-info" @click="deposit.iss=false;markIss(deposit.student,false);">Undo</button>
										<button class='btn btn-info' @click="selectedStudent = deposit.student; studentModal = true">View</button>
									</td>
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
								<th>Note</th>
								<th></th>
							</thead>
							<tbody>
								<template v-for="r in report.ttworeport_set">
									<tr v-if="!r.absent && !r.iss">
										<td style="width:15%;">{{r.goal.profile.student.last_name}}, {{r.goal.profile.student.first_name}}</td>
										<td style="width:30%;">{{r.goal.goal}}</td>
										<td style="width:25%;">
											<ButtonGroup v-model="r.score" v-if="!r.not_applicable">
												<Radio :selected-value="1">1</Radio>
												<Radio :selected-value="2">2</Radio>
												<Radio :selected-value="3">3</Radio>
												<Radio :selected-value="4">4</Radio>
											</ButtonGroup>
										</td>
										<td style="width:30%;">
											<input type="text" style="width:100%;" :placeholder="'Note for ' + r.goal.profile.student.first_name + ' ' + r.goal.profile.student.last_name" v-model="r.note"/>
										</td>
										<td>
											<button v-if="!r.not_applicable" @click="r.not_applicable=true" class="btn btn-warning">Not Applicable</button>
											<button v-if="r.not_applicable" @click="r.not_applicable=false" class="btn btn-success">Applicable</button>
										</td>
									</tr>
								</template>
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
								<th>Note</th>
								<th></th>
							</thead>
							<tbody>
								<template v-for="r in report.tthreereport_set">
									<tr v-if="!r.iss && !r.absent">
										<td style="width:15%">{{r.profile.student.last_name}}, {{r.profile.student.first_name}}</td>
										<td style="width:30%">
											<ul>
												<li v-for = "goal in r.profile.tthreegoal_set">{{goal.goal}}</li>
											</ul>
										</td>
										<td style="width:25%">
											<ButtonGroup v-model="r.score">
												<Radio :selected-value="1" type="danger" style="width:35px;height:35px;" :disabled="r.score==1"></radio>
												<Radio :selected-value="2" type="warning" style="width:35px;height:35px;" :disabled="r.score==2"></radio>
												<Radio :selected-value="3" type="success" style="width:35px;height:35px;" :disabled="r.score==3"></radio>
												<Radio :selected-value="4" type="info" style="width:35px;height:35px;" :disabled="r.score==4"></radio>
											</ButtonGroup>
											<span v-if="r.score=='1'">Red</span>
											<span v-if="r.score=='2'">Yellow</span>
											<span v-if="r.score=='3'">Green</span>
											<span v-if="r.score=='4'">Blue</span>
										</td>
										<td style="width:30%">
											<input type="text" style="width:100%;" :placeholder="'Note for '+r.profile.student.first_name+' '+r.profile.student.last_name" v-model="r.note">
										</td>
										<td>
											<button v-if="!r.not_applicable" @click="r.not_applicable=true" class="btn btn-warning">Not Applicable</button>
											<button v-if="r.not_applicable" @click="r.not_applicable=false" class="btn btn-success">Applicable</button>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="x_panel" id="missing-assignments-panel">
					<div class="x_title">
						<h2>Missing Assignments
							<i class="fa fa-plus-circle" style="cursor:pointer;" @click="showNewAssignmentModal=true;populateStudentList();"></i>
						</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<table class="table">
							<thead>
								<th>Assignment</th>
								<th>Students</th>
								<th></th>
							</thead>
							<tbody>
								<tr v-for="assignment in missingAssignments">
									<td style="text-align:left;">{{assignment.name}}</td>
									<td style="text-align:left;">
										<ul>
											<li v-for="student in assignment.students">{{student.last_name}}, {{student.first_name}}</li>
										</ul>
									</td>
									<td>
										<div class="col-xs-3">
											<i class="fa fa-pencil fa-lg" style="cursor:pointer;" @click="selectedAssignment=assignment;fetchNonMissingStudents();showEditAssignmentModal=true;"></i>
										</div>
										<div class="col-xs-9">
											<i class="fa fa-trash fa-lg" style="cursor:pointer;" @click="deleteAssignment(assignment)"></i>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
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
import BasicModalComponent from "../helpers/BasicModal.vue"

export default {
	name: 'CourseReportComponent',
	components: {
		BootstrapToggle,
		Radio,
		ButtonGroup,
		StudentModal,
		'modal': BasicModalComponent,
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
		var report = self.report;
		self.fetchMissingAssignments();
	},
	data: function(){
		return {
			report: {
				course: {},
				date: null,
				start_time: null,
				end_time: null,
				completed: null,
				deposit_set: [],
				ttworeport_set: [],
				tthreereport_set: [],
				id: null,
			},
			goals: {},
			selectedStudent: {},
			showStudentModal: false,
			missingAssignments: {},
			selectedAssignment: {},
			showEditAssignmentModal: false,
			newAssignment: {
				name: "",
				description: "",
				students: [],
				course: null,
			},
			showNewAssignmentModal: false,
			studentsNotMissingAssignment: {},
			studentList: [],
			selectedStudentForGoal: {},
			newGoal: {
				name: "",
				description: ""
			}
		}
	},
	props: {
		user: {},
	},
	computed: {
		roster: function(){
			var self = this;
			var students = [];
			for (var i=0;i<self.report.deposit_set.length;i++){
				students.push(self.report.deposit_set[i].student);
			}
			return students;
		}	
	},
	methods: {
		deleteGoal: function(deposit,goal){
			var self = this;
			self.$http.delete('/bank/student/destroy_goal/'+goal.id+'/')
			.then(function(response){
				console.log('deleted goal');
			});
		},
		addGoal: function(student,newGoal){
			var self = this;
			self.$http.post('/bank/student/init_goal/',{student:student})
			.then(function(response){
				var goal = response.data;
				goal.name = newGoal;
				console.log(goal);
				self.$http.put('/bank/student/update_goal/'+goal.id+'/',goal)
				.then(function(response){
					console.log('added goal');
				});
			});
		},
		initializeCreateGoalModal: function(student){
			var self = this;
			self.selectedStudentForGoal = student;
			$('#addGoalModal').modal({show:true});
		},
		clearNewGoal: function(){
			var self = this;
			self.selectedStudentForGoal = {};
			self.newGoal.name='';
			self.newGoal.description='';
		},
		addNewgoal: function(){
			var self = this;
			var studentId = self.selectedStudentForGoal.id;
			var data = {
				name: self.newGoal.name,
				description: self.newGoal.description,
				active: true,
				student: studentId
			}
			var url = '/bank/student/new_goal/'
			self.$http.post(url,data)
			.then(function(response){
				for (var i=0;i<self.report.deposit_set.length;i++){
					if (self.report.deposit_set[i].student.id==studentId){
						var index = i;
					}
				}
				self.report.deposit_set[index].student.personalbehaviorgoal_set.push({
					description: response.data.description,
					name: response.data.name,
					id: response.data.id
				})
			});
			self.newGoal = {
				name: "",
				description: ""
			}
			self.selectedStudentForGoal = {};
			$('#addGoalModal').modal('toggle');
		},
		saveNewAssignment: function(){
			var self = this;
			self.newAssignment.course = self.report.course.id;
			var url = '/bank/courses/missing_work/create/';
			self.$http.post(url,self.newAssignment)
			.then(function(response){
				self.fetchMissingAssignments();
			});
		},
		populateStudentList: function(){
			var self = this;
			self.studentList = [];
			for (var i = 0; i < self.report.deposit_set.length; i++) {
				self.studentList.push(self.report.deposit_set[i].student);
			}
		},
		deleteAssignment: function(assignment){
			var self = this;
			var url = '/bank/courses/missing_work/destroy/'+assignment.id+'/'
			self.$http.delete(url)
			.then(function(response){
				self.fetchMissingAssignments();
			});
		},
		fetchNonMissingStudents: function(){
			var self = this;
			self.$http.get('/bank/courses/not_missing_work/'+self.report.id+'/'+self.selectedAssignment.id+'/')
			.then(function(response){
				self.studentsNotMissingAssignment = response.data;
			});
		},
		saveEditAssignment: function(){
			var self = this;
			var url = "/bank/courses/missing_work/update/"+self.selectedAssignment.id+"/";
			var data = {
				assignment:self.selectedAssignment.id,
				missing:self.selectedAssignment.students,
				notMissing:self.studentsNotMissingAssignment,
			};
			var url = 'bank/courses/missing_work_detail/'+self.report.id+'/'+self.selectedAssignment.id+'/';
			self.$http.put(url,data)
			.then(function(response){
				self.selectedAssignment = {};
				self.studentsNotMissingAssignment = [];
				self.fetchMissingAssignments();
				console.log(response);
			});
		},
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
				for(var i=0;i<self.report.deposit_set.length;i++){
					self.report.deposit_set[i].newGoal = ""
				}
			});
		},
		fetchGoals: function(){
			var self = this;
			var url = "bank/behavior_goals/active/";
			self.$http.get(url)
			.then(function(response){
				self.goals = response.data;
			})
		},
		fetchMissingAssignments: function(){
			var self = this;
			var url = '/bank/courses/missing_work/'+self.$route.params.report_id+'/';
			console.log(url);
			self.$http.get(url)
			.then(function(response){
				self.missingAssignments = response.data;
			});
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
		},
		markAbsent: function(student,absent){
			var self = this;
			var student_id = student.id;
			console.log(student_id);
			for(var i=0;i<self.report.ttworeport_set.length;i++){
				if(self.report.ttworeport_set[i].goal.profile.student.id == student_id){
					console.log(self.report.ttworeport_set[i]);
					self.report.ttworeport_set[i].absent = absent;
				}
			}
			for(var i=0;i<self.report.tthreereport_set.length;i++){
				if(self.report.tthreereport_set[i].profile.student.id == student_id){
					console.log(self.report.tthreereport_set[i]);
					self.report.tthreereport_set[i].absent = absent;
				}
			}
		},
		markIss: function(student,iss){
			var self = this;
			var student_id = student.id;
			console.log(student_id);
			for(var i=0;i<self.report.ttworeport_set.length;i++){
				if(self.report.ttworeport_set[i].goal.profile.student.id == student_id){
					console.log(self.report.ttworeport_set[i]);
					self.report.ttworeport_set[i].iss = iss;
				}
			}
			for(var i=0;i<self.report.tthreereport_set.length;i++){
				if(self.report.tthreereport_set[i].profile.student.id == student_id){
					console.log(self.report.tthreereport_set[i]);
					self.report.tthreereport_set[i].iss = iss;
				}
			}
		}
	}
}
</script>
