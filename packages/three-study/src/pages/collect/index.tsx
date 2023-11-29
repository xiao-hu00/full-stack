import React, { useState } from 'react'
import './index.css'
import {
  Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import classnames from 'classnames'

const list = [
  {
    title: 'react-three-fiber',
    description: 'React函数式组件调用Threejs，该开源组织还有其他库可以配合进行web 3D开发',
    url: 'https://docs.pmnd.rs/react-three-fiber/getting-started/introduction',
    github: 'https://github.com/pmndrs/react-three-fiber',
  },
  {
    title: '函数可视化',
    description: 'shader 方面的大佬出品，可多个函数同时显示，可随时间变化',
    url: 'https://graphtoy.com/',
  },
  {
    title: 'desmos-图形计算器',
    description: '图形化描述函数，可视化函数图形，方便理解3D相关的造型函数',
    url: 'https://www.desmos.com/calculator?lang=zh-CN',
  },
  {
    title: 'toolfk-转换工具',
    description: '图形化描述函数',
    url: 'https://www.toolfk.com/online-plotter-frame',
  },
  {
    title: 'd3js-可视化绘图库',
    description: '高性能的绘图基础库',
    url: 'https://d3js.org/getting-started',
    github: 'https://github.com/d3/d3',
  },
  {
    title: '图片转 cube 纹理',
    description: 'Image converter from spherical map to cubemap',
    url: 'https://matheowis.github.io/HDRI-to-CubeMap/',
    github: 'https://github.com/matheowis/HDRI-to-CubeMap',
  },
  {
    title: 'book of shaders',
    description: 'shader 入门书籍',
    url: 'https://thebookofshaders.com/',
  },
  {
    title: '3D开发需要的一些资源，纹理贴图、模型',
    description: 'Make better renders, faster - Textures, Models and HDRIs for 3D rendering',
    url: 'https://www.poliigon.com/',
  },
  {
    title: '3D开发，基于物理渲染的纹理贴图',
    description: 'Free seamless PBR textures with Diffuse, Normal, Displacement, Occlusion and Roughness Maps.',
    url: 'https://3dtextures.me/',
  },
  {
    title: 'Poly Haven-3D模型',
    description: 'Poly Haven是一个为视觉特效艺术家和游戏设计师策划的公共资产库，以易于获取的方式提供好用的高质量3D资产。无付费专区、帐户或电子邮件表格，直接下载资产后随意使用。这里的所有资产都是CC0 的，这意味着它们几乎没有版权，您可以将它们用于任何用途。',
    url: 'https://polyhaven.com/all',
  },
]
const otherList = [
  {
    title: '格式转换-视频、音频、文档、图片',
    description: 'File conversion made easy',
    url: 'https://www.zamzar.com/',
  },
  {
    title: 'waifu2x-无损放大图片',
    description: '程序使用卷积神经网络对动漫风格的图片进行放大操作（支持照片）',
    url: 'https://waifu2x.udp.jp/index.zh-CN.html',
  },
  {
    title: '谷歌字典在线查词',
    description: '谷歌詞典--Google字典，涵盖牛津词典、柯林斯高阶词典等55本词书',
    url: 'https://gdictchinese.freecollocation.com/',
  },
  {
    title: 'deepl-翻译',
    description: '据说：全世界最准确的翻译',
    url: 'https://www.deepl.com/translator',
  },
  {
    title: '钢琴-五线谱',
    description: '国际乐谱库，分享世界上处于公有领域的音乐',
    url: 'https://cn.imslp.org/wiki/Main_Page',
  },
  {
    title: '图形学相关教程',
    description: '计算机图形学与混合现实在线平台 - 各路大佬都有课程，免费',
    url: 'https://games-cn.org/',
  },
]

const allDataList = [list, otherList, [], []]
const Component: React.FC = () => {
  const menuList = [
    {
      title: '收藏夹的网站',
      children: [
        { title: '3D开发推荐库和资料', active: true },
        { title: '其他', active: false },
      ]
    },
    {
      title: '文字总结',
      children: [
        { title: '前端学习', active: false },
        { title: '22222', active: false },
      ]
    },
  ]
  const [dataList, setDataList] = useState(list)
  const [navList, setNavList] = useState<any>(menuList)
  const goWebsite = (url: string) => {
    window.open(url)
  }
  // index 外层菜单的index， i: children的index
  const setData = (index: number, i: number) => {
    // 循环，到点击的index时，position停止自增，position + i 就是点击的菜单在list里的位置，获取对应的数据
    let d = 0
    let position = 0
    while (d < index) {
      d++
      position += menuList[index].children.length
    }
    const list = menuList.map((item: any, m: number) => {
      if (m === index) {
        item.children.forEach((child: any, n: number) => {
          if (n === i) {
            child.active = true
          } else {
            child.active = false
          }
        })
      } else {
        item.children.forEach((child: any) => {
          child.active = false
        })
      }
      return item
    })
    setNavList(list)
    const data = allDataList[position + i]
    setDataList(data)
  }
  return (
    <div className='flex'>
      <div className='w-[250px] box-border h-[calc(100vh-3rem)] overflow-auto'>
        <div className='p-6'>
          {navList.map((item: any, index: number) => (
            <div key={index}>
              <div className='text-slate-400 mb-4 pl-4 h-10 border-b border-slate-10'>{item.title}</div>
              {item.children.map((child: any, i: number) => (
                <div
                  key={i}
                  className={
                    `cursor-pointer rounded-md mb-4 flex items-center h-10 pl-4 text-slate-500  ease-in duration-200 hover:bg-indigo-50 ${classnames({'bg-indigo-50 text-slate-700' : child.active})}`
                  }
                  onClick={() => setData(index, i)}
                >
                  {child.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className='flex-1 bg-slate-50 border-l border-slate-10'>
        <div className='p-4 grid lg:grid-cols-3 md:grid-cols-2 gap-4 sm:grid-cols-1'>
          {dataList.map((item, index: number) => {
            const act = item.github ? <Button key="info" onClick={() => goWebsite(item.github)}>github</Button> : null
            const doc = <Button key="link" onClick={() => goWebsite(item.url)}>跳转</Button>
            return (
              <Card className='bg-white flex flex-col justify-between' key={index}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  {doc}
                  {act}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Component
