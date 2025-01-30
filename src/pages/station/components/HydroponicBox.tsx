import './HydroponicBox.css'

interface HydroponicBoxProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

function HydroponicBox({ title, subtitle, onClick }: HydroponicBoxProps) {
  return (
    <button className='hydroponicBox' onClick={onClick}>
        <div className='hydroponicBox-description'>
            <h1>{title}</h1><br />
            <h2>{subtitle}</h2><br />
        </div>
        <img src="assets/img/home/hydroponic.png" alt="" />
    </button>
  )
}

export default HydroponicBox