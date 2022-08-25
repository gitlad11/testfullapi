/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
///Configure proxy in next js, other way is to add proxy : http://site.com in package json
module.exports = {
  async rewrites() {
      return [
        {
          source: '/*',
          destination: 'http://api.vrmarketing.guru',
        },
      ]
    },
};

module.exports = nextConfig
