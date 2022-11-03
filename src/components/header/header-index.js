import './header-styles.css';
import Logo from '../../assets/logo.svg'
import Profile from '../../assets/profile.svg'
import Logout from '../../assets/logout.svg'
import { useNavigate } from 'react-router-dom';

// O header recebe a prop editProfile do
function Header(editProfile) {
    const navigate = useNavigate();

    function handleLogout(){
        navigate('/'); {/*Para ir para a página raiz */}
    }
    return (
        <header>
            <div className='content-header width-max'> {/* Para limitar o tamanho máximo do header  */}
                <img src={Logo} alt='logo'/>
                <div className='container-signOut'>
                    <div 
                    className='profile-place'
                    onClick={editProfile}>
                        <img src={Profile} alt='profile'/>
                        <strong>Neimar</strong>
                    </div>
                    <img className='signOut' src={Logout} alt='logout'
                    onClick={handleLogout}/>
                </div>
            </div>
        </header>
    )
}

export default Header;