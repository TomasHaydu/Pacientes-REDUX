import React from 'react'

const Alert = ({children}) => {
  return (
    <div
    className='bg-red-300 hover:bg-red-400 rounded-sm text-center md:w-1/3 mt-1 mx-auto'
    >
        {children}
    </div>
  )
}

export default Alert