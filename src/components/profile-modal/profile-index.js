import './profile.css';
import CloseIcon from '../../assets/close-icon.svg'

function ProfileModal({open, close}) {
    return (
        <>
            {open &&
                <div className='outside-back'>
                    <img src={CloseIcon} alt='close-button'/>
                    <h2>Editar Perfil</h2>

                    <form>
                        <div className='inputs-container'>
                            <label>Nome</label>
                            <input type='text'/>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default ProfileModal;