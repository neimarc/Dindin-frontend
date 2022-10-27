import './signup-styless.css';
import Logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
// Importação para usar a linkagem

function SignIn() {
  return ( 
    <div className = 'container-signUp' >
        <img src = {Logo} className = 'logo'alt = 'logo' />

        <div className = 'content-signUp' >
    
            <form >
            <h2> Cadastre-se </h2>
              <div className='inputs-container'>
                <label htmlFor = 'nome' > Nome </label>
                <input type='text' name='nome'/> 
              </div> 
              <div className='inputs-container'>
                <label htmlFor = 'email' > E-mail </label>
                <input type='text' name='email'/> 
              </div>
              <div className='inputs-container'>
                <label htmlFor = 'senha' > Senha </label>
                <input type='password' name='senha'/> 
              </div>
              <div className='inputs-container'>
                <label htmlFor = 'confirmação-senha' > Confirmação de senha </label>
                <input type='password' name='confirmação-senha'/> 
              </div>  
            <button className= 'btn-big btn-purple'>Cadastrar</button>
            <Link to='/'>Já tem cadastro? Clique aqui!</Link>
            </form>
        </div> 
        

      </div>
  )
}

export default SignIn;