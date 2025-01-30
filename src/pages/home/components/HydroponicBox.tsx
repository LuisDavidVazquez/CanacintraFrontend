import './HydroponicBox.css'

interface HydroponicBoxProps {
  title: string;
  subtitle: string;
}

function HydroponicBox({ title, subtitle }: HydroponicBoxProps) {
  return (
    <button className='hydroponicBox'>
        <div className='hydroponicBox-description'>
            <h1>{title}</h1><br />
            <h2>{subtitle}</h2><br />
        </div>
        <img src="assets/img/home/hydroponic.png" alt="" />
    </button>
  )
}

export default HydroponicBox