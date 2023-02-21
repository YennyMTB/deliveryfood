import logo from '../../assets/images/Logo.png'
import './loadingstyle.scss'

import React, { useEffect, useState } from 'react'
// import { Steppers } from '../stepper/Steppers';
import { useNavigate } from 'react-router-dom';
import Phone from '../session/Phone';
import { Steppers } from '../stepper/Steppers';


const LoadingPage = () => {

  const [loadingLogo, setLoadingLogo] = useState(true);

  const TimerSteps = () => {
    setTimeout(() => {
      setLoadingLogo(false);
    }, 3000);
  }

  useEffect(() => {
    TimerSteps();
  }, [])


  return (
    <>
    {
        loadingLogo ?
        <div className='img'>
          <img src={logo} alt='Logo Loading' />
        </div>
    :
    <Steppers />
    }
    </>
  )
}

export default LoadingPage