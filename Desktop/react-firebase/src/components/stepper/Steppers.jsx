import React, { useState } from "react";
import { Steps } from "antd";
import hero1 from "../../assets/images/hero1.svg";
import hero2 from "../../assets/images/hero2.svg";
import hero3 from "../../assets/images/hero3.svg";
import { useNavigate } from "react-router-dom";
import { StepperFormat } from "./StepperFormat";
import './format.scss'

const { Step } = Steps;

const description = {
  first: "Choose what to eat choosing from a variety of restaurants from the list",
  second: "Choose where you want to deliver by indicating on the map",
  third: "We will deliver as soon as possible",
};

const steps = [
  {
    title: "First",
    content: <StepperFormat img={hero1} description={description.first} />,
  },
  {
    title: "Second",
    content: <StepperFormat img={hero2} description={description.second} />,
  },
  {
    title: "Third",
    content: <StepperFormat img={hero3} description={description.third} />,
  },
];

export const Steppers = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const onChange = (value) => {
    setCurrent(value);
  };

  const navigate = useNavigate();


  return (
    <>
    <div className="d-flex flex-column justify-content-between align-items-center steppercnt p-5"> 
      <div>{steps[current].content}</div>
      <div onChange={onChange} size="small" current={current}>
        {steps.map((item) => (
          <Step key={item.title} />
        ))}
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <button  className="btn btn-warning" onClick={() => next()} size="large">
            Next
          </button>
        )}
        {current === steps.length - 1 && (
          <button className="btn btn-warning" onClick={()=>(navigate('/phone'))} size="large">
            Next
          </button>
        )}
      </div>
      </div>
    </>
  );
};
