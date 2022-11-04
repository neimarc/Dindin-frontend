import './profile.css';
import CloseIcon from '../../assets/close-icon.svg'

function ProfileModal(open, close) {
    return (
        <>
            {open &&
                <div className='outside-back'>
                    <div className='modal'>

                        <img className='button-close' src={CloseIcon} alt='close-button'/>
                        <h2>Editar Perfil</h2>
                        <form>
                            <div className='inputs-container'>
                                <label>Nome</label>
                                <input type='text'/>
                            </div>
                            <div className='inputs-container'>
                                <label>E-mail</label>
                                <input type='text'/>
                            </div>
                            <div className='inputs-container'>
                                <label>Senha</label>
                                <input type='password'/>
                            </div>
                            <div className='inputs-container'>
                                <label>Confirmação de senha</label>
                                <input type='password'/>
                            </div>
                            <button className='btn-purple btn-small' >Confirmar</button>
                        </form>

                    </div>

                </div>
            }
        </>
    )
}

export default ProfileModal;