<template>
	<div class="right_col" role="main">
		<div v-if="message != ''" class="ui-pnotify-text" aria-role="alert">
			{{message}}
		</div>
		<div class="row">
			<div class="col-xs-12">
				<div class="x_panel">
					<div class="x_title">
						<h2>Assign Schedules</h2>
					</div>
					<div class="x_content">
						<label for="schedule_date">Select Date</label>
						<input v-model="date" id='schedule_date' type="text" class="form-control datepicker" data-date-format="yy-mm-dd" />
						<label for="schedule">Select Schedule</label>
						<select class="custom-select" v-model="selectedSchedule">
							<option v-for="schedule in schedules" :value="schedule">{{schedule.name}}</option>
						</select>
						<button class="btn btn-primary" @click="submit()">Save Changes</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ManageDailySchedulesComponent.vue",
	data: function(){
		return {
			date: null,
			schedules: [],
			selectedSchedule: null,
			message: "",
			scheduleId: null
		}
	},
	created: function(){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = today.getDate();
		if (month < 10){
			month = "0" + month;
		}
		if (day < 10){
			day = "0" + date;
		}
		var date = year + '-' + month + '-' + day;
		this.date = date;
		this.getSchedules();
		this.getScheduleByDate();
	},
	watch: {
		date: function(){
			this.getScheduleByDate();
		}	
	},
	methods: {
		getScheduleByDate: function(){
			var self = this;
			var url = '/bank/schedule/get_schedule_by_date/'
			var split_date = this.date.split('-');
			var data = {
				date: {
					year: split_date[0],
					month: split_date[1],
					day: split_date[2]
				}
			}
			self.$http.post(url,data)
			.then(function(response){
				self.selectedSchedule = response.data.schedule;
				self.scheduleId = response.data.id;
			});
		},
		getSchedules: function(){
			var self = this;
			var url = '/bank/schedule/schedules/';
			self.$http.get(url)
			.then(function(response){
				self.schedules = response.data;
			})
		},
		submit: function(){
			var self = this;
			var url = "/bank/schedule/daily_schedule/"+self.scheduleId+'/';
			var dailySchedule = {
				date: self.date,
				schedule: self.selectedSchedule
			}
			self.$http.put(url,data)
			.then(function(response){
				self.message = "Schedule was saved successfully";
			})
		}
	}
}
</script>