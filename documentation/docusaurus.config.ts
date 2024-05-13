import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'StudyModules',
  tagline: 'Manage modules and their details',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://studymodules-docs.tobi.win',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'StudyModules',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'frontendSidebar',
          position: 'left',
          label: 'Frontend',
        },
        {
          type: 'docSidebar',
          sidebarId: 'backendSidebar',
          position: 'left',
          label: 'Backend',
        },
        {
          href: 'https://studymodules.tobi.win/',
          label: 'Live-Frontend',
          position: 'right',
        },
        {
          href: 'https://studymodules.tobii.uber.space/api',
          label: 'Live-Backend',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Repositories',
          items: [
            {
              label: 'Frontend & Documentation',
              href: 'https://github.com/MrToWy/StudyModules-Frontend',
            },
            {
              label: 'Backend',
              href: 'https://gitlab.gwdg.de/lernanwendungen/studybase',
            },
            {
              label: 'Bachelors Thesis',
              href: 'https://github.com/MrToWy/Bachelorarbeit',
            },
          ],
        },
        {
          title: 'Misc',
          items: [
            {
              label: 'Impressum',
              href: 'http://www.tobias.wylega.de/Impressum.html',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tobias Wylega. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'FIAE3FBDNK',

      // Public API key: it is safe to commit it
      apiKey: '87b1f9f02a3b6d6222591efa471f0a73',

      indexName: 'studymodules-tobi',

      // Optional: see doc section below
      contextualSearch: false,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: false,

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      //... other Algolia params
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
