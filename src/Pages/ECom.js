

import React, { useState ,useContext,useEffect} from 'react'
import Layout from '../Layout/Layout'
import '../styles/EComPage.scss'
import { useLocation } from "react-router-dom";
import Organization from '../components/MissingPage/Organization'
import ECom from '../components/ECom/ECom'
import { PermissionContext } from '../Context';
function EComPage() {
    const { setBreadCrumbProps,breadCrumbSet } = useContext(PermissionContext);
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
