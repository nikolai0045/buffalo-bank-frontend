<template>
	<div class="right_col" row="main">
		<div class="col-xs-12">
			<div class="row">
				<div class="col-md-4">
					<h2 style="color:green;">Elgible Students</h2>
					<table class='table table-condensed'>
						<thead>
							<th>First</th>
							<th>Last</th>
							<th>Grade</th>
						</thead>
						<tbody>
							<tr v-for="s in students" v-if="!s.missing_work">
								<td style="text-align:left;">{{s.first_name}}</td>
								<td style="text-align:left;">{{s.last_name}}</td>
								<td style="text-align:left;">{{s.grade}}</td>
							</tr>
						</tbody>
					</table>
					<h2 style="color:red;">Ineligible Students</h2>
					<table class='table table-condensed'>
						<thead>
							<th>First</th>
							<th>Last</th>
							<th>Grade</th>
						</thead>
						<tbody>
							<tr v-for="s in students" v-if="s.missing_work">
								<td style="text-align:left;">{{s.first_name}}</td>
								<td style="text-align:left;">{{s.last_name}}</td>
								<td style="text-align:left;">{{s.grade}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-md-8">
					<div style="height:75px;padding-top:30px;padding-bottom:30px;margin-bottom:40px;" class="col-md-4" v-for="reward in rewards">
						<h2 style="text-align:center;">{{reward.name}}</h2>
						<h3 style="text-align:center;">${{reward.price}}</h3>
						<div class="col-xs-5"></div>
						<div class="col-xs-2"><i :class="reward.icon"></i></div>
						<div class="col-xs-5"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MarketPlaceComponent',
	data: function(){
		return {
			students: [
				{
					first_name:"Gertrude",
					last_name:"Goode",
					grade:"7",
					missing_work: false,
				},
				{
					first_name:"Charlie",
					last_name:"Check",
					grade:"7",
					missing_work: false,
				},
				{
					first_name:"Polly",
					last_name:"Pass",
					grade:"7",
					missing_work: false,
				},
				{
					first_name:"Wiley",
					last_name:"Work",
					grade:"7",
					missing_work: true,
				},

			],
			rewards: [
				{
					name: "Lunch outside",
					icon: "fa fa-money fa-align-center fa-2x",
					price: 175
				},
				{
					name: "Gym time",
					icon: "fa fa-money fa-align-center fa-2x",
					price: 175,
				},
				{
					name: "Computer lab",
					icon: "fa fa-money fa-align-center fa-2x",
					price: 175,
				},
				{
					name: "Call home",
					icon: "fa fa-money fa-align-center fa-2x",
					price: 80,
				},

				{
					name: "Pencils/erasers",
					icon: "fa fa-money fa-align-center fa-2x",
					price: 80,
				}
			]
		}
	}
}
</script>