import React, { useContext, useState } from 'react'




import Data from '../../Pages/ORGdata.json'
import { MissingPageContext } from '../../Context'
import AddButton from './AddButton'
import BasicModal from './MissingModal'
import OrganizationTable from './OrganizationTable'


// "Bangal,"Bihar","Telangana","Maharashtra"
function Organization() {

    
    return (
        <div>

           
            <div className="ButtonDiv">
                <BasicModal />
                <OrganizationTable />
            </div>

        </div >
    )
}

export default Organization
