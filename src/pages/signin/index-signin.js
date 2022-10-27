import './signin-styless.css';
import Logo from '../../assets/logo.svg'
import {useNavigate} from 'react-router-dom';

function SignIn() {

  const navigate = useNavigate();
  // Para usar a função de navegação para as páginas

  function handleSubmit(event) {
    event.preventDefault();

    navigate('/main');
  }
  // Para um evento(poderia ser qualquer nome) não forçar uma renderização toda vez.

  return ( 
    <div className = 'container-signIn' >
        <img src = {Logo} className = 'logo'alt = 'logo' />

        <div className = 'content-signIn' >

          <div className = 'left' >
            <h1> Controle suas < span > finanças </span>, sem planilha chata.</h1 >
            <h3 >
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN,
            você tem tudo num único lugar e em um clique de distância. 
            </h3>

            <button className= 'btn-big btn-purple'
              onClick={() => navigate('/signup')}> Cadastre - se </button> 
              {/* Chamada do navigate para ir para a página signup definida no routes */}
          </div>

          <div className = 'right' >
            <form onSubmit={handleSubmit} >
            <h2> Login </h2> 
              <div className='inputs-container'>
                <label htmlFor = 'email' > E-mail </label>
                <input type='text' name='email'/> 
              </div>
              <div className='inputs-container'>
                <label htmlFor = 'password' > Password </label>
                <input type='password' name='password'/> 
              </div> 
            <button className= 'btn-big btn-purple'>Entrar</button>
            </form>
          </div> 
        
        </div> 

      </div>
  )
}

export default SignIn;