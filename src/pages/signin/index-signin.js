import './signin-styless.css';
import Logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api'

function SignIn() {

  // Para usar a função de navegação para as páginas
  const navigate = useNavigate();
  // Parar mudar o estado dos inputs;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!email || !password) {
        return
      }

      // Na documentação do desafio tem que a api espera receber na rota login o email e a senha
      const response = await api.post('/login', {
        email,
        senha: password
      })

      console.log(response);
      navigate('/main');

    } catch (error) {
      console.log(error)
    }

  }
  // Para um evento(poderia ser qualquer nome) não forçar uma renderização toda vez.

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
          {/* Chamada do navigate para ir para a página signup definida no routes */}
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
              //Para setar o poder de mudar do alvo de valor email
              />
            </div>
            <div className='inputs-container'>
              <label htmlFor='password' > Password </label>
              <input
                name='password'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              //Para setar o poder de mudar do alvo de valor password 
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