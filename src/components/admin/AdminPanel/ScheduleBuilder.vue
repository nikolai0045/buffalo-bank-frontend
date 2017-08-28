<template>
	<div class="right_col" role="main">
		<div class="row">
			<div class="col-xs-12">
				<div class="x_panel">
					<div class="x_title">
						<h2>Select Schedule</h2>
					</div>
					<div class="x_content">
						<label for="selectSchedule">Select Schedule</label>
						<select id="selectSchedule" class="custom-select" v-model="selectedSchedule">
							<option v-for="schedule in schedules" :value="schedule">{{schedule.name}}</option>
						</select>
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
			selectedSchedule: null
		}
	},
	created: function(){
		this.getSchedules();	
	},
	methods: {
		getSchedules: function(){
			var self = this;
			self.$http.get("/bank/schedule/schedules/")
			.then(function(response){
				self.schedules = response.data;
			})
		}
	}
}
</script>