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
          label: 'Live-System',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Frontend',
              to: '/docs/frontend/intro',
            },
            {
              label: 'Backend',
              to: '/docs/backend/intro',
            },
          ],
        },
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
  } satisfies Preset.ThemeConfig,
};

export default config;