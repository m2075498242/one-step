<template>
	<div>
		<div style="margin-bottom: 16px">
			<a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start"> Reload </a-button>
			<span style="margin-left: 8px">
				<template v-if="hasSelected">
					{{ `Selected ${selectedRowKeys.length} items` }}
				</template>
			</span>
		</div>
		<a-table :rowClassName="(record, index) => (index % 2 === 1 ? 'newRowStyle' : ``)"
			:row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="columns"
			:data-source="data" />
	</div>
</template>
<script lang="ts">

import { computed, defineComponent, reactive, toRefs } from 'vue';
// 新样式函数
const newStyle = (record, index): string => {
	console.log(record, index);

	return 'newRowStyle' // 返回到行样式
}
interface DataType {
	key: string | number;
	name: string;
	age: number;
	address: string;
}

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
	},
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
	data.push({
		key: i,
		name: `Edward King ${i}`,
		age: 32,
		address: `London, Park Lane no. ${i}`,
	});
}

export default defineComponent({
	setup() {
		const state = reactive<{
			selectedRowKeys: Array<string | number>;
			loading: boolean;
		}>({
			selectedRowKeys: [], // Check here to configure the default column
			loading: false,
		});
		const hasSelected = computed(() => state.selectedRowKeys.length > 0);

		const start = () => {
			state.loading = true;
			// ajax request after empty completing
			setTimeout(() => {
				state.loading = false;
				state.selectedRowKeys = [];
			}, 1000);
		};
		const onSelectChange = (selectedRowKeys: Array<string | number>) => {
			console.log('selectedRowKeys changed: ', selectedRowKeys);
			state.selectedRowKeys = selectedRowKeys;
		};

		return {
			data,
			columns,
			hasSelected,
			...toRefs(state),

			// func
			start,
			onSelectChange,
			newStyle,
		};
	},
});
</script>
<style scoped lang="scss">
::v-deep .newRowStyle {
	background-color: orange;
}
</style>
