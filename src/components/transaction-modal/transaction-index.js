import './transaction.css';
import CloseIcon from '../../assets/close-icon.svg'
import { useState } from 'react';

function TransactionModal({open, close}) {

    const [choice, setChoice] = useState('out');

    return (
        // Se open, que é chamado quando clica o botão Adicionar registro, na Main, então mostra tudo o que está codificado. Caso contrário, não mostra.
        <>
            {open &&
                <div className='outside-back'>
                    <div className='modal transaction'>

                        <img className='button-close' 
                            src={CloseIcon} 
                            alt='close-button'
                            onClick={close}/> {/*Clicando em CloseIcon aciona o fechamento do modal */}
                        
                        <h2>Adicionar Registro</h2>

                        <div className='options-box'>
                            {/* Se choice for out, ativa a classe option-off. 
                            Caso contrário, option-in. Idependentemente de tudo, ativa também a btn-big */}
                            <button 
                                className={`${choice === 'out' 
                                    ? 'option-off' 
                                    : 'option-in'} btn-big`}
                                    onClick={() => setChoice('in')}
                                    >Entrada
                            </button>
                            <button className={`${choice === 'out' 
                                    ? 'option-out' 
                                    : 'option-off'} btn-big`}
                                    onClick={() => setChoice('out')}
                                    >Saída</button>
                        </div>

                        <form>
                            <div className='inputs-container'>
                                <label>Valor</label>
                                <input type='text'/>
                            </div>
                            <div className='inputs-container'>
                                <label>Categorial</label>
                                <select>
                                    <option>Categoria</option>
                                </select>
                            </div>
                            <div className='inputs-container'>
                                <label>Data</label>
                                <input type='tex'/>
                            </div>
                            <div className='inputs-container'>
                                <label>Descrição</label>
                                <input type='text'/>
                            </div>
                            <button className='btn-purple btn-small' >Confirmar</button>
                        </form>

                    </div>

                </div>
            }
        </>
    )
}

export default TransactionModal;