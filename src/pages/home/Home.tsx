import './Home.css'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import Title from '../../utils/Title'


function Home() {
  return (
    <div className='home'>
        <Title subtitle="Menú"/>
        <NavBar />
        <Header />
    </div>
  )
}

export default Home