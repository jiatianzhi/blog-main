import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  skills: [
    
    'skills/introduction',
    {
      label: 'PyTorch',
      type: 'category',
      link: {
        type: 'doc',
        id: 'skills/pytorch/test',
      },
      items: [
        'skills/pytorch/test1',
        'skills/pytorch/test2',
        'skills/pytorch/test3',
        'skills/pytorch/test4',
        'skills/pytorch/test5',
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
