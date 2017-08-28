<template>
	<div class="right_col" role="main">
		<div class="row">
			<div class="col-xs-12">
				<div class="x_panel" id="selectSchedulePanel">
					<div class="x_title">
						<h2>Select Schedule</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<label for="selectSchedule">Select Schedule</label>
						<select id="selectSchedule" class="custom-select" v-model="selectedSchedule">
							<option v-for="schedule in schedules" :value="schedule">{{schedule.name}}</option>
						</select>
						<hr>
						<button @click="initializeNewSchedule=true;" class="btn btn-primary">New Schedule</button>
					</div>
				</div>
				<div class="x_panel" id="newScheduleNamePanel" v-if="initializeNewSchedule">
					<div class="x_title">
						<h2>New Schedule</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<div class="form-group">
							<label for="initScheduleName">What would you like to call this schedule?</label>
							<input class="form-control" v-model="initScheduleName" id="initScheduleName" placeholder="Schedule Name" type="text" />
						</div>
						<button class="btn btn-success" @click="initNewSchedule()">Confirm</button>
					</div>
				</div>
				<div class="x_panel" id="editSchedulePanel" v-if="editSchedule && selectedSchedule">
					<div class="x_title">
						<h2>New Schedule</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<label for="selectedScheduleName">Schedule Name</label>
						<input class="form-control" v-model="selectedSchedule.name" id="selectedScheduleName" type="text" />
						<hr>
						<div class="row">
							<div class="col-md-6">
							<h4>Select Courses</h4>
							<nav style="width:100%;">
							  <ul class="pagination">
							    <li v-if="courseIndex > 0" @click="courseIndex -= 10" class="page-item">
							      <a class="page-link">Previous 10</a>
							    </li>
							    <li v-if="courseIndex + 10 < courses.length" @click="courseIndex += 10" class="page-item">
							      <a class="page-link">Next 10</a>
							    </li>
							  </ul>
							</nav>
							<table class="table table-condensed">
								<thead>
									<th>Name</th>
									<th>Section Number</th>
									<th>Hour</th>
									<th>Teacher(s)</th>
									<th></th>
								</thead>
								<tbody>
									<tr v-for="course in courses.slice(courseIndex,courseIndex+10)">
										<td>{{course.name}}</td>
										<td>{{course.section_number}}</td>
										<td>{{course.hour}}</td>
										<td><p v-for="teacher in course.teachers">{{teacher.last_name}}, {{teacher.first_name}}</p></td>
										<td>
											<input class="form-check-input" type="checkbox" :value="course" v-model="selectedSchedule.courses" />
										</td>
									</tr>
								</tbody>
							</table>
							<div class="clearfix"></div>
						</div>
							<div class="col-md-6">
							<h4>Select Time Slots</h4>
							<table class="table table-condensed">
								<thead>
									<th>Grade</th>
									<th>Hour</th>
									<th>Start Time</th>
									<th>End Time</th>
									<th># Bucks</th>
									<th></th>
								</thead>
								<tbody>
									<tr v-for="timeslot in selectedSchedule.time_slots">
										<td>{{timeslot.grade}}</td>
										<td>{{timeslot.hour}}</td>
										<td>{{timeslot.start_time}}</td>
										<td>{{timeslot.end_time}}</td>
										<td>{{timeslot.num_bucks}}</td>
										<td><i class="fa fa-trash" @click="selectedSchedule.time_slots.splice(selectedSchedule.time_slots.indexOf(timeslot),1)"></i></td>
									</tr>
								</tbody>
							</table>
							<button class="btn btn-default" @click="createTimeSlot=true;">New Time Slot</button>
							<div class="clearfix"></div>
						</div>
							<div class="clearfix"></div>
						</div>
						<button @click="saveSchedule()" class="btn btn-primary">Save Schedule</button>
					</div>
				</div>
				<div class="x_panel" id="createTimeSlotPanel" v-if="createTimeSlot">
					<div class="x_title">
						<h2>Create Time Slot</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<div class="form-group row">
							<div class="col-md-4">
								<label for="newTSGrade" class="col-md-6 col-form-label">Grade</label>
								<div class="col-md-6">
									<select id="newTSGrade" class="custom-select" v-model="newTimeSlotGrade">
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
									</select>
								</div>
							</div>
							<div class="col-md-4">
								<label for="newTSNumBucks" class="col-md-6 col-form-label">Number of bucks in this class period</label>
								<div class="col-md-6">
									<input class="form-control" type="number" v-model="newTimeSlotNumBucks" />
								</div>
							</div>
							<div class="col-md-4">
								<label class="col-md-6 col-form-label">Hour</label>
								<div class="col-md-6">
									<select class="custom-select" v-model="newTimeSlotHour">
										<option value="Mentoring">Mentoring</option>
										<option value="1">1st</option>
										<option value="2">2nd</option>
										<option value="3">3rd</option>
										<option value="4">4th</option>
										<option value="5">5th</option>
										<option value="6">6th</option>
										<option value="7">7th</option>
									</select>
								</div>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-3 col-form-label">Start Time</label>
							<div class="col-sm-3">
										<select class="form-control" v-model="newTimeSlotStartHour" placeholder="Hour">
											<option value="01">1</option>
											<option value="02">2</option>
											<option value="03">3</option>
										<option value="04">4</option>
										<option value="05">5</option>
										<option value="06">6</option>
										<option value="07">7</option>
										<option value="08">8</option>
										<option value="09">9</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="00">12</option>
									</select>
							</div>
							<div class="col-sm-3">
								<select class="form-control" v-model="newTimeSlotStartMinute" placeholder="Minute">
									<option value="00">00</option>
									<option value="01">01</option>
									<option value="02">02</option>
									<option value="03">03</option>
									<option value="04">04</option>
									<option value="05">05</option>
									<option value="06">06</option>
									<option value="07">07</option>
									<option value="08">08</option>
									<option value="09">09</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
									<option value="13">13</option>
									<option value="14">14</option>
									<option value="15">15</option>
									<option value="16">16</option>
									<option value="17">17</option>
									<option value="18">18</option>
									<option value="19">19</option>
									<option value="20">20</option>
									<option value="21">21</option>
									<option value="22">22</option>
									<option value="23">23</option>
									<option value="24">24</option>
									<option value="25">25</option>
									<option value="26">26</option>
									<option value="27">27</option>
									<option value="28">28</option>
									<option value="29">29</option>
									<option value="30">30</option>
									<option value="31">31</option>
									<option value="32">32</option>
									<option value="33">33</option>
									<option value="34">34</option>
									<option value="35">35</option>
									<option value="36">36</option>
									<option value="37">37</option>
									<option value="38">38</option>
									<option value="39">39</option>
									<option value="40">40</option>
									<option value="41">41</option>
									<option value="42">42</option>
									<option value="43">43</option>
									<option value="44">44</option>
									<option value="45">45</option>
									<option value="46">46</option>
									<option value="47">47</option>
									<option value="48">48</option>
									<option value="49">49</option>
									<option value="50">50</option>
									<option value="51">51</option>
									<option value="52">52</option>
									<option value="53">53</option>
									<option value="54">54</option>
									<option value="55">55</option>
									<option value="56">56</option>
									<option value="57">57</option>
									<option value="58">58</option>
									<option value="59">59</option>
								</select>
							</div>
							<div class="col-sm-3">
								<select class="form-control" v-model="newTimeSlotStartMidi">
									<option value="AM">AM</option>
									<option value="PM">PM</option>
								</select>
							</div>
						</div>
						<div class="form-group row">
							<label for="newTSEndTime" class="col-md-3 col-form-label">End Time</label>

								<div class="col-md-3">
									<select class="form-control" v-model="newTimeSlotEndHour" placeholder="Hour">
										<option value="01">1</option>
										<option value="02">2</option>
										<option value="03">3</option>
										<option value="04">4</option>
										<option value="05">5</option>
										<option value="06">6</option>
										<option value="07">7</option>
										<option value="08">8</option>
										<option value="09">9</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="00">12</option>
									</select>
								</div>
								<div class="col-md-3">
									<select class="form-control" v-model="newTimeSlotEndMinute" placeholder="Minute">
										<option value="00">00</option>
										<option value="01">01</option>
										<option value="02">02</option>
										<option value="03">03</option>
										<option value="04">04</option>
										<option value="05">05</option>
										<option value="06">06</option>
										<option value="07">07</option>
										<option value="08">08</option>
										<option value="09">09</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
										<option value="13">13</option>
										<option value="14">14</option>
										<option value="15">15</option>
										<option value="16">16</option>
										<option value="17">17</option>
										<option value="18">18</option>
										<option value="19">19</option>
										<option value="20">20</option>
										<option value="21">21</option>
										<option value="22">22</option>
										<option value="23">23</option>
										<option value="24">24</option>
										<option value="25">25</option>
										<option value="26">26</option>
										<option value="27">27</option>
										<option value="28">28</option>
										<option value="29">29</option>
										<option value="30">30</option>
										<option value="31">31</option>
										<option value="32">32</option>
										<option value="33">33</option>
										<option value="34">34</option>
										<option value="35">35</option>
										<option value="36">36</option>
										<option value="37">37</option>
										<option value="38">38</option>
										<option value="39">39</option>
										<option value="40">40</option>
										<option value="41">41</option>
										<option value="42">42</option>
										<option value="43">43</option>
										<option value="44">44</option>
										<option value="45">45</option>
										<option value="46">46</option>
										<option value="47">47</option>
										<option value="48">48</option>
										<option value="49">49</option>
										<option value="50">50</option>
										<option value="51">51</option>
										<option value="52">52</option>
										<option value="53">53</option>
										<option value="54">54</option>
										<option value="55">55</option>
										<option value="56">56</option>
										<option value="57">57</option>
										<option value="58">58</option>
										<option value="59">59</option>
									</select>
								</div>
								<div class="col-md-3">
									<select class="form-control" v-model="newTimeSlotEndMidi">
										<option value="AM">AM</option>
										<option value="PM">PM</option>
									</select>
								</div>
						</div>
						<button class="btn btn-primary" @click="saveTimeSlot()">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
