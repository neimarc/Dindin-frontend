import './confirm-styles.css'

// O argumento open para setar a abertura do modal, close para fechar e confirm para quando pressionar o botão
function ConfirmModal(open, close, confirm) {
    return (
        <>
        {/* Se o open for verdadeiro, então exibe o modal */}
         {open &&
            <div className='confirm-box'>
                <div className='arrow-up'></div>
                <span>Apagar item?</span>
                <div className='container-buttons'>
                {/* Essas funções estão declaradas onde são importadas, na main */}
                    <button className='btn-extra-small btn-blue' 
                    onClick={confirm}>Sim</button>
                    <button className='btn-extra-small btn-red'
                     onClick={close}>Não</button>
                </div>
            </div>
        }
        </>
    )
}

export default ConfirmModal;