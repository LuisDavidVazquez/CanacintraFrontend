import './Header.css'

interface HeaderProps {
  title: string, 
  image: string,
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

function Header({ title, image, isMenuOpen, onMenuToggle }: HeaderProps) {

  return (
    <div>
      <div className="header">
      <div>
        <button onClick={onMenuToggle}>
        {isMenuOpen ? <img src="/assets/svg/navbar/list.svg" alt="" /> : <img src="/assets/svg/navbar/close.svg" alt="" />}
        </button>
      </div>
      <div className='header-title'>

        <img src={image} alt="" />
        <span>{title}</span>
      </div>
      <div>
        <h3>Luis David</h3>
        <img className='header-img-user' src="/assets/img/login/user.png" alt="" />
      </div>
    </div>


    </div>
  )
}

export default Header