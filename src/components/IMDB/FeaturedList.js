

import React from 'react'
import './FeaturedList.scss'
import FeaturedItem from './FeaturedItem'
import { Typography } from '@material-ui/core'

export default function FeaturedList({list}) {
  return (
    <div className="__featured_list__wrapper">
        {/* <Typography>
            Featured movies today
        </Typography> */}
        {list?.map(item=>(
            <FeaturedItem key={item.id}/>
        ))}
        {!list&&<Typography>NO ITEMS TO SHOW!</Typography>}
    </div>
  )
}
