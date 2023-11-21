import React, { useState } from "react";
import {
  Icon,
  AlbaButton,
  Popover,
  Typography,
} from "@platform/service-ui-libraries";
import { Card, CardHeader, CardMedia } from "@material-ui/core";
import "./FilmContainer.scss";

function FilmContainer({ film, openView, pathname, img, ind }) {
  const [poPover, setPoPover] = useState(null);
  // console.log("pathname",pathname)
  const handleClick = (event) => {
    setPoPover(event.currentTarget);
  };
  const handleClose = () => {
    setPoPover(false);
  };
  const openModal = () => {
    openView(film, ind);
  };
  return (
    <div className="filmInfo">
      <div className="filmCard">
        <Card>
          <div className="filmImg">
            {/* <image src={img} /> */}
            <CardMedia image={img[ind]} />
          </div>
          <div className=" filmdata">
            <div className="containHead">
              <Icon>play_circle</Icon>
              <CardHeader
                title={pathname != "/films" ? film.name : film.title}
              />
            </div>
            <div className="contBtn">
              <button onClick={(event) => handleClick(event)}>
                <Icon>more_vert</Icon>
              </button>
            </div>
            <div className="moviepopOver">
              <Popover
                open={Boolean(poPover)}
                anchorEl={poPover}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <AlbaButton onClick={openModal}>
                  <div>
                    <Typography className="option_button">
                      {" "}
                      <Icon>visibility</Icon>view
                    </Typography>
                  </div>
                </AlbaButton>
              </Popover>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default FilmContainer;
