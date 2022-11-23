import './transaction.css';
import CloseIcon from '../../assets/close-icon.svg'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/storage'
import { fillCategories, loadTransactions } from '../../utils/requisitions.js'
import { dayFormat } from '../../utils/formatter'

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

//A prop setTransactions terá o estado que modifica as transaçōes na Main.
//O setEditPresentItem é pra preencher o modal de editar transações toda vez que abri-lo 
function EditTransactionModal({ open, close, setTransactions, editPresentItem }) {
    const token = getItem('token');
    const [choice, setChoice] = useState('out');
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ defaultForm }) //Para resetar o form



    //Para fazer o setForm receber todo o conteúdo do form + alvo name receber o alvo value
    function changeForm(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function changeSelect(event) {
        // Para encontrar, dentro do array de categorias, a categoria que está se utilizando no imput select

        const actualCategory = categories.find((categ) => categ.descricao === event.target.value);

        if (!actualCategory) {
            return
        }
        //Se encontrar o actualCategory, o setForm receberá tudo o que estiver dentro do form + outras propriedades
        setForm({ ...form, category: { id: actualCategory.id, name: actualCategory.descricao } })
    }

    async function submitEvent(event) {
        event.preventDefault()

        //Para tornar válido o formato de data dd/mm/aaaa, pois a api espera o formato new date aaaa/mm/dd.
        //A data vai separar os parâmetros na /
        const [day, month, year] = form.date.split('/');

        try {
            //Validações para dar dinamicidade (tornarem automáticas) às propriedades abaixo
            await api.post('/transacao', {

                tipo: choice === 'in' ? 'entrada' : 'saida',
                descricao: form.description,
                valor: form.value,
                data: new Date(`${year}-${month}-${day}`),
                categoria_id: form.category.id
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                })

            close(); //Para acionar o fechamento do modal
            setForm({ ...defaultForm })

            const everyTransaction = await loadTransactions(); //loadTransactions vem de requisitions
            setTransactions([...everyTransaction])//Para adicionar automaticamento a nova transação ao estado
        } catch (error) {

        }
    }

    useEffect(() => {
        //É Preciso fazer uma função ao redor da const senão o useEffect acusa erro
        async function receiveEveryCategorie() {
            const everyCategorie = await fillCategories();

            //o setCategories recebe todo o conteúdo do everyCategorie
            setCategories([...everyCategorie])
        }
        receiveEveryCategorie()
    }, [])

    useEffect(() => {

        if (editPresentItem) {
            //São propriedades da transação do backend
            const { categoria_id, categoria_nome, data, descricao, tipo, valor } = editPresentItem;


            setForm({
                value: valor,
                category: {
                    id: categoria_id,
                    name: categoria_nome
                },
                date: dayFormat(data),
                description: descricao
            })

            setChoice(tipo === 'entrada' ? 'in' : 'out')
        }

    }, [editPresentItem]) //Será aberto toda vez que o editPresentitem for invocado

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
                                    type='number'
                                    required />
                            </div>
                            <div className='inputs-container'>
                                <label>Categorial</label>
                                <select
                                    onChange={changeSelect}
                                    name='category'
                                    value={form.category.name}
                                    required>
                                    <option>Selecione</option>
                                    {/*Para percorrer as categorias contidas na api e preencher os selects */}
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
                                    type='text'
                                    required />
                            </div>
                            <div className='inputs-container'>
                                <label>Descrição</label>
                                <input
                                    onChange={changeForm}
                                    name='description'
                                    value={form.description}
                                    type='text'
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

export default EditTransactionModal;