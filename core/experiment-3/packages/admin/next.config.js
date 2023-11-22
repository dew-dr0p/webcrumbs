/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf');

const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'admin',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './adminPanel': './pages/index',
          './widget': './webcrumbs/Widget'
        },
        shared: {
          // whatever else
        },
      }),
    );
    return config;
  },
  reactStrictMode: true,
}

module.exports = nextConfig
