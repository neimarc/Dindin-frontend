import './signin-styless.css';
import Logo from '../../assets/logo.svg'


function SignIn() {
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

            <button className= 'btn-big btn-purple'> Cadastre - se </button> 
          </div>

          <div className = 'right' >
            <form >
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