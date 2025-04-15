import React from "react";

function Footer() {
  return (
    <div className="bg-slate-800 text-white  flex flex-col justify-center items-center  w-full"> 
      <div className="logo font-bold text-white text-2xl m-0 p-0">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">Manager/&gt;</span>
      </div>   
      <div className="flex justify-center items-center">
        Created by Satyam
      </div>
    </div>
  );
}

export default Footer;
