import './transaction.css';
import CloseIcon from '../../assets/close-icon.svg'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/storage'
import { fillCategories, loadTransactions } from '../../utils/requisitions.js'
import { dayFormat } from '../../utils/formatter'
const defaultForm = {
    category: {
        id: '',
        name: ''
    },
    description: '',
    date: '',
    value: ''
}
function EditTransactionModal({ open, close, setTransactions, editPresentItem }) {
    const token = getItem('token');
    const [choice, setChoice] = useState('out');
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ defaultForm })
    function changeForm(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    function changeSelect(event) {
        const actualCategory = categories.find((categ) => categ.descricao === event.target.value);
        if (!actualCategory) {
            return
        }
        setForm({ ...form, category: { id: actualCategory.id, name: actualCategory.descricao } })
    }
    async function submitEvent(event) {
        event.preventDefault()
        const [day, month, year] = form.date.split('/');
        try {
            await api.put(`/transacao/${editPresentItem.id}`, {
                tipo: choice === 'in' ? 'entrada' : 'saida',
                descricao: form.description,
                valor: form.value,
                data: new Date(`${year}-${month}-${day}`),
                categoria_id: form.category.id
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            close();
            setForm({ ...defaultForm })
            const everyTransaction = await loadTransactions();
            setTransactions([...everyTransaction])
        } catch (error) {
        }
    }
    useEffect(() => {
        async function receiveEveryCategorie() {
            const everyCategorie = await fillCategories();
            setCategories([...everyCategorie])
        }
        receiveEveryCategorie()
    }, [])
    useEffect(() => {
        if (editPresentItem) {
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
    }, [editPresentItem])
    return (
        <>
            {open &&
                <div className='outside-back'>
                    <div className='modal transaction'>
                        <img className='button-close'
                            src={CloseIcon}
                            alt='close-button'
                            onClick={close} />
                        <h2>Editar Registro</h2>
                        <div className='options-box'>

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