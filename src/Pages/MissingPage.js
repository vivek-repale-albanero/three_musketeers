import React, { useEffect, useState,useContext } from 'react'
import { useLocation } from "react-router-dom";
import Layout from '../Layout/Layout'
import '../styles/MissingPage.scss'
import data from './ORGdata.json'

import Organization from '../components/MissingPage/Organization'
import { useMemo } from 'react'
import { MissingPageContext, PermissionContext } from '../Context'
import { OrgContextRequest } from '../api/api'
function MissingPage() {
    const { setBreadCrumbProps,breadCrumbSet } = useContext(PermissionContext);

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
    const location = useLocation();

    useEffect(()=>{
      const loc = breadCrumbSet(location)
     const pathName = location.pathname.split("/").filter((path) => path);
    if(pathName.length > 1){
      setBreadCrumbProps({navLinks:[...loc.navprev],activeLink:{name:loc.end}})
    }else{
           setBreadCrumbProps({navLinks:[],activeLink:{name:loc.end}})
    }
  },[location])
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
