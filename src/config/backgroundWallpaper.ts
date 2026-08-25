import type { FullscreenWallpaperConfig } from "../types/config";

export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
	enable: true,
	src: {
		desktop: [
			"/images/desktop-banner/1.webp",
			"/images/desktop-banner/2.webp",
			"/images/desktop-banner/3.webp",
			"/images/desktop-banner/4.webp",
			"/images/desktop-banner/5.webp",
			"/images/desktop-banner/6.webp",
			// "/images/desktop-banner/7.webp",
			"/images/desktop-banner/8.webp",
			"/images/desktop-banner/9.webp",
			"/images/desktop-banner/10.webp",
			"/images/desktop-banner/11.webp",
			"/images/desktop-banner/12.webp",
			"/images/desktop-banner/13.webp",
			"/images/desktop-banner/14.webp",
			"/images/desktop-banner/15.webp",
		], // 与横幅共用同一套自定义图集（覆盖/全屏模式）
		mobile: [
			"/images/mobile-banner/1.webp",
			"/images/mobile-banner/2.webp",
			"/images/mobile-banner/3.webp",
			"/images/mobile-banner/4.webp",
			"/images/mobile-banner/5.webp",
			"/images/mobile-banner/6.webp",
			// "/images/mobile-banner/7.webp",
			"/images/mobile-banner/8.webp",
			"/images/mobile-banner/9.webp",
			"/images/mobile-banner/10.webp",
			"/images/mobile-banner/11.webp",
			"/images/mobile-banner/12.webp",
			"/images/mobile-banner/13.webp",
			"/images/mobile-banner/14.webp",
		],
	},
	position: "center",
	carousel: {
		enable: true,
		interval: 5,
	},
	zIndex: -1,
	opacity: 0.8,
	blur: 1,
	switchable: true,
	overlay: {
		opacity: 0.8, // 壁纸不透明度，0-1
		blur: 1.5, // 背景模糊半径（px）
		cardOpacity: 0.8, // 卡片不透明度，0-1
		switchable: {
			opacity: true,
			blur: true,
			cardOpacity: true,
		},
	},
	fullscreen: {
		switchable: {
			opacity: true,
			blur: true,
		},
	},
};
