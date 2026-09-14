---
title: 'UE4学习笔记——操作基础&画刷工具'
description: '很多资源可能依赖多个其它资源。在静态网格体编辑器中将一个材质分配给静态网格体资源，那么静态网格体会引用该材质。意味着当加载静态网格体资源时，还需要加载引用的材质。相应地，材质也将......'
pubDate: 2022-07-29
categories:
  - '游戏开发'
tags:
  - 'Unreal Engine'
---

## 引擎操作基础

- 切换默认缓存路径
  - D:\\game\\epicGame\\UE\_4.27\\Engine\\Config
  - \[InstalledDerivedDataBackendGraph\]
  - 我的没找到`Path`路径，根据现象猜测不安装在C盘则默认路径为`"%GAMEDIR%DerivedDataCache`
- 创建项目
- 编辑界面
- 移动视口
- 坐标轴
- 移动物体
- 多选物体 `ctrl` + `alt` + `mouse left`
- 复制物体 选中物体后按住 `alt` 拖动

## 导入资源

### 资源类型

| 资源类型                           | 文件扩展名                | 应用程序           |
| ---------------------------------- | ------------------------- | ------------------ |
| 三维模型、骨架网格体结构、动画数据 | .fbx、.obj                | Maya、             |
| 3ds Max、ZBrush                    |
| 纹理和图片                         | .bmp、.jpeg、.pex、.png、 |
| .psd、.tga、.hdr                   | Photoshop                 |
| 字体                               | .otf、.ttf                | BitFontMark2       |
| 音频                               | .wav                      | Audacity、Audition |
| 视频和多媒体                       | .wmc                      | After Effects、    |
| Media Encoder                      |
| PhysX                              | .apb、.apx                | Apex PhysX Lab     |
| 其它                               | .csv                      | Excel              |

### 导入方式

- 导入按钮
- 拖动文件到 `Content Browser`

### 引用查看器

很多资源可能依赖多个其它资源。在静态网格体编辑器中将一个材质分配给静态网格体资源，那么静态网格体会引用该材质。意味着当加载静态网格体资源时，还需要加载引用的材质。相应地，材质也将加载材质编辑器中引用地纹理。

点击要查看地资源，`mouse right` 选中 `Refrence Viewer` 。

### 项目迁移

- 整个项目迁移
  - 删除 `intermediate` 、 `Saved` 后，压缩文件带走。
  - 引擎支持向下兼容，高版本引擎可以打开低版本项目；低版本引擎不可打开高版本项目。
- 迁移部分资源
  - 选中文件后 `mouse right` ，选中 `Migrate` 。
  - 选中需要迁移的文件。
  - 选择迁移目的地文件夹，迁移到另一个项目的 `Content` 文件夹下。
  - 选择多个文件夹没有 `Migrate` 选项；选择多个文件后 `Common` - `Assets Actions` - `Migrate...` 。

## 常用插件

- `Datasmith`
  - 多种软件的文件都可以通过它导入
- `Maya LiveLink`
  - `Maya` 与 `ue` 同步

## 模型

### 常见模型格式

- `FBX` 和 `obj` 格式的共同点 。
  - 都是三维通用模型格式，都支持三个点以上对的面，可以用在几乎所有主流三维软件中。
- `FBX` 格式和 `obj` 格式大致区别。
  - `FBX` 中包含动画、材质特性、贴图、骨骼动画、灯光、摄像机等信息。
  - `OBJ` 中不包含动画、材质特性、贴图路径、动力学、粒子等信息。
- `abc`
  - 蒸馏机。支持动画、粒子等。bake三维场景的模型、流体、动画、特效等数据。

### 模型类别

- 静态网格体
  - 静态的
- 骨架网格体
  - 有动画的
  - 导入模型时可以自动生成骨骼

## Datasmith

与传统 `fbx` 工作流的区别。

- 传统：
  - 在对应软件中将模型导出为 `fbx` ，在 `ue` 中导入。
  - 建模软件材质的算法不会跟随 `fbx` 导入到 `ue` 中。
- `datasmith`
  - 在其它建模软件中做好的效果、算法能转换为 `ue` 中材质节点的算法。这样两个软件中看到的效果差距不会非常大。
  - 导入模型的坐标轴，以模型自身的轴区域点为坐标轴。

4.24以上的 `ue` 已将 `datasmith` 插件内置到虚幻引擎中了。

## BSP 画刷工具

拖入场景的几何体就是 ·Brush\` ，用来简单搭建场景。

- 挖空型默认无法减去比它后添加的物体，但是 `Brush Settings` 中修改排序后就可以减去。
- 通过 `R` 键用鼠标拉伸，材质也会被拉伸。在 `Brush Settings` 中修改数值，不会被拉伸。
- `Hollow` 控制中空或者实心。
- `Wall Thickness` 控制厚度。
- `Solidity` 控制固体型，默认是固体的。
  - 固体
    - 画刷的默认类型
    - 阻挡游戏中的玩家和射弹。
    - 可以是添加型或挖空型。
    - 在周围画刷中创建 `BSP` 分割。
  - 半固体
    - 可以放置在关卡中且不会对周围的世界几何体创建 `BSP` 分割的碰撞画刷。
    - 阻挡玩家和射弹，与固体画刷一样。
    - 只可以是添加型。
    - 不会再周围画刷中创建 `BSP` 分割。
  - 非固体
    - 非固体画刷指的是在周围世界几何体中也不会创建 `BSP` 分割的非碰撞画刷。它们具有可视化的效果，但是使用任何方式都无法与它们互动。它们具有以下属性：
      - 不会阻挡玩家或射弹、
      - 只可以是添加型。
      - 不会再周围画刷中创建 `BSP` 分割。
- 选中材质后拖动到几何体上即可给它赋予材质。
- 选中物体后，`Details` - `Geometry` - `Select` - `Select Macting Brush` 可以选择全部的面。
- `Geometry` - `Alignment` 可以设置材质纹理的对齐方式。
  - `Brush Editing` 模式常用工具
    - `Extrude` 挤压。
    - `Flip` 翻转。
    - `Split` 分割。
    - `Triangulate` 三角化。
    - `Optimize` 优化。
    - `Turn` 翻转。
    - `Weld` 融合。
- 选中多个 `Brush` - `Details` - `Brush Settings` - `Create Static Mesh`，将多个 `Brush` 整合为一个静态网格体。
- 使静态网格体可以设置 `Simulate Physics`，需要先双击资源，找到 `Collision`，添加碰撞。
- 在`World outline` 中选中多个静态网格体后，选择 `Window` - `Developer Tools` - `Merge Actors` 可以合并 `Actor` ，这样所有的模型都包含在了一个合并后的静态网格体内。
