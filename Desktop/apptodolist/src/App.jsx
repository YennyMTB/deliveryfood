import React, { useEffect, useLayoutEffect, useState } from 'react';
//Styles
import "./sass/index.scss";
//Firestone
import { collection, onSnapshot } from 'firebase/firestore';
import store from './firebase/firebase.config'
//Components
import AddComponent from "./components/add.components";
import ListComponent from "./components/list.component";
import ConfigComponent from "./components/config.component";
import HeaderComponent from "./components/header.component";
import FooterComponent from "./components/footer.component";
import MgsComponent from "./components/msg.component"
//img
import HeaderDarkMobile from "./assets/img/bg-mobile-dark.jpg";
import HeaderDarkDesktop from "./assets/img/bg-desktop-dark.jpg"
import HeaderLigthMobile from "./assets/img/bg-mobile-light.jpg";
import HeaderLigthDesktop from "./assets/img/bg-desktop-light.jpg";
//Icon
import { BiloaderAlt } from "react.icons/bi"
import { UsageState } from 'webpack';

const App = () => {
    const [Tasks, setTasks] = useState([]);
    const [TasksAll, setTasksAll] = useState([]);
    const [Theme, setTheme] = useState("dark");
    const [Id, setId] = useState(null);
    const [CurrentFilter, setCurrentFilter] = useState("all");
    const [Reset, setReset] = useState(false);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        onSnapshot(collection(store, "tasks"), , (snapshot) => {
            let temp = [];
            snapshot.docs.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id });
            });
        });
        setLoading(false);
        setTasks(temp);
        setTasksAll(temp);
        const completed = temp.filter((task) => task.completed);
        let arrCompleted = [];
        completed.forEach((item) => {
            arrCompleted.push(item);
        });
        setCompleted(arrCompleted);
        console.log(temp);
    });
}, []

return (
    <>
        <div className='content'>
            <HeaderComponent />
            <AddComponent />
            <MgsComponent />
            <ListComponent />
            <ConfigComponent />
            <FooterComponent />
        </div>
    </>
)


export default App;