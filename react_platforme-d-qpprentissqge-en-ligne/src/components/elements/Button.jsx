import React from 'react'


export default function Button({content=null,children,classes=null}) {
  return (
    <button className={'border-3 cursor-pointer border-purple-700 text-white text-lg font-semibold bg-gray-900 dark:bg-white dark:text-gray-900 rounded-md px-4 py-1 '+ classes}>
        {content}
        {children}
    </button>
  )
}