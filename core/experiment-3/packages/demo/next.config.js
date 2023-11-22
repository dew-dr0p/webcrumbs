/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    // specify remotes
    remote: `admin@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
}

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'demo',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(isServer),
        exposes: {
          // Host app also can expose modules
          './index': './pages/index'
        }
      })
    );

    return config;
  },
}

module.exports = nextConfig
