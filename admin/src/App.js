import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Router from "./routes";
import { ToastContainer } from 'react-toastify';

const  App = () =>{
  return (
    <>
      <ToastContainer position='top-center'/>
      <Router/>
    </>
    
  );
}

export default App;
