import React from 'react'

export default function LinkPage({content='',to='',isActive='',setActive=null}) {
  return (
    <li onClick={()=> setActive(to)} className={'py-2 transition-all px-2 rounded font-semibold cursor-pointer ' +(isActive == to ? 'bg-purple-700/10' :'hover:bg-purple-700/10')}>
        <h5>{content}</h5>
    </li>
  )
}
