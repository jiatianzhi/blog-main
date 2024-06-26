import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import { themes } from 'prism-react-renderer'
import { GiscusConfig } from './src/components/Comment'
import social from './data/social'

const beian = '黑ICP备2021004587号-2'
const beian1 = '黑公网安备35021102000847号'

const config: Config = {
  title: 'Tianzhi Jia (贾添植)', //网页标签标题
  url: 'https://jiatianzhi.xyz',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'jiatianzhi',
  projectName: 'blog',
  customFields: {
    bio: 'Keep Learning is All We Need.',
    description:
      '是一个由愧怍创建的个人博客，主要分享编程开发知识和项目，该网站基于 React 驱动的静态网站生成器 Docusaurus 构建。',
  },
  themeConfig: {
    announcementBar: {
      id: 'announcementBar-3',
      content: `Welcome to Tianzhi Jia's Homepage!`,
      backgroundColor: "#2E8555", // Defaults to `#fff`.
      textColor: "#ffffff", // Defaults to `#000`.
    },
    metadata: [
      {
        name: 'keywords',
        content: '愧怍, kuizuo',
      },
      {
        name: 'keywords',
        content: 'blog, javascript, typescript, node, react, vue, web',
      },
      {
        name: 'keywords',
        content: '编程爱好者, Web开发者, 写过爬虫, 学过逆向, 现在主攻ts全栈',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: 'TIANZHI JIA (贾添植)',
      logo: {
        alt: '愧怍',
        src: 'img/logo.webp',
        srcDark: 'img/logo.webp',
      },
      hideOnScroll: false,
      items: [
        {
          label: 'Notes',
          position: 'right',
          to: 'docs/notes',
          items: [
            { label: 'Skills', to: 'docs/skills' },
            { label: 'Tools', to: 'docs/tools' },
          ],
        },
        {
          label: 'Blogs',
          position: 'right',
          to: 'blog',
          items: [
            { label: 'Archive', to: 'blog/archive' },
          ],
        },
        {
          label: 'Projects',
          position: 'right',
          to: 'projects',
        },
        {
          label: 'More',
          position: 'right',
          items: [
            { label: 'About Me', to: '/about' },
            { label: 'Friends', to: 'friends' },
            { label: 'Links', to: 'links' },
          ],
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'left',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Study',
          items: [
            { label: 'Notes', to: 'docs/notes' },
            { label: 'Blogs', to: 'blog' },
            { label: 'Archive', to: 'blog/archive' },
            { label: 'Projects', to: 'projects' },
          ],
        },
        {
          title: 'Social Media',
          items: [
            { label: 'GitHub', href: social.github.href },
            { label: 'Zhihu', href: social.zhihu.href },
            { label: 'Bilibili', href: social.bilibili.href },
            { label: 'Weibo', href: social.weibo.href },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'About Me', to: '/about' },
            { label: 'Friends', position: 'right', to: 'friends' },
            { label: 'Links', position: 'right', to: 'links' },
            {
              html: `
                <a href="https://docusaurus.io/zh-CN/" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                <a/>
                `,
            },
          ],
        },
      ],
      copyright: `
        <p style="margin-bottom: 0;"><a href="http://beian.miit.gov.cn/">${beian}</a></p>
        <p style="display: inline-flex; align-items: center;"><img style="height:20px;margin-right: 0.5rem;" src="/img/police.png" alt="police" height="20"/><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${beian1.match(
          /\d+/,
        )?.[0]}" >${beian1}</a></p>
        <p>Copyright © 2024 Tianzhi Jia Built with Docusaurus.</p>
        `,
    },
    // algolia: {
    //   appId: '',
    //   apiKey: '',
    //   indexName: '',
    // },
    prism: {
      theme: themes.oneLight,
      darkTheme: themes.oneDark,
      additionalLanguages: [
        'bash',
        'json',
        'java',
        'python',
        'php',
        'graphql',
        'rust',
        'toml',
        'protobuf',
      ],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    giscus: {
      repo: 'kuizuo/blog',
      repoId: 'MDEwOlJlcG9zaXRvcnkzOTc2MjU2MTI=',
      category: 'General',
      categoryId: 'DIC_kwDOF7NJDM4CPK95',
      theme: 'light',
      darkTheme: 'dark_dimmed',
    } satisfies Partial<GiscusConfig>,
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    liveCodeBlock: { playgroundPosition: 'top' },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.scss'],
        },
        sitemap: {
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-S4SD5NXWXF',
          anonymizeIP: true,
        },
        debug: process.env.NODE_ENV === 'development',
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    'docusaurus-plugin-image-zoom',
    'docusaurus-plugin-sass',
    '@docusaurus/plugin-ideal-image',
    ['docusaurus-plugin-baidu-tongji', { token: 'c9a3849aa75f9c4a4e65f846cd1a5155' }],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: process.env.NODE_ENV === 'development',
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#2e8555' },
        ],
      },
    ],
    [
      './src/plugin/plugin-content-blog', // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        path: 'blog',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/kuizuo/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: "--·--",
        blogSidebarCount: 10,
        blogSidebarTitle: 'Blogs',
        postsPerPage: 10,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: '愧怍',
          copyright: `Copyright © ${new Date().getFullYear()} 愧怍 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      },
    ],
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: '愧怍的个人博客',
      },
    },
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en', 
      'zh-CN'
    ],
    localeConfigs: {
      en: {
        htmlLang: 'zh-CN',
      },
    },
  },
}

export default config
