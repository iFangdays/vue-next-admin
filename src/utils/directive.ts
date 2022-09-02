import type { App } from 'vue';
// 导入用户权限指令
import { authDirective } from '/@/utils/authDirective';
// 导入按钮波浪指令 和 自定义拖拽指令
import { wavesDirective, dragDirective } from '/@/utils/customDirective';

/**
 * 导出指令方法：v-xxx
 * @methods authDirective 用户权限指令，用法：v-auth
 * @methods wavesDirective 按钮波浪指令，用法：v-waves
 * @methods dragDirective 自定义拖动指令，用法：v-drag
 */
export function directive(app: App) {
	// 用户权限指令
	authDirective(app);
	// 按钮波浪指令
	wavesDirective(app);
	// 自定义拖动指令
	dragDirective(app);
}
