import React from 'react'

function Cards({item}) {
    
  return (
    <>
    <div className="mt-4 my-3 p-3">
        <div className="card bg-base-100 w-92 shadow-xl">
            <figure>
                <img class="w-full object-cover py-1" src={item.image}
                 alt="books" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                {item.title}</h2>
    <p>{item.description}</p>
         <div className="card-actions justify-between">
         <div className="badge badge-outline">{item.count}</div>
         <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-cyan-400 hover:text-white">Issue</div>
         </div>
     </div>
    </div>
</div>
    </>
  )
}

export default Cards
