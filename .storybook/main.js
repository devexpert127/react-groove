const webpack = require('webpack')
const path = require('path')
const AliasPlugin = require('enhanced-resolve/lib/AliasPlugin')

const custom = require('../config/webpack.config')(process.env.NODE_ENV || 'development')

module.exports = {
  stories: [
    '../src/components/**/*.stories.js',
    '../src/sections/**/*.stories.js',
    '../src/lib/UploadCareWidget/index.js',
  ],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-docs',
    '@storybook/addon-backgrounds',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
  ],
  webpackFinal: config => {
    /** Add aliases */
    config.resolve.alias = {
      ...config.resolve.alias,
      'Components/BuiltIn': path.join(__dirname, '../src/lib/built-in'),
      'frontend-link': path.join(__dirname, '../src/lib/built-in/Link'),
      'frontend-store': path.join(__dirname, '../src/lib/built-in/store/context'),
      'frontend-head': path.join(__dirname, '../src/lib/built-in/head'),
      'frontend-router': path.join(__dirname, '../src/lib/built-in/router'),
      'frontend-lazy': path.join(__dirname, '../src/lib/built-in/lazy'),
    }

    config.resolve.plugins.push(
      new AliasPlugin(
        'described-resolve',
        [
          {
            name: 'Components',
            alias: [
              path.join(__dirname, '../src/components'),
              path.join(__dirname, '../src/sections'),
            ],
          },
        ],
        'resolve',
      ),
    )

    return config
  },
}
