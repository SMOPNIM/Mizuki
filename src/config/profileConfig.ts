import type { ProfileConfig } from "../types/config";

// 个人资料配置
export const profileConfig: ProfileConfig = {
  avatar: "/images/avatar.webp", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
  name: "SMOPNIM",
  bio: "你的大脑遇到一些问题，需要复活。我们只收集一些死亡原因，然后为你在你的床或已充能的重生锚附近复活。100%已完成",
  typewriter: {
    enable: true, // 启用个人简介打字机效果
    speed: 80, // 打字速度（毫秒）
  },
  links: [
    {
      name: "Bilibili",
      icon: "fa7-brands:bilibili",
      url: "https://space.bilibili.com/699607320",
    },
    // {
    // 	name: "Gitee",
    // 	icon: "mdi:git",
    // 	url: "https://gitee.com/",
    // },
    {
      name: "GitHub",
      icon: "fa7-brands:github",
      url: "https://github.com/SMOPNIM",
    },
    // {
    // 	name: "Codeberg",
    // 	icon: "simple-icons:codeberg",
    // 	url: "https://codeberg.org",
    // },
    // {
    // 	name: "Discord",
    // 	icon: "fa7-brands:discord",
    // 	url: "https://discord.gg",
    // },
  ],
};
