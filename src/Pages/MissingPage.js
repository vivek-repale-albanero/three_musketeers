import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import '../styles/MissingPage.scss'
import data from './ORGdata.json'

import Organization from '../components/MissingPage/Organization'
import { useMemo } from 'react'
import { MissingPageContext } from '../Context'
import { OrgContextRequest } from '../api/api'
function MissingPage() {

    const [orgdata, setorgdata] = useState(data)
    const [singleorg, setsingleorg] = useState([])
    const [Allmember, setAllMember] = useState([])

    const FetchContextOrgDetails = async()=>{

        const{response, error} = await OrgContextRequest()
    
        if(response.statusText=="OK"){
            setorgdata(response?.data)
        }else{
            console.log("error",error)
        }

    }

    console.log(orgdata,"response data")

    useEffect(()=>{
        FetchContextOrgDetails()
    },[])
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
