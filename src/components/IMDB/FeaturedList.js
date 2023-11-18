import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function FeaturedList({ list }) {
  return (
    <div style={{ width: "100%" }}>
      <p style={{color:'#F5C518',fontSize:'24px',fontWeight:600}}>Featured Today</p>
      <Carousel
        swipeable={false}
        draggable={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        responsive={responsive}
      >
        {list.map((movie) => (
          <>
            <img
              style={{ width: "100%" }}
              key={movie.id}
              src={`https://image.tmdb.org/3/t/p/original/${movie.backdrop_path}`}
              alt="banner"
            />
            <p style={{color:'white',marginTop:'8px'}}>{movie.original_title}</p>
          </>
        ))}
      </Carousel>
    </div>
  );
}
