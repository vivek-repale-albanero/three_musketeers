// Banner.js
import React from "react";
//import "./Banner.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Card, Typography } from "@material-ui/core";
import CardWrap from "./CardWrap";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  banner: {
    display: "flex",
    //justifyContent: "space-around",
    alignItems: "flex-start",
    height: "80vh",
  },
  carouselCard: {
    flex: 3,
    height: "100%",
    "& .carousel-slide": {
      position: "relative",
      overflow: "hidden",
      height: "100%",
      paddingBottom: "56.25%",
      "& .movie-poster": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "absolute",
        top: 0,
        left: 0,
      },
      "& .poster-overlay": {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.5)",
        padding: "10px",
        "& .movie-title": {
          color: "white",
        },
      },
    },
  },
  bannerRight: {
    flex: 1,
    paddingLeft: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    "& h4": {
      marginBottom: "1rem",
    },
  },
}));

export default function Banner({ moviesList }) {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Card className={classes.carouselCard}>
        <Carousel
          autoPlay
          interval={5000}
          stopOnHover={false}
          infiniteLoop
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
        >
          {moviesList.map((movie) => (
            <div key={movie.id} className="carousel-slide">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="poster-overlay">
                <Typography variant="h5" component="h2" className="movie-title">
                  {movie.title}
                </Typography>
              </div>
            </div>
          ))}
        </Carousel>
      </Card>
      <div className={classes.bannerRight}>
        <Typography variant="h3" component="h4">
          Up Next
        </Typography>
        <CardWrap>hello</CardWrap>
      </div>
    </div>
  );
}
