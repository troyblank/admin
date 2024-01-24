/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
    ignoreDuringBuilds: true,
  },
	webpack: (config) => {
		config.resolve.fallback = { fs: false };
		return config;
	}
};

module.exports = nextConfig;
