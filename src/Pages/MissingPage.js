import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import '../styles/MissingPage.scss'
import data from './ORGdata.json'

import Organization from '../components/MissingPage/Organization'
import { useMemo } from 'react'
import { MissingPageContext } from '../Context'
function MissingPage() {

    const [orgdata, setorgdata] = useState(data)
    const [singleorg, setsingleorg] = useState([])
    const [Allmember, setAllMember] = useState([])
    const OrganizationData = useMemo(() => {
        return { orgdata, setorgdata, singleorg, setsingleorg, Allmember, setAllMember }
    }, [orgdata, setorgdata, singleorg, setsingleorg, Allmember, setAllMember])

    return (
        <>
            <Layout >
                <MissingPageContext.Provider value={OrganizationData}>
                    <div className='MissingPageMainDiv'>
                        <Organization />
                    </div>
                </MissingPageContext.Provider>
            </Layout >
        </>

    )
}

export default MissingPage
