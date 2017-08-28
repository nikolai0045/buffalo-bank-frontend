<template>
	<div class="right_col" role="main">
		<div clas="row">
			<div class="col-xs-12">
				<div class="x_panel">
					<div class="x_title">
						<h2>Administrative Panel</h2>
						<div class="clearfix"></div>
					</div>
					<div class="x_content">
						<router-link class="btn btn-primary" :to="{name: 'manage_daily_schedules'}">Assign Daily Schedules</router-link>
						<router-link class="btn btn-primary" :to="{name: 'schedule_builder'}">Schedule Builder</router-link>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AdminPanelComponent',
	
}
</script>