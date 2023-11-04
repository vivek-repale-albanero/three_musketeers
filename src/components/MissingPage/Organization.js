import React, { useContext, useState } from 'react'




import Data from '../../Pages/ORGdata.json'
import { MissingPageContext } from '../../Context'
import AddButton from './AddButton'
import BasicModal from './MissingModal'
import OrganizationTable from './OrganizationTable'


// "Bangal,"Bihar","Telangana","Maharashtra"
function Organization() {
    const { orgdata, setorgdata } = useContext(MissingPageContext)
    console.log(orgdata)
    return (
        <div>

            Main component
            <div className="ButtonDiv">
                <BasicModal />
                <OrganizationTable />
            </div>

        </div >
    )
}

export default Organization
