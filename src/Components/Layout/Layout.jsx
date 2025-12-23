import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {

	return <>

		<Navbar />

		<main style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
			<Outlet></Outlet>
		</main>

		<Footer />

	</>
}
