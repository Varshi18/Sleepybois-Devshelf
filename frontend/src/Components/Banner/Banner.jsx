import React from 'react'
import krdc from "/KRDC mask.png"

function Banner() {
  return (
    <>
        <div className="max-w-screen-2x1 container  mx-auto md:px-20 px-6 flex flex-col md:flex-row py-20">
            <div className=" order-1 md:order-2 w-full md:w-1/2 mt:12 md:mt-32">
                <div className="space-y-12"> 
                <h1 className="text-4xl font-bold">Knowledge Resource<span className="text-2xl font-bold"> and</span><span className="text-cyan-400"> Data Center</span></h1>
                <p className="text-xl">
                The collection consists of nearly 4750+ books in various disciplines. These are arranged subject wise. It has also acquired a few ISO standards (International Standards Organization) in digital form. At present, the main motto is to build up the Library collection such that it has information resources up to Ph.D. level, including advanced texts and reference materials.
                </p>
                </div>
            </div>
            <div className=" md:order-1 w-full md:w-1/2 mt:12 md:mt-32">
                <img src={krdc} className="w-100 h-100"/>
            </div>
        </div>    
    </> 
  )
}

export default Banner
