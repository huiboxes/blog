---
title: 'PHP 学习之路'
description: '开始世界上最好的语言学习之路(php7)。 以&#x3C;?php 开头?>结尾。 //为单行注释，/**/为多行注释。 变量以$符开头，第一次赋值就是声明这个变量，区分大小写。 常量用const关键字或者define()函数定义。 魔术变量，值会随着代码中的位置改变而改变的变…'
pubDate: 2020-09-10
categories:
  - '后端'
tags:
  - 'PHP'
---

开始世界上最好的语言学习之路(php7)。

## 基础语法

- 以`<?php` 开头`?>`结尾。
- `//`为单行注释，`/**/`为多行注释。
- 变量以`$`符开头，第一次赋值就是声明这个变量，区分大小写。

```php
<?php
// 第一行代码
$first = "hello";
$sec = 'world';
echo "$first $sec";
?>
```

- 常量用`const`关键字或者`define()`函数定义。

```php
define('DATA_URL','0.0.0.0')
/*
可以传入第三个参数，true或者false,表示这个常量要不要区分大小写。因为php有魔术变量，所以最好不要用两个下划线__开头。
常量即使在函数内定义，函数外也可以访问，说明它默认是全局的。
*/
```

- 魔术变量，值会随着代码中的位置改变而改变的**变量**。

```php
__LINE__        表示在代码文件中所处的行数
__FILE__        表示当前脚本文件所处的绝对路径
__DIR__    	 	表示当前脚本文件所处的目录的绝对路径，等价于dirname(__FILE__)
__FUNTION__ 	表示函数被定义时的名字
__CLASS__   	表示该类被定义时的名字
__METHOD__  	表示方法被定义时的名字
__NAMESPACE__   表示当前命名空间的名称
```

- 变量\*\* 作用域 \*\* 分为`local`、`global`、`static`、`parameter`。函数内访问全局变量需要使用`global`关键字。 \*\* 坑 \*\*：

```php
<?php
$x = 5;
$y = 10;

function myTest(){
    global $x,$y;
    $y = $x + $y;
}

// $FLOBALS是一个数组，里面包含所有全局变量
fucntion myTest1(){
    $GLOBALS['y'] = $GLOBALS['x'] + $FLOBALS['y'];
}

myTest();
echo $y;
myTest();
echo $y;
?>
```

上面的例子要说明的是如何引用全局变量，按道理每次打印变量`y`的值都应该不同。在PHP5以下确实是预期的值，但是PHP7不会改变。  
使用`static`关键字可以使变量存储在静态数据区（程序运行期间一直占用着内存空间，内存地址是不变的）。普通变量在函数调用结束后就被释放。  
`parameter`就是指函数声明时形参只能在函数内部使用。

## 数据类型

数据类型包括：

- String

```php
$x = "hello";
$y = 'world';
echo $x . ' ' . $y; // "hello world"
strlen(x);          // 5
strpos($x,'l')      // 从0开始计数所以得2
php中字符串运算符只有 '.'，并置运算符，将两边的字符串连接
```

- Integer

```php
$x = 66;
$y = -66;
// 可以是其它进制 如 $z = 0x8c
```

- Float

```php
$x = 6.66;
// 可以用科学计数法如：$y = 8E-5
```

- Boolean

```php
$x = true;
$y = false;
```

- Array

```php
/*
  数组有三种类型：
  数值数组：数字做键的数组，可以通过array默认创建，也可以直接给变量下标赋值
  关联数组：自定义的键作为键的数组
  多维数组：包含多个数组的数组
*/
$person = array("xiaoming","xiaohong","xiaoli");
echo $person[0]; // "xiaoming"

$Car[0] = 'bec';
var_dump($Car);  // array(1) { [0]=> string(3) "bec" }

/* 关联数组的创建 */
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
$age['Peter']="35";
echo count($Person);  // 3

// 优雅的foreach
foreach ($person as $item => $value){
    echo 'key: ' . $item . ',Value: ' . $value;
    echo '<br>';
}

// 排序函数
sort()	// 升序排序
rsort() // 降序排序
asort() // 根据关联数组的值进行升序排序
ksort() // 根据关联数组的键进行升序排序
arsort() // 根据关联数组的值进行降序排序
krsort() // 根据关联数组的值进行降序排序
```

