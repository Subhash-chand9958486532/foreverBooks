import Header from './header';
import Footer from './Footer';
import { Context } from './componets/store';
import { useContext, useReducer, useState } from 'react';
export default function Layout({ children }) {
	const { userData } = useContext(Context);
	if (userData.isLogin) {
		// setTimeout(() => {
		// 	window.location.href="/cart"
		// }, 1000)
	}
	return (
		<>
			<Header />
			<main>
				{children}
			</main>
			<Footer />
		</>
	);
}