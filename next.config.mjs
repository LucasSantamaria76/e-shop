/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'https',
				hostname: 'colegiocei.es',
			},
			{
				protocol: 'https',
				hostname: 'upload.wikimedia.org',
			},
		],
	},
}

export default nextConfig;
