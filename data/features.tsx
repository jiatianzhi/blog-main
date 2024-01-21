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
        Unleash the versatility of Python: From web development to data analysis, discover how Python's simplicity meets sophistication.
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
        Embark on a deep learning journey: Unlock the secrets of AI through our engaging and detailed explorations of neural networks.
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
        Step into the future with 3D Vision: Experience how we bring depth and perception to machines, transforming the digital world.
      </Translate>
    ),
    Svg: OpenSourceSvg,
  },
]

export default FEATURES
