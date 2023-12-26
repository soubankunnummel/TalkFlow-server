/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' }, // Adjust origin(s) as needed
            { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,PATCH,DELETE' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type,Authorization' },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  