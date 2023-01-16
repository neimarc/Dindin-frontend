import './confirm-styles.css'
function ConfirmModal({ open, close, confirm }) {
    return (
        <>
            { }
            {open &&
                <div className='confirm-box'>
                    <div className='arrow-up'></div>
                    <span>Apagar item?</span>
                    <div className='container-buttons'>
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