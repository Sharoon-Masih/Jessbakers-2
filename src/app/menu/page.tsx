import React, { Suspense } from 'react'
import Menu from './menu'

const page = ({searchParams}:{searchParams:{item:string}}) => {
  return (
   <Suspense>
    <Menu searchParams={searchParams}/>
   </Suspense>
  )
}

export default page