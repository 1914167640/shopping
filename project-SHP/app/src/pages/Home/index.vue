<template>
	<div class="home">
		<!-- 三级联动全局组件 -->
		<typeNav />
		<!-- 列表 -->
		<ListContainer />
		<!-- 今日推荐 -->
		<TodayRecommend />
		<!-- 商品排行 -->
		<Rank />
		<!-- 猜你喜欢 -->
		<Like />
		<!--楼层-->
		<Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
		<!--商标-->
		<Brand />
	</div>
</template>

<script>

import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
	name: "Home",
	components: {
		ListContainer,
		TodayRecommend,
		Rank,
		Like,
		Floor,
		Brand
	} , 
	computed : {
		...mapState({floorList : state => state.home.floorList })
	} , 
	mounted() {
		this.$store.dispatch('getFloorList')
		// this.$store.dispatch('getUserInfo')//App组件挂载时效验token , 全体组件在header获取用户信息
	}
}
</script>

<style></style>