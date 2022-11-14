import './transaction.css';
import CloseIcon from '../../assets/close-icon.svg'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/storage'

//Formato padrão do form resetado
const defaultForm = {
    category: {
        id: '',
        name: ''
    },
    description: '',
    date: '',
    value: ''
}

function TransactionModal({ open, close }) {
    const token = getItem('token');
    const [choice, setChoice] = useState('out');
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ defaultForm }) //Para resetar o form

    async function fillCategories() {
        try {
            const response = await api.get('/categoria', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCategories([...response.data]) //Para setCategories receber todo conteúdo do response
        } catch (error) {

        }
    }

    //Para fazer o setForm receber todo o conteúdo do form + alvo name receber o alvo value
    function changeForm(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function submitEvent(event) {
        event.preventDefault()
    }

    useEffect(() => {
        fillCategories();
    }, [])

    return (
        // Se open, que é chamado quando clica o botão Adicionar registro, na Main, então mostra tudo o que está codificado. Caso contrário, não mostra.
        <>
            {open &&
                <div className='outside-back'>
                    <div className='modal transaction'>

                        <img className='button-close'
                            src={CloseIcon}
                            alt='close-button'
                            onClick={close} /> {/*Clicando em CloseIcon aciona o fechamento do modal */}

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

                        <form onSubmit={submitEvent}>
                            <div className='inputs-container'>
                                <label>Valor</label>
                                <input
                                    onChange={changeForm}
                                    name='value'
                                    value={form.value}
                                    type='text' />
                            </div>
                            <div className='inputs-container'>
                                <label>Categorial</label>
                                <select> {/*Para percorrer as categorias contidas na api e preencher os selects */}
                                    {categories.map((categ) => (
                                        <option key={categ.id}
                                            value={categ.descricao}>
                                            {categ.descricao}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='inputs-container'>
                                <label>Data</label>
                                <input
                                    onChange={changeForm}
                                    name='date'
                                    value={form.date}
                                    type='text' />
                            </div>
                            <div className='inputs-container'>
                                <label>Descrição</label>
                                <input
                                    onChange={changeForm}
                                    name='description'
                                    value={form.description}
                                    type='text' />
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