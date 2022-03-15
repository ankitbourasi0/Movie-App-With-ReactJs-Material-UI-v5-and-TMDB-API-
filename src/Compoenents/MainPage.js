import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import MovieCard from "./MovieCard";
import { Grid,  Typography } from "@mui/material";

const MainPage = () => {
  const [storedData, setStoredData] = useState([]);

  const fetchDataFromApi = async () => {
    const { data } = await axios.get(`
        https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`);
    console.log(data);
    setStoredData(data.results);
  };
  useEffect(() => {
    fetchDataFromApi();
    
  }, []);

  return (
    <div style={{
        padding:'5rem'
    }}>
     
        <Typography variant="h3" style={{
            marginBottom:'2rem'
        }}>Trending Movies</Typography>
        
      <Grid container spacing={1} direction="row" >
        {storedData.map((e) => (
          <Grid item xs={2} key={e.id}>
            <MovieCard
              key={e.id}
              id={e.id}
              poster={e.poster_path}
              title={e.title}
              rating={e.vote_average}
            />
            
          </Grid>
        ))}
        
      </Grid>
     

    </div>
  );
};

export default MainPage;
