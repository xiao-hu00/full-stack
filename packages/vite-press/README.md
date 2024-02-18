## 关于项目

前端入门比较简单，网上也有不少入门资料和技术栈学习路线，但是大部分都没有结合真实的项目、一步一步从搭建环境到部署到生产，也有不少英语教程，不过对于中文母语者而言，从英语直译过来的文档看着自然没有国人自己写的教程好。

本项目将结合多年的前端开发经验，展示一个前端项目如何从零到发布，体验真实工作中的前端开发流程。

## 适合哪些人

- 想转行进入前端开发的人
- 前端入门或者初级开发者
- 有意进入此行的在校学生

## 完全零基础开始

对于毫无经验的朋友，建议先了解一遍最基础的概念，不需要完全理解透彻，只要有个大概的印象即可，在后续的开发中会经常涉及到基础概念，到时候回头再看能更好的理解。

具体需要了解的基础知识：
- [HTML基础教程](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML)
- [CSS基础教程](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/First_steps/What_is_CSS)
- [JavaScript基础教程](https://zh.javascript.info/intro)

## 开发

话不多说，直接开干。

假设我们现在是刚入职的前端开发人员，需要从零开始开发一个前端项目，并且没有老项目的架构可供参考。

### 第一步，搭建环境

首先安装`node`，[点击](https://nodejs.org/en)去下载，选择对应的系统下载`20.0+`的版本，傻瓜式安装。

[node是什么?](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/Introduction)

`node`是一个`JavaScript`运行时环境，`JavaScript`主要在浏览器上运行，但是有了`node`我们就可以在浏览器之外运行`JavaScript`代码了。

实际上来说，即使没有`node`我们也可以进行前端开发，但是这样效率太低（无法使用一些先进的工具），有的功能也很难实现（比如代码混淆压缩），使用`node`可以方便的进行前端工程化工作，可以利用社区的各种开源工具库，就目前而言，前端开发离不开`node`。

安装完`node`之后，我们需要安装`IDE`（[集成开发环境](https://aws.amazon.com/cn/what-is/ide/)），直接选`vs code`就行，开源免费，操作友好。[点击](https://code.visualstudio.com/Download)下载`vs code`。

有了本地的`node`环境和`IDE`，我们就可以开始干活了。

### 第二步，构建项目

我们是用[Vite](https://cn.vitejs.dev/guide/why.html)来构建项目，`Vite`是目前社区最流行的构建工具。
所谓构建工具，就是帮我们搭建好一个基础的框架，我们直接在这个基础上添加业务代码和其他功能库。

然后，我们需要选择一个前端框架，目前前端三大框架`React`、`Vue`、`Angular`，依然是大家主要的选择方向，在国内来说，`Vue`使用者更多，`React`大厂使用多，`Angular`相对而言使用者少了很多，还有其他一些后起之秀，比如`Solid`、`Svelte`等等，我们直接选择React就行，因为它背靠大厂（`facebook`），社区十分活跃，周边生态也是最丰富，基本开发中所有的功能都有现成的轮子，而且学会`React`之后在学其他的上手也更快。



