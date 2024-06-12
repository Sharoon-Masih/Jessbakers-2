import React, { Suspense } from 'react'
import Menu from './menu'

const page = ({ searchParams }: { searchParams: { item: string } }) => {
    return (

        <Menu searchParams={searchParams} />

    )
}

export default page