import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-[100vw] bg-violet-800 text-white flex justify-between py-3 rounded-b-sm font-semibold'>
        <div className="logo ml-6">iTask</div>
        <div className="menu flex gap-10 mr-10">
            <p className='cursor-pointer hover:font-bold'>Home</p>
            <p className='cursor-pointer hover:font-bold'>Tasks</p>
        </div>
    </nav>
  )
}

export default Navbar