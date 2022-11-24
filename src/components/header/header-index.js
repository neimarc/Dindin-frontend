import './header-styles.css';
import Logo from '../../assets/logo.svg'
import Profile from '../../assets/profile.svg'
import Logout from '../../assets/logout.svg'
import { useNavigate } from 'react-router-dom';
import { clear, getItem } from '../../utils/storage';

// A main usa a prop editProfile na chamada do Header
function Header({ editProfile }) {
    const navigate = useNavigate();
    const userName = getItem('userName') //O usuário como userName foi passado no signin

    function handleLogout() {
        clear(); //Para limpar o localStorage quando o usuário fizer logoof
        navigate('/'); {/*Para ir para a página raiz */ }
    }
    return (
        <header>
            <div className='content-header width-max'> {/* Para limitar o tamanho máximo do header  */}
                <img src={Logo} alt='logo' />
                <div className='container-signOut'>
                    <div
                        className='profile-place'
                        onClick={editProfile}> {/*A chamada dessa prop está na main. Ao clicar no ícone profile abre o modal editProfile */}
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