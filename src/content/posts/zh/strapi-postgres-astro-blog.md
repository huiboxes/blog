---
title: '使用 Strapi + PostgreSQL + Astro 快速构建博客'
description: '本文将介绍我博客搭建的过程，使用 PostgreSQL作为数据库，Strapi 快速构建 Api ， Astro作为前端支撑。即使你不熟悉这些技术，通过本文也可以照着做出一个博客。'
pubDate: 2022-08-28
categories:
  - '前端'
tags:
  - '前端'
  - 'JavaScript'
---

本文将介绍我博客搭建的过程，使用 `PostgreSQL`作为数据库，`Strapi` 快速构建 `Api` ， `Astro`作为前端支撑。即使你不熟悉这些技术，通过本文也可以照着做出一个博客。通过本文你可以了解如下知识点：

- 如何较为快速的搭建出一个带后台编辑的博客系统
- 掌握 `docker` 最基础的操作（不包含 `docker` 安装教程。当然，可以跳过这部分）。
- 了解 `PostgreSQL` （开源数据库）的部署、建表、建用户、权限（可跳过）。
- 了解 `Navicat` （图形化关系型数据库操作工具）基本使用（可跳过）。
- 了解如何快速通过 `Astro`（性能极好的前端框架）搭建博客。
- 掌握使用 `Strapi`（ `Handless CMS`，类似于 `word press` ，不过我没用过 `word press` ，不太确定） 基础使用。

本文代码已上传到 `GitHub` [github.com/huiboxes/bl…](https://github.com/huiboxes/blog-demo)。

## 后端

### 安装并配置 `PostgreSQL`

这一步是可以省略的，因为 `Strapi` 默认用的 `SQLite`，对于小体量的博客肯定是够的。不过需要你本机安装有 `Python 2.x` 的环境。如果你时间充裕，还是建议用 `PostgreSQL` 或者 `MySQL`。

#### 安装

拉取镜像：

```shell
docker pull postgres
```

创建容器：

```ini
docker run --name blog-postgres-db -e TZ=PRC -e POSTGRES_USER=root -e POSTGRES_DB=database -e POSTGRES_PASSWORD='GUsM$u6jX!ngk' -p 3996:5432 -v pgdata:/mydata/postgresql/data -d postgres
```

说明下这段命令的含义：

- `run` ，创建并运行一个容器（粗暴理解成是一个专门跑那个应用的独立服务器就行）。
- `--name blog-postgres-db` ，容器名称设置为 `blog-postgres-db`。
- `-e TZ=PRC` ，时区设置为中国（默认为 `UTC` ，可能会存在时差）。
- `-e POSTGRES_USER=root` ，将默认用户的用户名改为 `root` （默认用户名为 `postgres`）。
- `-e POSTGRES_DB=database` ，`DB` 模式为数据库模式。
- `-e POSTGRES_PASSWORD='GUsM$u6jX!ngk'` ，密码设置为 `GUsM$u6jX!ngk`。
- `-p 3996:5432`，容器内端口是 `5432` ， 映射到本机的 `3996` （后面直接访问本机的 `3996` 端口即可连接 `PostgreSQL` 服务）。
- `-v pgdata:/mydata/postgresql/data` ，数据存储到本机的 `pgdata:/mydata/postgresql/data`目录。
- `-d` ，后台运行。

#### 配置

此部分参考了阮一峰老师的 [《PostgreSQL新手入门》](https://www.ruanyifeng.com/blog/2013/12/getting_started_with_postgresql.html)。但是我是通过`navicat` 测试能够连接后直接就用 `Navicat` 敲命令了。 首先打开 `Navicat`，如下图操作：

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/1.webp)

接着会弹出一个窗口，如下填写，没有通过服务器部署的就填写本机 `localhost`。

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/2.webp)

连接成功后新建查询，依次之下下面的命令：

```sql
-- 创建 用户名为 "blog_dba" 的用户，设置密码为 "GUsM$u6jX!ngk"
CREATE USER blog_dba WITH PASSWORD 'GUsM$u6jX!ngk';

-- 创建 名为 "blog_cms" 的数据库，并指定所有者为 "blog_dba"。
CREATE DATABASE blog_cms OWNER blog_dba;

-- 将 "blog_cms" 数据库的所有权限都赋予 "blog_dba"，否则 "blog_dba" 只能登录控制台，没有任何数据库操作权限
GRANT ALL PRIVILEGES ON DATABASE blog_cms to blog_dba;
```

下面是在 `Navicat` 操作的方法。

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/3.webp)

### Strapi 构建

#### 初始化

```shell
# 创建项目 , 项目名为blog_postgre，随便你取什么名字
npx create-strapi-app@4.3.2 blog_postgre
```

