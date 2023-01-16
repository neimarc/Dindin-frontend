import './header-styles.css';
import Logo from '../../assets/logo.svg'
import Profile from '../../assets/profile.svg'
import Logout from '../../assets/logout.svg'
import { useNavigate } from 'react-router-dom';
import { clear, getItem } from '../../utils/storage';
function Header({ editProfile }) {
    const navigate = useNavigate();
    const userName = getItem('userName')
    function handleLogout() {
        clear();
        navigate('/');
    }
    return (
        <header>
            <div className='content-header width-max'>
                <img src={Logo} alt='logo' />
                <div className='container-signOut'>
                    <div
                        className='profile-place'
                        onClick={editProfile}>
                        <img src={Profile} alt='profile' />
                        <strong>{userName}</strong>
                    </div>
                    <img className='signOut' src={Logout} alt='logout'
                        onClick={handleLogout} />
                </div>
            </div>
        </header>
    )
}
export default Header;