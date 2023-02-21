
import './home.scss'
import Header from "./Header";
import Main from './Main';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
      } 
      else{
        navigate(`/register/${user.uid}`)
        console.log(user);
      }
    });
  }, []);
     

    return (
      <div className="darkcolor p-4">
      <Header/>
      <Main/>
      <Footer/>
    </div>
    );
  };


