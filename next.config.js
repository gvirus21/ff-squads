/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/community',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['cdn.discordapp.com', 'ffdao.s3.us-east-2.amazonaws.com'],
  },
}
