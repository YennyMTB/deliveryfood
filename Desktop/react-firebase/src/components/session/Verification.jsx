import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import './session.scss'
import { actionAuthenticationSync, actionSignPhoneAsync } from '../../redux/actions/userAction';
import Swal from 'sweetalert2'
import logo from "../../assets/images/Logo.png";
import store from '../../redux/store/store';


const Verification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const user = useSelector(store => store.userStore);

    const validateCode = ({ target }) => {
        const codigo = target.value;
        setCode(codigo);
        if (codigo.length === 6) {
            dispatch(actionSignPhoneAsync(codigo));
            if (!user.name && !user.email) {
                navigate(`/register/${user.uid}`)
            } else {
                // dispatch(actionAuthenticationSync())
                navigate('/home')
            }
        }
    }
    return (
        <div className='container-fluid text-center'>
            <img className='mt-5' src={logo} alt='page logo' />
            <h2 className='mt-4 px-4'>Verification</h2>
            <p className='px-4 mb-0'>Enter the four-digit code from SMS</p>
            <span className='mb-3'>SMS not received. Send again?</span>
            <form className='pagecnt'>
                <label className=' d-grid '>
                    <input
                        className='border-0 border-bottom border-warning'
                        type="number"
                        onChange={validateCode}
                        value={code}
                    />
                </label>

                <div className='d-grid btn_login'>
                    <button className='btn btn-warning mb-3 py-2 fw-semibold' type='submit'>Verify code</button>
                </div>
            </form>
        </div>
    );
};


export default Verification