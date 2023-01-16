import './table-styles.css';
import EditIcon from '../../assets/edit-icon.svg';
import DeleteIcon from '../../assets/delete-icon.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import ArrowDown from '../../assets/arrow-down.svg';
import { useEffect, useState } from 'react';
import ConfirmModal from '../confirm-modal/confirm-index';
import { dateFormat, dayFormat, moneyFormat } from '../../utils/formatter'
import api from '../../services/api'
import { getItem } from '../../utils/storage'
import { loadTransactions } from '../../utils/requisitions';
function Table({ transactions, setTransactions, setEditPresentItem, setOpenModalEdit }) {
    const [arrowUp, setArrowUp] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [presentItem, setPresentItem] = useState(null);
    const [sortingTransactions, setSortingTransactions] = useState([]);
    const token = getItem('token')
    function openConfirm(trans) {
        setPresentItem(trans);
        setOpenModal(!openModal)
    }
    async function occultModal() {
        try {
            const response = await api.delete(`/transacao/${presentItem.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status > 204) {
                return
            }

            const everyTransaction = await loadTransactions();
            setTransactions([...everyTransaction])
        } catch (error) {
        }

        finally {
            setOpenModal(false);
        }
    }
    function openEdit(trans) {
        setOpenModalEdit(true);
        setEditPresentItem(trans);

    }
    useEffect(() => {
        const transactionArea = [...transactions];

        if (arrowUp) {

            transactionArea.sort((a, b) => new Date(a.data) - new Date(b.data));
            setSortingTransactions([...transactionArea]);
            return
        }

        transactionArea.sort((a, b) => new Date(b.data) - new Date(a.data));
        setSortingTransactions([...transactionArea]);
        setSortingTransactions([...transactionArea])
    }, [arrowUp, transactions])
    return (
        <div className='container-table'>
            <div className='table-head'>
                <div className='table-column-small date-column'
                    onClick={() => setArrowUp(!arrowUp)}>
                    <strong >Data</strong>
                    <img src={arrowUp ? ArrowUp : ArrowDown} alt='arrow-up'></img>
                </div>
                <strong className='table-column-middle'>Dia da semana</strong>
                <strong className='table-column-big'>Descrição</strong>
                <strong className='table-column-small'>Categoria</strong>
                <strong className='table-column-small'>Valor</strong>
                <div className='table-column-small'></div>
            </div>
            { }
            <div className='table-body'>
                {sortingTransactions.map((trans) => (
                    <div className='table-line' key={trans.id}>
                        <strong className='table-column-small date-column'>{dateFormat(trans.data)}</strong>
                        <span className='table-column-middle'>{dayFormat(trans.data)}</span>
                        <span className='table-column-big'>{trans.descricao}</span>
                        <span className='table-column-small'>{trans.categoria_nome}</span>
                        <strong className={`table-column-small ${trans.tipo === 'entrada' ? 'positive-value' :
                            'negative-value'}`}>{moneyFormat(trans.valor)}</strong>
                        <div className='table-column-small hand-buttons'>
                            <img
                                src={EditIcon} alt='edit' onClick={() => openEdit(trans)}
                            />
                            <img
                                src={DeleteIcon} alt='delete'
                                onClick={() => openConfirm(trans)}
                            />
                        </div>
                        <ConfirmModal
                            close={() => setOpenModal(false)}
                            confirm={occultModal}
                            open={openModal && trans.id === presentItem.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Table;