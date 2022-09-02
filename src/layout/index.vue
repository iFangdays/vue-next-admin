<template>
	<component :is="themeConfig.layout" />
</template>

<script lang="ts">
import { onBeforeMount, onUnmounted, getCurrentInstance, defineComponent, defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Local } from '/@/utils/storage';

export default defineComponent({
	name: 'layout',
	components: {
		defaults: defineAsyncComponent(() => import('/@/layout/main/defaults.vue')),
		classic: defineAsyncComponent(() => import('/@/layout/main/classic.vue')),
		transverse: defineAsyncComponent(() => import('/@/layout/main/transverse.vue')),
		columns: defineAsyncComponent(() => import('/@/layout/main/columns.vue')),
	},
	setup() {
		// 获取当前示例 类似vue2中的 this
		const { proxy } = <any>getCurrentInstance();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		// 窗口大小改变时(适配移动端)
		const onLayoutResize = () => {
			if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout);
			// 获取body的可视宽度
			const clientWidth = document.body.clientWidth;
			if (clientWidth < 1000) {
				// 默认不开启菜单水平折叠效果
				themeConfig.value.isCollapse = false;
				proxy.mittBus.emit('layoutMobileResize', {
					layout: 'defaults',
					clientWidth,
				});
			} else {
				proxy.mittBus.emit('layoutMobileResize', {
					layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
					clientWidth,
				});
			}
		};
		// 页面加载前
		onBeforeMount(() => {
			onLayoutResize();
			window.addEventListener('resize', onLayoutResize);
		});
		// 页面卸载时
		onUnmounted(() => {
			window.removeEventListener('resize', onLayoutResize);
		});
		return {
			themeConfig,
		};
	},
});
</script>
