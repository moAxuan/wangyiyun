<template>
	<div class="container_liebiao">
		<meHeader></meHeader>
		<me-body></me-body>
	</div>
  
</template>

<script>

import meHeader from './me/Header';
import meBody from './me/Body';
export default {
  name: 'app',
  components: {
    meHeader,
		meBody
	},
}
</script>

<style scoped >
.container_liebiao {
	background:black;
	height:100vh;
	overflow: hidden;
}
</style>
