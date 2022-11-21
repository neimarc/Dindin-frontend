import './table-styles.css';
import EditIcon from '../../assets/edit-icon.svg';
import DeleteIcon from '../../assets/delete-icon.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import ArrowDown from '../../assets/arrow-down.svg';
import { useState } from 'react';
import ConfirmModal from '../confirm-modal/confirm-index';
import { dateFormat, dayFormat, moneyFormat } from '../../utils/formatter'
import api from '../../services/api'
import { getItem } from '../../utils/storage'
import { loadTransactions } from '../../utils/requisitions';

// Transactions vem da Main
function Table({ transactions, setTransactions }) {
    const [arrowUp, setArrowUp] = useState(true); //Para mudar a seta para baixo ou para cima
    const [openModal, setOpenModal] = useState(false); //Para esconder (false) ou mostrar o modal (true)
    const [presentItem, setPresentItem] = useState(null); // Para armazenar em qual item se clicou

    const token = getItem('token')

    function openConfirm(trans) {
        setPresentItem(trans); //Para saber em qual item foi clicado
        setOpenModal(!openModal) // Para conseguir fechar o modal de apagar transação
    }

    async function occultModal() {
        try {
            const response = await api.delete(`/transacao/${presentItem.id}`, {//Para deletar a transação selecionada pelo id
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status > 204) {
                return
            }

            //Se conseguiu deletar a transação deve fazer o reload das transações para trocar o valor do setTransactions
            const everyTransaction = await loadTransactions();

            setTransactions([...everyTransaction])

        } catch (error) {
        }

        //Independentemente de dar certo ou errado vai terminar executando isso
        finally {
            setOpenModal(false);
        }

    }
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

            {/* As propriedades id, data, descricao, categoria_nome e valor, abaixo, foram tiradas da documentação da api */}

            <div className='table-body'>
                {transactions.map((trans) => (
                    <div className='table-line' key={trans.id}>
                        <strong className='table-column-small date-column'>{dateFormat(trans.data)}</strong> {/*Para formatar a data*/}
                        <span className='table-column-middle'>{dayFormat(trans.data)}</span>
                        <span className='table-column-big'>{trans.descricao}</span>
                        <span className='table-column-small'>{trans.categoria_nome}</span>
                        <strong className={`table-column-small ${trans.tipo === 'entrada' ? 'positive-value' :
                            'negative-value'}`}>{moneyFormat(trans.valor)}</strong> {/* Função para formatar o valor recebido. A classe posi. e neg. -value é para mudar a cor do valor */}
                        <div className='table-column-small hand-buttons'>
                            <img src={EditIcon} alt='edit' />
                            <img src={DeleteIcon} alt='delete'
                                onClick={() => openConfirm(trans)} /> {/*Para quando clicar no ícone o modal aparecer*/}

                        </div>
                        <ConfirmModal
                            close={() => setOpenModal(false)}
                            confirm={occultModal}
                            open={openModal && trans.id === presentItem.id} /> {/*Só vai abri se openModal for igual a true e se trans.id for = 
                            transação que foi clicada(a present.id). Para prevenir que abra o modal de apagar para todas as transações*/}
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Table;