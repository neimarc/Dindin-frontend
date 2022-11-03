import './table-styles.css';
import EditIcon from '../../assets/edit-icon.svg';
import DeleteIcon from '../../assets/delete-icon.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import ArrowDown from '../../assets/arrow-down.svg';
import { useState } from 'react';
import ConfirmModal from '../confirm-modal/confirm-index';


function Table() {
    const [arrowUp, setArrowUp] = useState(true); //Para mudar a seta para baixo ou para cima
    const [openModal, setOpenModal] = useState(false); //Para esconder (false) ou mostrar o modal (true)
    
    function occultModal() {
        console.log('delete');
        setOpenModal(false);
;    }
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

            <div className='table-body'>
                <div className='table-line'>
                    <strong className='table-column-small date-column'>11/04/2022</strong>
                    <span className='table-column-middle'>Segunda</span>
                    <span className='table-column-big'>Venda de um Palio</span>
                    <span className='table-column-small'>Vendas</span>
                    <strong className='table-column-small'>R$ 12.000,00</strong>
                    <div className='table-column-small hand-buttons'>
                        <img src={EditIcon} alt='edit' />
                        <img src={DeleteIcon} alt='delete' 
                        onClick={() => setOpenModal(true)}/> {/*Para quando clicar no ícone o modal aparecer*/}

                    </div>
                    <ConfirmModal 
                    open={openModal} 
                    close={() => setOpenModal(false)}
                    confirm={occultModal}/>
                </div>
            </div>

        </div>
    )
}

export default Table;