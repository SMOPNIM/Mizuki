// 设备数据配置文件

export interface Device {
  name: string;
  image: string;
  specs: string;
  description: string;
  link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = Record<string, Device[]> & {
  自定义?: Device[];
};

export const devicesData: DeviceCategory = {
  // OnePlus: [
  // 	{
  // 		name: "OnePlus 13T",
  // 		image: "/images/device/oneplus13t.webp",
  // 		specs: "Gray / 16G + 1TB",
  // 		description: "Flagship performance, Hasselblad imaging, 80W SuperVOOC.",
  // 		link: "https://www.oneplus.com/cn/13t",
  // 	},
  // ],
  // Router: [
  // 	{
  // 		name: "GL-MT3000",
  // 		image: "/images/device/mt3000.webp",
  // 		specs: "1000Mbps / 2.5G",
  // 		description:
  // 			"Portable WiFi 6 router suitable for business trips and home use.",
  // 		link: "https://www.gl-inet.cn/products/gl-mt3000/",
  // 	},
  // ],
  Apple: [
    {
      name: "iPhone XR",
      image: "/images/device/iphonexr.jpg",
      specs: "Black / 128GB",
      description: "A12 仿生，原深感摄像头，无线充电生态。",
      link: "https://www.apple.com.cn/newsroom/2018/09/apple-introduces-iphone-xr/",
    },
  ],
  Dell: [
    {
      name: "Inspiron 5593",
      image: "/images/device/inspiron5593.png",
      specs: "8GB + 512GB",
      description: "十代酷睿，全高清屏，全能接口。",
      link: "https://www.dell.com/support/product-details/zh-cn/product/inspiron-15-5593-laptop/overview",
    },
  ],
};
