import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-4 px-8 bg-green-300 shadow-md'>
        <h2 className='text-2xl font-bold text-gray-800'> Saas Innova</h2>
        <div className='flex gap-6 items-center font-semibold text-gray-700'>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </div>
    </div>
  )
}

export default Navbar