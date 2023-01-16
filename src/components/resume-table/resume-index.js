import './resume-styles.css';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import { useEffect, useState } from 'react';
import { moneyFormat } from '../../utils/formatter';

function ResumeTable({ transactions }) {

    const [extract, setExtract] = useState({
        in: 0,
        out: 0,
        balance: 0
    })

    const token = getItem('token');

    async function extractLoad() {

        try {
            const response = await api.get('transacao/extrato', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const { entrada, saida } = response.data;


            setExtract({
                in: moneyFormat(entrada),
                out: moneyFormat(saida),
                balance: moneyFormat(entrada - saida)
            })

        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {

        extractLoad()
    }, [transactions])

    return (
        <div className='resume-box'>
            <h1>Resumo</h1>

            <div className='resume-line' >
                <span>Entradas</span>
                <span className='in'>{extract.in}</span>
            </div>

            <div className='resume-line' >
                <span>Saídas</span>
                <span className='out'>{extract.out}</span>
            </div>

            <div className='line'></div>

            <div className='resume-line' >
                <h3>Saldo</h3>
                <span className='balance'>{extract.balance}</span>
            </div>

        </div>
    )
}

export default ResumeTable;