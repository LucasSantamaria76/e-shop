import type { Config } from 'tailwindcss';
const flowbite = require('flowbite-react/tailwind');

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		// Path to Tremor module
		'./node_modules/flowbite-react/lib/**/*.js',
		'./public/**/*.html',
		flowbite.content(),
	],
	theme: {
		extend: {},
	},

	plugins: [require('flowbite/plugin'), flowbite.plugin()],
};

export default config;