[很好的例子](https://www.php.cn/php/php-arrays-sort.html)

- Object

```php
class Person{
    var $name;
    var $age;
    function __construct($name="bob",$age=18){
        $this->name = $name;
        $this->age = $age;
        echo "hello , I'm $name,$age years old.";
    }
    function getInfo(){
        echo $this->name, $this->age;
    }
}

$default = new Person();
echo '<br>';
$xiaoming = new Person("小明",20);
echo '<br>';
$xiaoming->getInfo();
/*
按照Java类的方法敲了一遍，发现几个现象：
方法用function声明，方法内用$this获取对象数据。
$this不能使用引号括起来当字符串用。
php7之后构造函数用 __construct 而不是类名相同方法。
php用 '.' 拼接字符串
通过 '实例对象 + -> + 方法' 调用方法。
*/

/*
  php没有方法重载(Overload)，只有覆写(Overwrite)
  `parent::`   +   方法名  可以调用父类被覆盖的方法
*/

// 用trait复用代码
trait Hello {
    public function sayHello() {
        echo 'Hello ';
    }
}

trait World {
    public function sayWorld() {
        echo 'World';
    }
}

class MyHelloWorld {
    use Hello, World;
    public function sayExclamationMark() {
        echo '!';
    }
}

$o = new MyHelloWorld();
$o->sayHello();
$o->sayWorld();
$o->sayExclamationMark();
```

- NULL

### 类型转换

## 运算符

### 普通运算符

```php
$x = 10;
$y = 10;
$x + $y; 	  // 20
$x - $y; 	  // 0
$x * $y; 	  // 100
$x / $y; 	  // 1
$x % 3;  	  // 1
intdiv($x,3); // 3，整除运算符
$x += $y; 	  // $x = $x + $y
$x -= $y;     // $x = $x - $y
$x *= $y;	  // $x = $x * $y
$x /= $y;	  // $x = $x / $y
$x %= $y;	  // $x = $x % $y
$x .= $y;     // 1010，$x和$y被隐式转换成了字符串
++$x;		  // 11
$x++;		  // 11
--$x;		  // 9
$x--;		  // 9
$x == $y;     // ture，是否相等 （echo的话得到得不是Boolean值）
$x === $y;    // ture,绝对等于
$x != $y;     // false,不等于
$x <> $y;     // false,不等于
$x !== $y	  // false，绝对不等于
$x > 9;       // true,大于
$x < 10		  // false，小于
$x >= 9;      // true，大于等于
$x <= 9		  // true,小于等于
```

### 逻辑运算符

| and |  与  |
| :-: | :--: |
| or  |  或  |
| xor | 异或 |
| &&  |  与  |
|  !  |  非  |

> || 表示或，显示不了所以不写在表格里

### 数组运算符

|    运算符     |                        作用                         |
| :-----------: | :-------------------------------------------------: |
|  arr1 + arr2  |                   两个数组的集合                    |
| arr1 == arr2  |         两个数组具有相同的键/值对就返回true         |
| arr1 === arr2 | 两个数组有相同的键/值对，而且顺序类型相同就返回true |
| arr1 != arr2  |                  不相等就返回true                   |
| arr1 <> arr2  |                  不相等就返回true                   |
| arr1 !== arr2 |                绝对不相等就返回true                 |

### 三元运算符

```php
类似if语句
$auth == 'admin' ? 'resolve' : 'reject';;
// 条件满足返回 resolve，不满足返回 resolve
```

### 太空船运算符

```php
1 <=> 2 // -1
1 <=> 1 // 0
2 <=> 1 // 1
```

如果左边的值小于等于或者大于右边的值，它会返回`-1`、`0`、`1`

## 分支和循环

```php
// if语句
if( 条件 ){
	条件满足时执行的语句;
}else if( 条件 ){
	上面的条件不满足时执行的条件
}
else{
	上面的条件不满足时执行的条件
}

// Switch语句
switch($n){
	case 'admin':
    	return 'resolve';
    case 'visit':
    	return 'reject';
    default:
    	return null;
}

// while循环
while( 条件 ){
	要做的事;
}

// do while循环
do{
	要做的事;
}while( 条件 );

// for循环
for( 初始值;条件;增量 ){
	要做的事;
}

// foreach循环
foreach( $arrays as $value ){
	要执行的代码;
}
```

## 超级全局变量

可以在脚本中任何地方使用，php自带的有意义的变量。

```php
$GLOBALS  // 一个数组，所有全局变量都在这里面。$GLOBALS[name] 可以访问到全局变量name的值。

$_SERVER  // 一个数组，由Web服务器创建。包含头信息(header)、路径(path)、以及脚本位置(script locations)等等信息。

$_REQUEST // 一个数组，收集表单提交的数据。
$_POST    // 一个数组，收集表单POST方式提交的POST数据。
$_GET	  // 一个数组，收集表单GET请求的数据。
$_FILE	  // 一个数组，获取上传的文件信息
$_ENV	  // 一个数组，获取系统的环境变量
$_COOKIE  // 一个数组，获取Cookie的
$_SESSION // 一个数组，获取Session的
```

[详细介绍](https://www.php.cn/php/php-superglobals.html)

## 函数

```php
$add = 1;
function 加一(){
    echo $GLOBALS[0] + 1;
    return null;
}
加一();
// 如果有参数，不赋默认值在PHP5会警告，PHP7会报错
```

通过这个例子我发现PHP可以用中文命名，于是我接着尝试用emoji表情命名，一样可以运行。

## 命名空间

个人理解:避免函数、类等重命名的一种解决方案,将某一堆代码从逻辑上划分到一个空间。就相当于windows中的文件夹。

## 结语

懒得写了，因为有其它语言的基础所以直接上手撸框架了。php应用起来并不复杂，动态语言的出生也给它带来了很多优美的写法。现在让我慢慢学基础说实话我不太能静下心来，太枯燥，需要用到什么就去学什么让我更加持久。
