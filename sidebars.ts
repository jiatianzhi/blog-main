import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  skill: [
    
    'skill/introduction',
    {
      label: 'PyTorch',
      type: 'category',
      link: {
        type: 'doc',
        id: 'skill/pytorch/test',
      },
      items: [
        'skill/pytorch/test1',
        'skill/pytorch/test2',
        'skill/pytorch/test3',
        'skill/pytorch/test4',
        'skill/pytorch/test5',
      ],
    },
    
  ],
  tools: [
    'tools/introduction',
    'tools/everything-quick-search-local-files',
  ],
  notes: [
    'notes/introduction',
    {
      label: 'PyTorch',
      type: 'category',
      link: {
        type: 'doc',
        id: 'notes/pytorch/test',
      },
      items: [
        'notes/pytorch/test1',
        'notes/pytorch/test2',
        'notes/pytorch/test3',
        'notes/pytorch/test4',
        'notes/pytorch/test5',
      ],
    },
  ],
}

module.exports = sidebars
