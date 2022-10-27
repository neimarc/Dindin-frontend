import './header-styles.css';
import Logo from '../../assets/logo.svg'
import Profile from '../../assets/profile.svg'
import Logout from '../../assets/logout.svg'


function Header() {
    return (
        <header>
            <img src={Logo} alt='logo'/>
            <div>
                <div>
                    <img src={Profile} alt='profile'/>
                    <strong>Neimar</strong>
                </div>
                <img className='signOut' src={Logout} alt='logout'/>
            </div>
        </header>
    )
}

export default Header;