export default {
	name: 'ScheduleBuilderComponent',
	data: function(){
		return {
			schedules: [],
			selectedSchedule: null,

			initializeNewSchedule: false,
			initScheduleName: "",

			editSchedule: false,

			createTimeSlot: false,
			newTimeSlotGrade: '6',
			newTimeSlotHour: "1",
			newTimeSlotStartHour: '09',
			newTimeSlotStartMinute: '00',
			newTimeSlotEndHour: '09',
			newTimeSlotEndMinute: '00',
			newTimeSlotStartMidi: 'AM',
			newTimeSlotEndMidi: 'AM',
			newTimeSlotNumBucks: 1,

			courses: [],
			courseIndex: 0
		}
	},
	created: function(){
		this.getSchedules();
		this.getCourses();
	},
	watch: {
		selectedSchedule: function(){
			this.editSchedule = true;
		}
	},
	methods: {
		getCourses: function(){
			var self = this;
			self.$http.get("/bank/courses/all/")
			.then(function(response){
				self.courses = response.data;
			})
		},
		getSchedules: function(){
			var self = this;
			self.$http.get("/bank/schedule/schedules/")
			.then(function(response){
				self.schedules = response.data;
			})
		},
		initNewSchedule: function(){
			var self = this;
			var url = "/bank/schedule/schedules/"
			var data = {
				name: self.initScheduleName,
				courses: [],
				timeslot_set: []
			}
			self.$http.post(url,data)
			.then(function(response){
				self.selectedSchedule = response.data;
				self.initializeNewSchedule = false;
				self.editSchedule = true;
				self.initScheduleName = "";
				self.getSchedules();
			})
		},
		saveSchedule: function(){
			var self = this;
			var url = "/bank/schedule/schedule/"+self.selectedSchedule.id+"/"
			self.$http.put(url,self.selectedSchedule)
			.then(function(response){
				self.createSchedule = false;
				self.getSchedules();
				self.selectedSchedule = response.data;
			});
		},
		saveTimeSlot: function(){
			var self = this;
			var url = "/bank/schedule/time_slots/"
			if (self.newTimeSlotStartMidi == 'PM' %% self.newTimeSlotStartHour != "12"){
				self.newTimeSlotStartHour += 12;
			}
			if (self.newTimeSlotEndMidi == 'PM' && self.newTimeSlotEndHour != "12"){
				self.newTimeSlotStartHour += 12;
			}
			var startTime = self.newTimeSlotStartHour+":"+self.newTimeSlotStartMinute+":00"
			var endTime = self.newTimeSlotEndHour+":"+self.newTimeSlotEndMinute+":00"

			var data = {
				grade: self.newTimeSlotGrade,
				start_time: startTime,
				end_time: endTime,
				hour: self.newTimeSlotHour,
				num_bucks: self.newTimeSlotNumBucks,
				schedule: self.selectedSchedule.id
			}

			self.$http.post(url,data)
			.then(function(response){
				self.selectedSchedule.time_slots.push(response.data);
				self.saveSchedule();
				self.createTimeSlot = false;
			})
		}
	}
}
</script>
