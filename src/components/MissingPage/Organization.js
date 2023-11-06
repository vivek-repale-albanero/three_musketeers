import React, { useContext, useState } from 'react'




import Data from '../../Pages/ORGdata.json'
import { MissingPageContext } from '../../Context'
import AddButton from './AddButton'
import BasicModal from './MissingModal'
import OrganizationTable from './OrganizationTable'
import { Container } from '@material-ui/core'
import BreadCrumb from '../Breadcrumbs/BreadCrumb'


// "Bangal,"Bihar","Telangana","Maharashtra"
function Organization() {
    const { orgdata, setorgdata } = useContext(MissingPageContext)
    console.log(orgdata)
    return (
        <div >
        <Container maxWidth="100%" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <BreadCrumb/>
            <div className="ButtonDiv">
            </div>
        </Container>
        <Container maxWidth="100%">
            
                <BasicModal />
                <OrganizationTable/>
        </Container>

        </div >
    )
}

export default Organization
