---
title: 'BFC的兄弟——IFC'
description: 'BFC就是给一片区域一个排版的规则、基准（左上角在哪儿，右上角在哪儿......）。给block元素的基准就是BFC，给inline元素的基准就是IFC。'
pubDate: 2021-11-04
categories:
  - '前端'
tags:
  - '前端'
  - 'CSS'
---

BFC就是给一片区域一个排版的规则、基准（左上角在哪儿，右上角在哪儿......）。给`block`元素的基准就是BFC，给`inline`元素的基准就是IFC。

## font-size

一款字体会定义一个`em-square`，它是用来盛放字符的容器（如同活字印刷的模具）。`em-square`通常被设定为宽高均为1000相对单位。一个字有可能会超出模具的宽高，超出`em-square`的部分叫做出血。`font-size`就是`em-square`所相对的尺寸。

每个字母如同在四线格中，字体中x就处于正中间。x的顶部的线叫做`X-Height`，x底部的线叫做`baseline`。`X-Height`上面有一条线叫做`Cap Height`，大写字母的顶部就是基于这条线。`Cap Height`上面紧挨着一条线，叫做`Ascender`，专门放字母上方超出的一点内容。`baseline`下面还有一条线，叫做`Descender`，专门放字母下方超出的一点内容。

包裹字体的元素高度由字体的行高决定，字体的行高不由`font-size`决定，每个字体的设计师都会给出推荐行高。`line-height`也不能决定元素的高度。

## 行盒

内联元素与内联元素，默认以`baseline`对齐。每一行的行盒，是由所有字基线对齐之后得到的高度决定的。

## line-height

`line-height`决定内联元素的真实站位，可用面积（实际使用面积）可能会超过真实站位。当真实站位大于等于`font-size`时，字体会自动居中。

当一行中的多个内联元素使用不止一个字体时，可能存在几个字体的基线高度不一样。为了基线对齐，基线的差距会加到高度中。

`line-height: normal;`中的`normal`值等于字体设计师给的推荐行高。

## vertical-align

`vertical-align`的默认属性是`baseline`。

`vertical-align: top;`是实际占用面积的顶部对齐。

`vertical-align: middle;`用父元素`baseline`高度加上父元素中`X-Height`的一半的高度来对齐当前元素的垂直方向的中点。实际位置的居中对齐，如果字体比较奇葩，文字就不是居中对齐，所以尽量不用`vertical-align: middle;`为好。

## 图片下面的空隙

`img`是`inline-block`元素。即使父容器中只有一个内联元素，这个内联元素同样会与基线对齐，与谁的基线？与一个“隐形”的小写x。`baseline`下面还有`Descender`，所以图片下面总会有空隙。这个空隙多大？不确定，不同的字体空隙不同。

使用`font-size: 0;`可以消除空隙，但是这个方法并不好，因为会导致写的字看不见。可以修改`vertical-align`的属性值，只要不是`baseline`都能消除空隙。

两个内联元素非常难控制让它们对齐，使用`vertical-align`也容易发生不可预见的情况，尽量使用`flex`。
