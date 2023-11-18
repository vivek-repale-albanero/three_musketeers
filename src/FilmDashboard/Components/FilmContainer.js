import React from "react";
import {Icon} from "@platform/service-ui-libraries";
import { Card, CardHeader,CardMedia } from "@material-ui/core";
import img from "../../../public/assets/Star_wars.png"
import "./FilmContainer.scss"

function FilmContainer ({film}){
 return(
         <div className="filmInfo">
            <div className="filmCard">
            <Card>
             <div className="filmImg">
               <image src={img} />
             </div>
             <div className=" filmdata">
              <CardHeader title={film.title}  action={<Icon>more_vert</Icon>}/>
             </div>
            </Card>
            </div>
         </div>
 )
}

export default FilmContainer;