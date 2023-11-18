import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function Banner({ moviesList }) {
  return (
    <div style={{ width: "65%" }}>
      <Carousel
        swipeable={false}
        draggable={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        responsive={responsive}
      >
        {moviesList.map((movie) => (
          <img
            style={{ width: "100%" }}
            key={movie.id}
            src={`https://image.tmdb.org/3/t/p/original/${movie.backdrop_path}`}
            alt="banner"
          />
        ))}
      </Carousel>
    </div>
  );
}
