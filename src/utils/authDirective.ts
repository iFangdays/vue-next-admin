import type { App } from 'vue';
// 导入仓库中用户信息
import { useUserInfo } from '/@/stores/userInfo';
// 判断两组 数组字符串 是否相同
import { judementSameArr } from '/@/utils/arrayOperation';

/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * @directive 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
 * @directive 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
 */
export function authDirective(app: App) {
	// 单个权限验证（v-auth="xxx"）
	app.directive('auth', {
		mounted(el, binding) {
			// 获取当前用户信息
			const stores = useUserInfo();
			// 判断用户信息数组中 是否包含 绑定的权限字符串值   如果不包含 则从 当前元素父节点 中 移除当前元素el
			if (!stores.userInfos.authBtnList.some((v: string) => v === binding.value)) el.parentNode.removeChild(el);
		},
	});
	// 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
	app.directive('auths', {
		mounted(el, binding) {
			// 假设不满足权限
			let flag = false;
			const stores = useUserInfo();
			// 遍历用户权限数组 如果 绑定权限数组值 和 用户权限相同  则把 假设flag值改为 true
			stores.userInfos.authBtnList.map((val: string) => {
				binding.value.map((v: string) => {
					if (val === v) flag = true;
				});
			});
			if (!flag) el.parentNode.removeChild(el);
		},
	});
	// 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
	app.directive('auth-all', {
		mounted(el, binding) {
			const stores = useUserInfo();
			const flag = judementSameArr(binding.value, stores.userInfos.authBtnList);
			if (!flag) el.parentNode.removeChild(el);
		},
	});
}
