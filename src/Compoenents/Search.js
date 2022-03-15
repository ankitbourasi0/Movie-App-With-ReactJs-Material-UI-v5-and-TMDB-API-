import { SearchSharp } from '@mui/icons-material'
import { Button, TextField ,Box,Grid,Typography } from '@mui/material'
import axios from 'axios'
import React, { useState,useEffect} from 'react'
import MovieCard from './MovieCard'

const Search = () => {
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
      margin:'2rem 10rem'
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
        padding:'5rem'
    }}>
     
        <Typography variant="h3" style={{
            marginBottom:'2rem'
        }}>Searched Movies</Typography>
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
   
    </>
  )
}

export default Search