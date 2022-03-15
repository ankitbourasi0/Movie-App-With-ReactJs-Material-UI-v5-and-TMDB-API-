import logo from './logo.svg';
import './App.css';
import Search from './Compoenents/Search';
import MainPage from './Compoenents/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
   <BrowserRouter>
    
   
      <Routes>
        <Route path='/' element={<MainPage/>} exact />
        <Route path='/Search' element={<Search/>} />

      </Routes>
   </BrowserRouter>
     
    
  );
}

export default App;
