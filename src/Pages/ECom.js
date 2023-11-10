

import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import '../styles/EComPage.scss'

import Organization from '../components/MissingPage/Organization'
import ECom from '../components/ECom/ECom'
function EComPage() {

    console.log('Ecompage')
    return (
        <>
                <Layout >

            <div className='EComPage'>
                <ECom/>
            </div>

                </Layout >
        </>

    )
}

export default EComPage
