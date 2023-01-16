import './signup-styless.css';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import api from '../../services/api'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formSchema } from '../../utils/Validates/formSchema'


const defaultForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function SignUp() {

  const [form, setForm] = useState({ ...defaultForm });
  const navigate = useNavigate();

  async function submitRegister(event) {
    event.preventDefault();

    try {

      await formSchema.validate(form);

      if (form.password !== form.confirmPassword) {
        return
      }

      const response = await api.post('/usuario',
        {
          email: form.email,
          nome: form.name,
          senha: form.password
        })

      if (response.status > 204) {
        return
      }

      navigate('/');


    } catch (error) {
      console.log(error.response)
    }
  }

  function changeForm({ t }) {
    setForm({ ...form, [t.name]: t.value })
  }

  return (
    <div className='container-signUp' >
      <img src={Logo} className='logo' alt='logo' />

      <div className='content-signUp' >

        <form onSubmit={submitRegister}>
          <h2> Cadastre-se </h2>

          <div className='inputs-container'>
            <label htmlFor='nome' > Nome </label>
            <input
              type='text'
              name='nome'
              value={form.name}
              onChange={changeForm} />
          </div>

          <div className='inputs-container'>
            <label htmlFor='email' > E-mail </label>
            <input
              type='text'
              name='email'
              value={form.email}
              onChange={changeForm} />
          </div>

          <div className='inputs-container'>
            <label htmlFor='senha' > Senha </label>
            <input
              type='password'
              name='password'
              value={form.password}
              onChange={changeForm} />
          </div>

          <div className='inputs-container'>
            <label htmlFor='confirmação-senha' > Confirmação de senha </label>
            <input
              type='password'
              name='confirmPassword'
              value={form.confirmPassword}
              onChange={changeForm} />
          </div>
          <button className='btn-big btn-purple'>Cadastrar</button>
          <Link to='/'>Já tem cadastro? Clique aqui!</Link>
        </form>
      </div>


    </div>
  )
}

export default SignUp;