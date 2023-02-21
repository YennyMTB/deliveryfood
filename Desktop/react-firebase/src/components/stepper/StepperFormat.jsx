import './format.scss'

export const StepperFormat = ({img, description}) => {
  return (
    <div className='stepperformat'>
      <img src={img} alt="hero" loading="lazy"/>
      <p>{description}</p>
    </div>
  )}