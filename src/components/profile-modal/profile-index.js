import './profile.css';
import CloseIcon from '../../assets/close-icon.svg';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/storage';

const defaultForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function ProfileModal({ open, close }) {

    const token = getItem('token');
    const [form, setForm] = useState({ ...defaultForm })

    //Para alterar o form dinamicamente
    function changeForm({ target }) {
        setForm({ ...form, [target.name]: target.value }) //Pega tudo do form e seta target.name alterando para target.value
    }

    useEffect(() => {

        async function loadProfile() {

            try {
                const response = await api.get('/usuario', { //Segundo o backend, o usuário é pego pelo id do token
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const { nome, email } = response.data;

                setForm({
                    name: nome,
                    email: email,
                    password: '',
                    confirmPassword: ''
                })

            } catch (error) {

            }

            if (open) {
                loadProfile() //A função será chamada sempre que o open for executado e true
            }
        }
    }, [open])


    return (
        <>
            {open &&
                <div className='outside-back'>
                    <div className='modal'>

                        <img className='button-close'
                            src={CloseIcon}
                            alt='close-button'
                            onClick={close} />

                        <h2>Editar Perfil</h2>

                        <form>
                            <div className='inputs-container'>
                                <label>Nome</label>
                                <input
                                    name='name' //Para conseguir pegar a propriedade name dentro do target.name
                                    type='text'
                                    value={form.name}
                                    onChange={changeForm} />
                            </div>

                            <div className='inputs-container'>
                                <label>E-mail</label>
                                <input
                                    name='email' //Para conseguir pegar a propriedade email dentro do target.email
                                    type='text'
                                    value={form.email}
                                    onChange={changeForm} />
                            </div>
                            <div className='inputs-container'>
                                <label>Senha</label>
                                <input
                                    type='password'
                                    name='password' //Para conseguir pegar a propriedade password dentro do target.password
                                    value={form.password}
                                    onChange={changeForm} />
                            </div>
                            <div className='inputs-container'>
                                <label>Confirmação de senha</label>
                                <input
                                    type='password'
                                    name='confirmPassword' //Para conseguir pegar a propriedade password dentro do target.password
                                    value={form.confirmPassword}
                                    onChange={changeForm} />
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