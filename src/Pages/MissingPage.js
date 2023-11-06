import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import '../styles/MissingPage.scss'
import data from './ORGdata.json'

import Organization from '../components/MissingPage/Organization'
import { useMemo } from 'react'
import { MissingPageContext } from '../Context'
function MissingPage() {

    const [orgdata,setorgdata]=useState(data)
    const OrganizationData=useMemo(()=>{
        return {orgdata,setorgdata}
    },[orgdata,setorgdata])

    return (
        <>
            <MissingPageContext.Provider value={OrganizationData}>
                <Layout >
                    <div className='MissingPageMainDiv'>
                    <Organization />
                    </div>
                </Layout >
            </MissingPageContext.Provider>
        </>

    )
}

export default MissingPage
