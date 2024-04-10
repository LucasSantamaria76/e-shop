import type { Metadata } from 'next';
import './globals.css';
import { poppins } from './fonts';
import { Footer, Navbar } from './components';

export const metadata: Metadata = {
	title: 'E-Shop',
	description: 'Tienda Electronica',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			<body
				className={`${poppins.className} antialiased relative flex flex-col min-h-screen w-full`}>
				<Navbar />
				<main className='flex-grow'>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
