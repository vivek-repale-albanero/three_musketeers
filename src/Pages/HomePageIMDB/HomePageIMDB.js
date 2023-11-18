import React, { useEffect, useState } from "react";

import LayoutIMDB from "../../Layout/LayoutIMDB";
import Banner from "../../components/IMDB/Banner";
import FeaturedList from "../../components/IMDB/FeaturedList";
import { categoryMovies } from "../../api/imdbapi";
import UpNext from "../../components/IMDB/UpNext";

export default function HomePageIMDB() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "a564ce61f3b79bc934a1b8c553ecc13f";
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

        const response = await categoryMovies(url);
        setMovies(response.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, []);

  console.log("movie data", movies);
  return (
    <LayoutIMDB>
      <div style={{display:'flex',padding:'20px 0',gap:'16px'}}>
        <Banner moviesList={movies} />
        <UpNext movies={movies} />
      </div>
      <FeaturedList list={movies} />
    </LayoutIMDB>
  );
}
