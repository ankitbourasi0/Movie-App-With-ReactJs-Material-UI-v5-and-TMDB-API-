import { SearchSharp } from '@mui/icons-material'
import { Button, TextField ,Box,Grid,Typography } from '@mui/material'
import axios from 'axios'
import React, { useState,useEffect} from 'react'
import MovieCard from './MovieCard'


import { createTheme ,ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});


const Search = (props) => {
  const [searchedText, setSearchedText] = useState('')
  const [storedData, setStoredData] = useState([])

  const fetchSearching = async () =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY }&language=en-US&query=${searchedText}&page=1&include_adult=false`)
  setStoredData(data.results)
  }
  useEffect(() => {
    window.scroll(0,0);
    fetchSearching()
    //eslint-disable-next-line
  }, [])
  

  
  return (
    <>
    
    <Box style={{
      display:'flex',

    }}>
      <TextField 
    style={{flex:1}}
    className="Searchbox"
    label="Search"
    variant='outlined'
    onChange={(e)=>setSearchedText(e.target.value)}
    />
    <Button variant="contained" style={{
      marginLeft: 20
    }}  onClick={fetchSearching}>
      <SearchSharp/>
    </Button>
    </Box>
    
    <div style={{
        padding:'5rem',
    
    }}>
     
        <Typography variant="h4" style={{
            marginBottom:'1rem'
        }}>Searched Movies</Typography>
        <ThemeProvider theme={theme}>
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
      </ThemeProvider>
     

    </div>
   
    </>
  )
}

export default Search