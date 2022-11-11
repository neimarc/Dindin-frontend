import './table-styles.css';
import EditIcon from '../../assets/edit-icon.svg';
import DeleteIcon from '../../assets/delete-icon.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import ArrowDown from '../../assets/arrow-down.svg';
import { useState } from 'react';
import ConfirmModal from '../confirm-modal/confirm-index';
import { dateFormat, dayFormat, moneyFormat } from '../../utils/formatter'

// Transactions vem da Main
function Table({ transactions }) {
    const [arrowUp, setArrowUp] = useState(true); //Para mudar a seta para baixo ou para cima
    const [openModal, setOpenModal] = useState(false); //Para esconder (false) ou mostrar o modal (true)

    function occultModal() {
        console.log('delete');
        setOpenModal(false);
        ;
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
                        <strong className='table-column-small'>{moneyFormat(trans.valor)}</strong> {/*Para formatar o valor recebido */}
                        <div className='table-column-small hand-buttons'>
                            <img src={EditIcon} alt='edit' />
                            <img src={DeleteIcon} alt='delete'
                                onClick={() => setOpenModal(true)} /> {/*Para quando clicar no ícone o modal aparecer*/}

                        </div>
                        <ConfirmModal
                            open={openModal}
                            close={() => setOpenModal(false)}
                            confirm={occultModal} />
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Table;