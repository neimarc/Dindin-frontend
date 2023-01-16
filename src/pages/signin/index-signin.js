import './signin-styless.css';
import Logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage'
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const token = getItem('token');
    if (token) {
      navigate('/main')
    }
  }, [])
  async function handleSubmit({ event }) {
    event.preventDefault();
    try {
      if (!email || !password) {
        return
      }

      const response = await api.post('/login', {
        email,
        senha: password
      })
      console.log(response)
      const { usuario, token } = response.data

      setItem('token', token)
      setItem('userId', usuario.id)
      setItem('userName', usuario.nome)
      navigate('/main');
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='container-signIn' >
      <img src={Logo} className='logo' alt='logo' />
      <div className='content-signIn' >

        <div className='left' >
          <h1> Controle suas < span > finanças </span>, sem planilha chata.</h1 >
          <h3 >
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN,
            você tem tudo num único lugar e em um clique de distância.
          </h3>
          <button className='btn-big btn-purple'
            onClick={() => navigate('/signup')}> Cadastre - se </button>
        </div>

        <div className='right' >
          <form onSubmit={handleSubmit} >
            <h2> Login </h2>
            <div className='inputs-container'>
              <label htmlFor='email' > E-mail </label>
              <input
                name='email'
                type='text'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className='inputs-container'>
              <label htmlFor='password' > Senha </label>
              <input
                name='password'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button className='btn-big btn-purple'>Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default SignIn;