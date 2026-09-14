---
title: 'UE4学习笔记——地形&光照&打包'
description: '选择 Modes 下的 landscape，场景中会出现绿色的面积。 灰度图的使用 灰度图导入到 PS 后，修改图像模式为 灰度，并设置为......'
pubDate: 2022-07-29
categories:
  - '游戏开发'
tags:
  - 'Unreal Engine'
---

## 地形工具

选择 `Modes` 下的 `landscape`，场景中会出现绿色的面积。

- 灰度图的使用
  - 灰度图导入到 `PS` 后，修改图像模式为 `灰度`，并设置为 `16位灰度`。
  - 虚幻只支持 `png` 与 `raw` ，所以导出时要注意格式。
- 植被工具
  - 选择 `Modes` 下的 `Foliage`。
  - 将素材拖入到 `Foliage Type` 框内。
  - `Density / 1Kuu` 为刷一次的密度。
  - `Scale X` 设置最大、最小的大小。
  - `Align to Normal` 可以修改物体是否自动对齐法线。
  - `Instance Settings` — `Colision Persets` 为植被添加碰撞检测。

## 光照

- 光源种类
  - 定向光源 `Directional Light` ，模拟太阳光。
  - 点光源 `Point Light` ，类似灯泡，一个点向各个方向发出光照。为了性能考虑，在虚幻引擎中点光源被简化成从空间的一个点均匀的向各个方形发射光。
  - 聚集光源 `Point Light` ，圆锥型的光。
  - 矩形光源 `Rect Light` ，朝一面发光，性能开销大，通常用来模拟显示器发出的光照效果。
  - 天空光源 `Sky Light` ，范围型，全局照亮的效果。
- 灯光的移动性
  - 实时光照
    - 可移动的，完全实时动态的，渲染速度慢。
  - 预构建光照
    - 静态和固定，构建完成后挪动物体，阴影不会跟着移动。
    - 静态与固定的共同点在于都要预先构建。
    - 静态与固定的不同点在于性能上静态更节省性能。固定构建完成后，修改选项后是实时反应出来的。
    - 固定的光照，可以对移动的物体产生阴影，静态的不会产生。
- 自动曝光
  - 可以模拟人眼对光照亮度变化的反应（在黑的地方待久了到亮的地方觉得特别亮，在亮的地方待久了觉得黑的地方特别黑）。
  - `Settings` - `Project Setting` - `Rendering` - `Auto Exposure` 设置是否开启自动曝光。
- 指数级高度雾
  - `place Actors` - `Visual Effects` - `Exponential Height Fog` ，拖动到场景中，远处就会有很远的雾的感觉。

## 光束效果的实现（丁达尔效应）

- `Light Source` - `Light Shafts`。
  - `Light Shaft Occlusion` 。当物体被光线遮挡时，发生变化。
  - `Occlusion Mask Dark` ，数值越高，遮挡的效果越明显。
  - `Light Shaft Bloom`，开启后，看向太阳时，太阳的周围会呈放射性的模糊。
- 通过体积雾创造光束（体积雾的性能开销比较大）
  - `Exponential Height Fog` 的细节面板中，开启 `Volumetric Fog` 。
  - `Light Source` - `Light` - `Volumetric Scattering Intensity`，调高。

## 系统默认天空球使用 `Sky Sphere`

- 当旋转光源（ `Light Source` ）后，点击 `Sky Sphere` - `Details` - `Default` - `Refresh Material`。可以刷新天空状态。
- `Default`
- `Directional Light Actor` 绑定天空球对应的光源。如果没有绑定对应光源，旋转光源后天空不会改变。
- `Colors Determined By Sun Position`，如果没勾选，天空球不会根据光源角度实时更新天空状态。
- `Sun Brightness` 修改太阳亮度。
- `Cloud Speed` 修改云的速度。
- `Cloud Opacity` 修改云的透明度。
- `Stars Brightness` 修改星星的亮度。
- `Override Settings`
  - 如果是根据平行光设置角度的（ `Default` 中绑定了光源），则不能更改。因为平行光的位置是固定的，要改就改光源的位置。
  - `Sun Height` 太阳的高度。
  - `Horizon Falloff` 地平线的衰减值。值越大则被地平线越接近一条线，越小则地平线越高切不明显。
  - `Zenith Color` 天空的颜色。
  - `Cloud Color` 云的颜色。
  - `Overall Color` 全部的颜色。

## 获得角色控制权

- 第一种方式
  - 在 `Content Browser` 中将角色拖入到场景中。
  - 点击角色后输入 `possess` - `Auto Possess Player` - `Player 0`。
  - 点击播放。
- 第二种方式
  - 与第一种方式冲突，所以需要先删除第一种。
  - `Window` - `World Settings` - `Game Mode` - `GameMode Override` 设置为 `ThirdPersonGameMode`。
  - `Place Actors` - `Basic` - `Player Start` 拖入到场景中。
  - 场景中如果有多个 `Player Start`，则角色会随机在某个点出生。

## 打包

- 要点
  - 确定好要操控的角色和生成位置。
  - 设置默认加载的管卡和游戏模式。
- 流程
  - `Edit` - `Project Settings` - `Maps & Modes`。
  - `Default GameMode` - `Selected GameMode` 设置默认游戏模式。
  - `Default Maps` 设置默认地图。
  - 安装`Visual Studio`，安装 `Windows平台开发`、`使用C++的移动开发`、`使用C++的游戏开发`。
  - `File` - `Package Project`，选择要打到什么系统运行的包。
  - `Package Project` - `Build Configuration` 中有两项：
    - `Developoment` 开发版，能够继续进行测试、调试的包。
    - `Shipping` 发行版，准备上线的包。会比开发版的包小。因为开发版包含调试、测试的工具。
