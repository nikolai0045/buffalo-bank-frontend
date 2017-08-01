<template>
	<div id="wrapper">
		<router-view name="header"></router-view>
		<router-view name="content"></router-view>
		<router-view name="footer"></router-view>
	</div>
</template>

<script>
export default {
  name: 'registrationLayoutComponent',
}
</script>