import React from 'react'

export default function Header({title='',par=''}) {
  return (
    <div className="grid place-items-center gap-2 py-4 mb-4 border-b-1 border-purple-700">
        <h1 className="text-2xl">{title}</h1>
        <p className="text-gray-700 dark:text-gray-400 text-center">
          {par}
        </p>
      </div>
  )
}
