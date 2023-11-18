import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function UpNext({ movies }) {
  return (
    <div style={{ width: "40%", height: "100%", paddingTop: 0 }}>
      <p
        style={{
          color: "#F5C518",
          fontWeight: 600,
          fontSize: "18px",
          marginBottom: "10px",
        }}
      >
        Up Next
      </p>
      {movies.splice(0, 3).map((movie) => (
        <div key={movie.id} style={{ display: "flex", gap: "20px" }}>
          <img
            style={{ width: "88px" }}
            src={`https://image.tmdb.org/3/t/p/original/${movie.poster_path}`}
            alt="poster"
          />
          <p style={{ color: "#ffffff",fontWeight:600 }}>{movie.original_title}</p>
        </div>
      ))}
    </div>
  );
}
