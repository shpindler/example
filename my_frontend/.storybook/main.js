const path = require('path')


module.exports = {
  'stories': [
    '../**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)',
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-jest',
  ],
  webpackFinal: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    config.resolve.extensions = [...config.resolve.extensions, '.scss']

    config.module.rules.push(
      {
        test: /\.module.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true } },
          'sass-loader',
        ],
        include: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.scss$/,
        exclude: /\.module.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
        include: path.resolve(__dirname, '../src'),
      },
    )

    return config
  },
}
