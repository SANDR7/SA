/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://www.github.com/SANDR7',
        permanent: false,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/sander-van-ast/",
        permanent: false,
      },
      {
        source: '/cv',
        destination: 'https://cdn.sanity.io/files/pglct6t7/production/aaaf80fadcb0ada28f1ace442f92f3e3d2480edd.pdf',
        permanent: false,
      }
    ]
  },
};

module.exports = nextConfig
