import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'Vite & Vue powered static site generator.',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Examples', link: '/en/examples/markdown-examples', activeMatch: '/examples/' },
      { text: 'Test', link: '/en/test-file/test-file', activeMatch: '/test-file/' }
    ],

    sidebar: {
      '/en/examples/': {
        base: '/en/examples/',
        items: [
          {
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: 'markdown-examples' },
              { text: 'Runtime API Examples', link: 'api-examples' },
            ]
          },
        ]
      },
      '/en/test-file/': {
        base: '/en/test-file/',
        items: [
          {
            text: 'Test',
            items: [
              { text: 'test-file', link: 'test-file' },
              { text: 'test', link: 'test' }
            ]
          },
        ]
      },
    },
  }
})
