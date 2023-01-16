import './profile.css';
import CloseIcon from '../../assets/close-icon.svg';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { getItem, setItem } from '../../utils/storage';

const defaultForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}


function ProfileModal({ open, close }) {

    const token = getItem('token');
    const [form, setForm] = useState({ ...defaultForm })


    function changeForm({ target }) {
        setForm({ ...form, [target.name]: target.value })
    }

    async function forSubmit(event) {
        event.preventDefault();

        try {
            if (!form.name || !form.confirmPassword || !form.email || !form.password) {
                return
            }

            if (form.password !== form.confirmPassword) {
                return
            }

            await api.put('/usuario',
                {

                    nome: form.name,
                    email: form.email,
                    senha: form.password

                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            setItem('userName', form.name)

            close();
            clearForm()

        } catch (error) {
            error.data()
        }

        function clearForm() {
            setForm({ ...defaultForm })
        }
    }

    useEffect(() => {

        async function loadProfile() {

            try {
                const response = await api.get('/usuario', {
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
        }

        if (open) {
            loadProfile()
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

                        <form onSubmit={forSubmit}>
                            <div className='inputs-container'>
                                <label>Nome</label>
                                <input
                                    name='name'
                                    type='text'
                                    value={form.name}
                                    onChange={changeForm}
                                    required />
                            </div>

                            <div className='inputs-container'>
                                <label>E-mail</label>
                                <input
                                    name='email'
                                    type='text'
                                    value={form.email}
                                    onChange={changeForm}
                                    required />
                            </div>
                            <div className='inputs-container'>
                                <label>Senha</label>
                                <input
                                    type='password'
                                    name='password'
                                    value={form.password}
                                    onChange={changeForm}
                                    required />
                            </div>
                            <div className='inputs-container'>
                                <label>Confirmação de senha</label>
                                <input
                                    type='password'
                                    name='confirmPassword'
                                    value={form.confirmPassword}
                                    onChange={changeForm}
                                    required />
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