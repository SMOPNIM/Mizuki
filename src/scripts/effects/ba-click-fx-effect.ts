/**
 * BA Click FX 特效模块
 * 管理蔚蓝档案风格点击特效与光标拖尾的初始化
 *
 * 特效库通过动态导入按需加载；实例的全屏覆盖层挂在 body 上，
 * 可在 Swup 页面切换间持续存在，无需随导航重建。
 */

import type { BAClickFxConfig } from "../../types/config";
import {
	getStoredBaClickFxColor,
	getStoredBaClickFxEnabled,
} from "../../utils/setting-utils";

type BAClickFxModule = typeof import("ba-click-fx");

export class BAClickFxEffectHandler {
	private instance: import("ba-click-fx").BAClickFX | null = null;
	private module: BAClickFxModule | null = null;
	private config: BAClickFxConfig | null = null;
	/** 记录期望状态，处理异步加载期间的快速开关切换 */
	private desiredEnabled = false;

	/**
	 * 初始化 BA Click FX 特效
	 */
	init(widgetConfigs: any): void {
		const baClickFxConfig: BAClickFxConfig | undefined =
			widgetConfigs?.baClickFx;
		if (!baClickFxConfig || !baClickFxConfig.enable) {
			return;
		}

		this.config = baClickFxConfig;

		if (!(window as any).__baClickFxToggleListenerAdded) {
			(window as any).__baClickFxToggleListenerAdded = true;
			window.addEventListener("baclickfx-toggle", (e: Event) => {
				const detail = (e as CustomEvent).detail;
				void this.sync(!!detail?.enabled);
			});
			window.addEventListener("baclickfx-color-change", (e: Event) => {
				const detail = (e as CustomEvent).detail;
				if (this.instance && detail?.color) {
					this.instance.setThemeColor(detail.color);
				}
			});
		}

		void this.sync(getStoredBaClickFxEnabled());
	}

	/**
	 * 同步特效实例与启用状态
	 */
	private async sync(enabled: boolean): Promise<void> {
		this.desiredEnabled = enabled;

		if (!enabled) {
			this.destroyInstance();
			return;
		}
		if (this.instance || !this.config) {
			return;
		}

		if (!this.module) {
			try {
				this.module = await import("ba-click-fx");
			} catch (error) {
				console.error("BAClickFX: 特效库加载失败", error);
				return;
			}
		}

		// 加载期间状态可能已变化，重新确认
		if (!this.desiredEnabled || this.instance) {
			return;
		}

		try {
			this.instance = new this.module.BAClickFX({
				scale: this.config.scale ?? 1,
				opacity: this.config.opacity ?? 1,
				themeColor: getStoredBaClickFxColor(),
				clickEnabled: this.config.clickEnabled ?? true,
				trailEnabled: this.config.trailEnabled ?? true,
				trailAlways: this.config.trailAlways ?? false,
			});
		} catch (error) {
			console.error("BAClickFX: 特效初始化失败", error);
			this.instance = null;
		}
	}

	private destroyInstance(): void {
		if (!this.instance) {
			return;
		}
		try {
			this.instance.destroy();
		} catch (error) {
			console.warn("BAClickFX: 销毁实例时出现异常", error);
		}
		this.instance = null;
	}
}

// 创建全局实例
let globalBAClickFxEffectHandler: BAClickFxEffectHandler | null = null;

/**
 * 获取全局 BA Click FX 特效处理器实例
 */
export function getBAClickFxEffectHandler(): BAClickFxEffectHandler {
	if (!globalBAClickFxEffectHandler) {
		globalBAClickFxEffectHandler = new BAClickFxEffectHandler();
	}
	return globalBAClickFxEffectHandler;
}

/**
 * 初始化 BA Click FX 特效（便捷函数）
 */
export function setupBAClickFx(widgetConfigs: any): void {
	getBAClickFxEffectHandler().init(widgetConfigs);
}

/**
 * 设置 BA Click FX 初始化的 DOM 监听
 */
export function setupBAClickFxOnDOMReady(widgetConfigs: any): void {
	const handler = getBAClickFxEffectHandler();

	const init = () => {
		handler.init(widgetConfigs);
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
}