写这篇文章时 `Strapi` 最新版本是 `4.3.6`。但是最新版本初始化时存在问题（`error: Unknown dialect undefined`），网上看到出现同样问题的人是降级到 `4.3.2` 解决的。尽管不确定，但是我认为这可能就是版本问题导致。接下来就会让你选择，如下图中配置即可：

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/4.webp)

```shell
# 成功后打开文件夹并运行项目
cd blog_postgre
# 运行项目，我第一件事是在package.json的script选项中将 develop 改成了 dev，为了方便
yarn develop
```

此时，你可能会报下列错误：

![8N%RSAX\`57WT\_YFVDM$H5.png](../../../assets/images/posts/strapi-postgres-astro-blog/5.webp)

出现上图中的错误，可以选择将项目目录中 `config/database.ts` 的 `ssl: env.bool('DATABASE_SSL', true)` 这一行的 `true` 改为 `false`（当然，这会造成安全隐患，不过这很方便）。

重新启动项目后将是下面的界面：

![A3U@\_X}6MHURI\_ZUKHB4@EM.png](../../../assets/images/posts/strapi-postgres-astro-blog/6.webp)

#### 创建 `Collection`。

你可以把它当作是一种数据库中数据表的映射，跟着下面的流程走，你的思路将组件清晰。在 `Content-Type Build`中创建 `Collection`。

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/7.webp)

##### 创建 `Category` ，存放分类

只需要在 `Display name` 中如下输入：

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/8.webp)

添加 点击 `Continue` 后，在新的页面选择 `Text`，表明创建一个文本型的字段。这里叫做 `name` ，表示分类名称。

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/9.webp)

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/10.webp)

点击 `Finish` 后就创建成功了，点击 `Add another field` 将添加分类表的其它字段。下图是在新弹出的界面中选择 `UID` 添加一个 `slug` 字段，每个分类都有一个独一无二的 `slug`。

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/11.webp)

最后点击 `Finish` 后点击 `Save` 保存刚刚的操作。 ![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/12.webp)。

##### 创建 `Post` ，存放文章

首先创建关系（前面创建 `Post` 这个 `Collection` 的步骤没有放上来）： ![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/13.webp) 选择 `Relation` 类型，输入 `categories` ，因为一个文章可以有多个类型，每个类型可以对应多个文章（多对多），所以是如下的创建方式：

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/14.webp)

其它字段根据下图中的类型和字段名自行创建（后面会解释每个字段的含义）：

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/15.webp)

#### 编辑文章

根据下图步骤操作：

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/16.webp)

一个精美的文档编辑页面呈现在眼前，编辑完内容后点击 `Save` 保存内容，然后 `Publish` 将文章发布出去：

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/17.webp)

复制几份，方便后面调前端页面： ![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/18.webp)

下图为我创建的数据，注意要是 `Published` 状态，并且 `slug` 字段的值一定要修改。

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/19.webp)

#### 开放获取 `Post` 数据的权限

首先如下图进入对应界面：

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/20.webp)

找到 `Post` 后如下图设置，主要要点击 `Save` 保存。 ![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/21.webp)

为了保证 `Category` 的数据也能展示，将它也如 `Post` 般设置。

### 接口使用方法

使用接口测试工具或者直接使用浏览器，访问 `http://localhost:1337/api/posts` ，如下图所示（我装了浏览器插件所以会数据更好看清楚）：

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/22.webp)

就是如此方便，一个获取文章的接口就好了，后面直接渲染到前端就行。走到这一步时，回头看看现在所拥有的吧！此时，已完成如下功能：

