import './resume-styles.css';

function ResumeTable() {

    return (
        <div className='resume-box'>
            <h1>Resumo</h1>

            <div className='resume-line' >
                <span>Entradas</span>
                <span className='in'>1500</span>
            </div>

            <div className='resume-line' >
                <span>Saídas</span>
                <span className='out'>500</span>
            </div>

            <div className='line'></div>

            <div className='resume-line' >
                <h3>Saldo</h3>
                <span className='balance'>1000</span>
            </div>

        </div>
    )
}

export default ResumeTable;