import React, { useEffect } from 'react';
import { IoFastFoodSharp } from "react-icons/io5";
import { GiFruitBowl, GiNoodles, GiWrappedSweet, GiSlicedBread } from "react-icons/gi";
import { MdStarRate } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { actionGetPlatesAsync, actionFilterRestaurantAsync, actionGetRestaurantAsync } from '../../redux/actions/restaurantAction';
import { useNavigate } from 'react-router-dom';


const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { restaurant } = useSelector((store) => store.restaurant);
    console.log(restaurant);

    useEffect(() => {
        dispatch(actionGetRestaurantAsync());
    }, [dispatch]);

    const buttonFiltered = (searchValue) => {
        const searchParam = "type";
        dispatch(actionFilterRestaurantAsync(searchParam, searchValue));
    };
    
    const restaurantDetail = (element) => {
        let searchValue = element.name
        let id = element.idrestaurante
        const searchParam = "name";
        dispatch(actionFilterRestaurantAsync(searchParam, searchValue));
        dispatch(actionGetPlatesAsync(searchValue))
        navigate('/details')
    }
    const filterbtn = [
        {
            id: 1,
            button: 'All',
        },
        {
            id: 2,
            button: 'Fast Food',
            icon: <IoFastFoodSharp />
        },
        {
            id: 3,
            button: 'Sweets & Desserts',
            icon: <GiWrappedSweet />
        },
        {
            id: 4,
            button: 'Salad',
            icon: <GiFruitBowl />
        },
        {
            id: 5,
            button: 'Bread',
            icon: <GiSlicedBread />
        },
        {
            id: 6,
            button: 'Pasta',
            icon: <GiNoodles />
        },
    ];

    return (
        <div>
            <p className="mt-3">Restaurants and cafes</p>
            <div className="btnstyle">
                {filterbtn.map((filter) => {
                    return (
                        <div className="banner__item" key={filter.id} >
                            <button className="btn btnclick"
                                onClick={() => {
                                    buttonFiltered(filter.button);
                                }}>
                                <span className="me-3">{filter.icon}</span>
                                <span>{filter.button}</span>
                            </button>
                        </div>
                    );
                })
                }
            </div>

            <div>
                {restaurant.map((element, index) => {
                    let puntaje = 0;
                    if (element.rate === 1) {
                        puntaje = '⭐'
                    } if (element.rate === 2) {
                        puntaje = '⭐⭐'
                    } if (element.rate === 3) {
                        puntaje = '⭐⭐⭐'
                    } if (element.rate === 4) {
                        puntaje = '⭐⭐⭐⭐'
                    } if (element.rate === 5) {
                        puntaje = '⭐⭐⭐⭐⭐'
                    }
                    return (

                        <div className="mt-3 restaurant d-flex" key={index} onClick={()=>{restaurantDetail(element)}}>
                            <figure className="imgcnt">
                                <img className="restaurant__logo" src={element.img} />
                            </figure>
                            <aside className="d-flex flex-column ms-3 aside">
                                <h5>{element.name}</h5>
                                <span>{puntaje}</span>
                                <p className="mb-0"> Work time {element.time}</p>
                                <p className="p_text mt-0">Before you {element.dollar}</p>
                            </aside>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Main