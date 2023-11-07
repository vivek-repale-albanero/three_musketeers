import React from 'react'
import Layout from '../Layout/Layout'
import { Table } from '@material-ui/core'
import CustomTable from '../components/ShoaibPracticeComp/CustomTable'

function ShoaibCompoPractice() {
    return (

        <Layout>
            <div style={{ margin: "auto", border:"1px solid black",textAlign:"center" }}>
                <CustomTable/>
            </div>
        </Layout>

    )
}

export default ShoaibCompoPractice
