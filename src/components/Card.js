import React from 'react'

function Card({children}) {
  return (
    <div className='flex flex-col shadow-lg w-[200px] h-[300px] flex-grow flex-wrap items-center p-2 m-3 rounded-lg'>
      {children}
    </div>
  )
}

export default Card
