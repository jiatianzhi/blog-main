import WebDeveloperSvg from '@site/static/svg/undraw_professor_re_mj1s.svg'
import SpiderSvg from '@site/static/svg/undraw_connected_world_wuay.svg'
import OpenSourceSvg from '@site/static/svg/undraw_studying_re_deca.svg'
import Translate, { translate } from '@docusaurus/Translate'

export type FeatureItem = {
  title: string
  text: JSX.Element
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.developer',
      message: 'Python',
    }),
    text: (
      <Translate>
        作为一名 TypeScript 全栈工程师，秉着能用 TS 绝不用 JS
        的原则，为项目提供类型安全的保障，提高代码质量和开发效率。
      </Translate>
    ),
    Svg: WebDeveloperSvg,
  },
  {
    title: translate({
      id: 'homepage.feature.spider',
      message: 'Deep Learning',
    }),
    text: (
      <Translate>
        作为一名曾学习与实践逆向工程两年半的开发者，对于逆向工程有着浓厚的兴趣，同时造就了超凡的阅读代码能力。没有看不懂的代码，只有不想看的代码。
      </Translate>
    ),
    Svg: SpiderSvg,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: '3D Vision',
    }),
    text: (
      <Translate>
        作为一名开源爱好者，积极参与开源社区，为开源项目贡献代码，希望有生之年能够构建出一个知名的开源项目。
      </Translate>
    ),
    Svg: OpenSourceSvg,
  },
]

export default FEATURES
