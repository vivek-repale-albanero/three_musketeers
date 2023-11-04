import React from 'react'
import Layout from '../Layout/Layout'
import '../styles/Missing.scss'
import data from './ORGdata.json'
import Organization from '../components/MissingPage/Organization'
function MissingPage() {
    // console.log(data)
    return (
        <>
            <Layout />
            <div className='MissingPageMainDiv'>
                <Organization />
            </div>
            <Layout />
        </>

    )
}

export default MissingPage
