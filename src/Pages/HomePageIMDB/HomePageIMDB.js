import React, { useEffect, useState } from "react";

import LayoutIMDB from "../../Layout/LayoutIMDB";
import Banner from "../../components/IMDB/Banner";
import FeaturedList from "../../components/IMDB/FeaturedList";

export default function HomePageIMDB() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('in here')
        const apiKey = "a564ce61f3b79bc934a1b8c553ecc13f";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, []);

  console.log("movie data", movies);
  return (
    <LayoutIMDB>
      <Banner moviesList={movies} />
      {/* <FeaturedList list={list} /> */}
     
    </LayoutIMDB>
  );
}
