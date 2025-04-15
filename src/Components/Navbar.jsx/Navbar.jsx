import React from 'react';

function Navbar() {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">   
          <span className="text-green-500">&lt;</span> 
          <span>Pass</span><span className="text-green-500">Manager/&gt;</span>
        </div>
        
        <button className='text-white bg-color-500 my-5 rounded-md flex  justify-center'>
          <img className='invert w-10 py-1 ' src="/icons/github.png" alt="github logo" />
          <span className='font-bold px-2 py-3'>GitHub</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;  