- 账号管理、权限设置功能。
- 一个存储文章的表（创建 `Collection` 并保存后将自动生成，不信你看看数据库中的表）。
- 一个存储文章分类的表。
- 拥有文章以及文章分类的增删改查的接口（详细的请[点我查看](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#endpoints)，建议先看完本文后再看）。

但是如果留心观察，你会发现存在两个现象：

1.  创建 `Post` 这个 `Collection` 时，不是创建过一个 `Image` 类型的 `Cover` （用来存放文章的封面图）字段吗？它为什么没有在这儿显示？
2.  创建 `Post` 时，创建了一个 `categories` 的 `Relation` 表示与文章关联的 `Category` 中的数据，为什么也没有显示呢（编辑文章时我是选择了分类的，所以数据应该返回这个字段）？

如果你使用的 `Strapi` 版本是 `v3.x` 的，那么不会存在这个现象。浏览很久以前的 `Strapi` 文档都不会提及，因为它们那个版本都是直接返回全部信息的。在 `v4.x` 版本，默认不返回媒体文件或关系等类型数据。我在官方文档中找到了[答案](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.html#relation-media-field)（但是建议先跟着文章走完流程再看） 。

当使用 `/api/posts?populate=*` 时，会发现所有数据都展示了。就目前的配置来说，与使用 `http://localhost:1337/api/posts?populate[0]=categories&populate[1]=cover` 的效果是一样的。通过观察变化，可以猜出需要什么 `Imgae` 或者 `Relation` 类型的数据就在 `url` 拼接 `&populate[序号]=要查的字段名`（请看问本文后带着疑问看上面给出的 “ 答案 ” ）。

### Strapi 部署

部署流程如下：

1.  代码上传到服务器。
2.  安装依赖。
3.  安装pm2。
4.  在项目根目录创建 `server.js`，内容如下：

```js
// 项目根目录，与 src 同级
const strapi = require('@strapi/strapi');
strapi.compile().then((appContext) => strapi(appContext).start());

// 如果使用的 TypeScript ，在本文使用的版本 4.3.2 ，生产环境会报错。
// 必须使用本文这种写法才能正常部署。
// 2022年8月30日时在 github issues 上看到的解决方案，5天前给出的解决方案。
```

5.  `pm2 start server.js`

## 前端搭建

### 克隆项目

接下来的前端制作将基于一个开源的模板来做，你如果拥有 `Svelte` 基础，后面就可以自己改更多想改的地方，不会也没关系，跟着本文走也能搭建一个博客。同样的，如果你更喜欢用`Vue`、`React` 或者 `Angular` ，也可以找其它基于它们的模板，`Astro` 都支持！首先拉取代码：

```shell
# 拉取代码
git clone git@github.com:Charca/astro-blog-template.git
# 修改 clone 下来的目录文件名，不修改也行，随便你
mv astro-blog-template/ blog_frontend
# 打开目录并安装依赖  此处可以不用 && ，&& 左右的内容分两行写。 也可以直接图形化界面用鼠标操作
cd blog_frontend && yarn  # 如果没有yarn ，使用 npm install 来安装依赖
```

依赖安装完成后，使用 `yarn dev` 或者 `npm run dev`，项目即可运行。如果想初步了解 `Astro` ，可以[点击此处](https://juejin.cn/post/7134899224985993230)（本站一位大佬写的，简洁明了）。

### 将博客的文章数据源换为从接口获取

找到 `src/pages/blog/index.astro` 文件，观看源码可以得知，之前文章是获取本地文件夹里的内容渲染的，这样书写以及发布文章都比较麻烦。结合 `Strapi` 就可以非常方便的管理文章。

#### 获取所有文章数据

在 `.astro` 文件中，获取数据的操作是在顶部 `---` 包裹的范围内进行的。所以获取接口数据的代码如下：

```ts
// src/pages/blog/index.astro

---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = 'Blog';
const description = 'Latest articles.';
const permalink = `${Astro.site.href}blog`;


/* 以前的代码，注释掉
 * let allPosts = await Astro.glob('../../data/blog-posts/*.md');
 *
 * allPosts = allPosts.sort((a, b) => new Date(b.frontmatter.publishDate).valueOf() - new Date(a.frontmatter.publishDate).valueOf());
 */

// 获取数据
const fetchPosts = await fetch("http://localhost:1337/api/posts?populate[0]=categories&populate[1]=cover").then(res => res.json())
---
```

#### 将获取的数据渲染到博客列表页

继续修改 `src/pages/blog/index.astro` 文件，将内容通过 `map` 渲染到页面，这里不进行任何封装，只为尽快做出效果。整个`src/pages/blog/index.astro` 文件内容如下：

```ts
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = 'Blog';
const description = 'Latest articles.';
const permalink = `${Astro.site.href}blog`;

let allPosts = await Astro.glob('../../data/blog-posts/*.md');

const fetchPosts = await fetch("http://localhost:1337/api/posts?populate[0]=categories&populate[1]=cover").then(res => res.json())

---

<BaseLayout title={title} description={description} permalink={permalink} current="blog">
  <div class="container">
    <h1>Blog</h1>
    {fetchPosts.data.map((post, index) => {
      const href = `/blog/${post.attributes.slug}`;
      return (
        <div>
          { index !== 0 && <hr /> }
          <div class="post-item">


            <div style="display: flex;">
              <div class="left">
                <img src={ 'http://localhost:1337' + post.attributes.cover.data.attributes.url } alt="">
              </div>
              <div class="right">
                <h2>
              <a href={href}>{post.attributes.title}</a>
            </h2>
            <p>{post.attributes.excerpt}</p>
            <div class="post-item-footer">
              <span class="post-item-date">
                — {post.attributes.publishedAt}
                — {post.attributes.categories.data.map(category=>category.attributes.name + " ")}
                </span>
            </div>
              </div>
            </div>

          </div>
        </div>
      )
    })}
  </div>
</BaseLayout>

<style>
  h2,
  .post-item-footer {
    font-family: var(--font-family-sans);
    font-weight: 700;
  }

  .post-item-date {
    color: var(--text-secondary);
    text-align: left;
    text-transform: uppercase;
    margin-right: 16px;
  }

  hr {
    margin: 60px auto;
  }
</style>


```

此时，博客列表的内容就是动态的了。

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/23.webp)

#### 点击文章查看文章详细内容

`src/pages/blog/index.astro` 文件中，可以看到渲染 `title` 的地方使用的超链接，链接的地址是 `/blog/${post.attributes.slug}`。在页面中点击时，会抛出 `404` ，毕竟这个路由（路径、地址或者说是URL）并没有与之对应的内容。现在想要的效果是，点击标题，跳转到 `/blog/文章的slug` ，然后新的页面中显示这个 `slug` 对应的文章（前面约定好了，`slug` 是唯一不重复的，当然也可以用文章的 `id` 作为路径，随便你）。这样做的目的是可以保证能够生成唯一的路径，对应唯一的文章。

如何让某个路径返回内容呢？在 `src/pages` 目录下，创建一个 `.astro` 文件，这里面渲染啥，这个路由就能看到啥，就是一个文件对应一个路由，不需要额外的配置。这么多文章，不可能每个文章都去写个 `slug.astro`（前面约定路由路径为 `文章的slug`，所以创建的文件名应该是 `文章的slug.astro`）。动态匹配可以做到只写一个文件，可以匹配多个路由，动态匹配的文件名为 `[随便一个名字].astro`。

下面开始修改 `[slug].astro` 的代码，实现动态匹配。首先找到 `getStaticPaths` 函数，观察原来的代码，`return` 前和 `src/pages/blog/index.astro` 最开始部分一样是获取所有文章。那么也直接将自己新增的通过 `fetch` 获取的数据替换过来。接着看向 `return` ，依然是如此眼熟。照葫芦画瓢改就行了，下面是修改后的 `[slug].astro` 全部内容：

```ts
---
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await Astro.glob('../../data/blog-posts/*.md');

  const fetchPosts = await fetch("http://localhost:1337/api/posts?populate[0]=categories&populate[1]=cover").then(res => res.json())

  // 这里 return 的东西，可以在下面接收到
  return fetchPosts.data.map(post => ({
    params: { slug: post.attributes.slug },
    props: { post: post },
  }));
}

const { title, content, slug, excerpt, publishedAt } = Astro.props.post.attributes; // 这里对应 getStaticPaths 中的 return
const permalink = `${Astro.site.href}${slug}`;
---

<BaseLayout title={title} description={excerpt} permalink={permalink} current="blog">
  <header>
    <p>{publishedAt}</p>
    <h1>{title}</h1>
    <hr />
  </header>
  <div class="container">
    <article class="content">
      {
        content
      }
    </article>
    <hr />
  </div>
</BaseLayout>

<style>
  header {
    text-align: center;
  }

  header h1 {
    margin-bottom: 0.7em;
  }

  header p {
    color: var(--text-secondary);
    text-transform: uppercase;
    font-family: var(--font-family-sans);
    font-weight: 600;
  }

  header hr {
    min-width: 100px;
    width: 30%;
  }
</style>
```

此时，你会发现通过 `/blog/文章的slug` 就可以访问 `slug` 所对应的文章内容了，也就是说，在博客列表页点击标题后会跳转到对应的内容。

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/24.webp)

但是仔细观察可以看到，这不对啊，我 `markdown` 标签怎么也直接出来了，这可不行。于是有了下面解析 `markdown` 的步骤：

1.  安装依赖：

> yarn add @astropub/md

2.  引入依赖：

```ts
// src/pages/blog/[slug].astro
---

import BaseLayout from '../../layouts/BaseLayout.astro';
import { markdown } from '@astropub/md'

......
---

```

3.  修改渲染方式：

```ts
// src/pages/blog/[slug].astro

- <article class="content">
-       {
-         content
-       }
- </article>


+ <article class="content">
+       { async () => await markdown(content) }
+ </article>
```

好了，`markdown` 已经渲染到页面，看看效果吧：

![image.png](../../../assets/images/posts/strapi-postgres-astro-blog/25.webp)

至此，大功告成，一个博客完成。接着你可以自己修改样式，改成自己想要的样子。也可以再创建一个 `Collection` 存放评论，为博客加上评论功能。后面可能会继续更新，拭目以待吧。
