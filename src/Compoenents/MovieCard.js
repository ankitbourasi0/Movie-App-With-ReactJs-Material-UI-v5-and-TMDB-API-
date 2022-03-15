import React from "react";
import { Card, CardMedia } from "@mui/material";
import { img_300 } from "./Configuration";
import MovieDetails from "./MovieDetails";


const MovieCard = ({ id, poster }) => {
  return (
    <MovieDetails id={id}>
      <Card elevation={4}>
        <CardMedia component="img" image={`${img_300}/${poster}`} alt="" />
      </Card>
    </MovieDetails>
  );
};

export default MovieCard;
