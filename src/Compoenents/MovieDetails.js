import  React,{useState,useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { img_500, unavailable } from './Configuration';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height:'60%',
  bgcolor: 'background.paper',
  
  boxShadow: 24,
  p: 10,
};

export default function MovieDetails({children,id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [storedData, setStoredData] = useState([] )
  const fetchData =async () =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setStoredData(data);
}

    useEffect(() => {
     
    fetchData();
    // eslint-disable-next-line
    }, [])
    
  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="OuterBox">
            <Box style={{display:'flex'}} className="firstSection">
              <Box style={{flexGrow:1}}>
            <Typography id="transition-modal-title" variant="h3" component="h2" style={{flexGrow:1}}>
             {storedData.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2,
            maxWidth:'350px' } }>
             {storedData.overview}
            </Typography>
            </Box>
            <Box className="secondSection">
            <img alt="poster" width={300} src={storedData.poster_path?`${img_500}/${storedData.poster_path}`:unavailable}/>
            <Typography variant="h5" >
                Rating 
            </Typography>
            <Typography id="transition-modal-title" variant="h6" component="h1" style={{textAlign:'center'}}>
            
             {storedData.vote_average}
            </Typography>
            </Box>
            </Box>
           

           
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}