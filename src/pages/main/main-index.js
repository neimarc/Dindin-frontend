import './main-styles.css';
import Header from '../../components/header/header-index';
import Table from '../../components/table/table-index';
import ResumeTable from '../../components/resume-table/resume-index';
import ProfileModal from '../../components/profile-modal/profile-index';
import { useEffect, useState } from 'react';
import TransactionModal from '../../components/transaction-modal/transaction-index';
import Filter from '../../components/filter/filter-index';
import { loadTransactions } from '../../utils/requisitions'
import EditTransactionModal from '../../components/edit-transaction-modal copy/edit-transaction-index';


function Main() {

    const [openProfile, setOpenProfile] = useState(false); //Para abrir o modal do profile
    const [openTransactionModal, setOpenTransactionModal] = useState(false);
    const [transactions, setTransactions] = useState([]); //Serão passadas na table
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [editPresentItem, setEditPresentItem] = useState(null)

    //Na primeiro renderização vai ativar a loadTransactions
    useEffect(() => {
        //É Preciso fazer uma função ao redor da const senão o useEffect acusa erro
        async function receiveEveryTransaction() {
            const everyTransaction = await loadTransactions()

            setTransactions([...everyTransaction])
        }


        receiveEveryTransaction()
    }, [])

    return (
        <div className='container-main'>
            {/* No Header está o ícone do profile e a declaraçao da prop editProfile que ativa o modal  */}
            <Header editProfile={() => setOpenProfile(true)} />

            <section>
                <div className='width-limit'> {/*Para limitar o tamanho da sessão com a tabela */}
                    <div className='container-data'>
                        <div className='left-side'>
                            <Filter />
                            <Table
                                transactions={transactions}
                                setTransactions={setTransactions} {/*Vem do Table*/}
                                setOpenModalEdit={setOpenModalEdit}
                                setEditPresentItem={setEditPresentItem}

                            />
                        </div>
                        <div className='right-side'> {/*O lado direito da página*/}
                            <ResumeTable />
                            <button className='btn-purple btn-small'
                                onClick={() => setOpenTransactionModal(true)}
                                setTransactions={transactions}> {/*Para atualizar os valores do resumo*/}
                                Adicionar Registro</button>
                        </div>
                    </div>
                </div>
            </section>

            <TransactionModal
                open={openTransactionModal}
                close={() => setOpenTransactionModal(false)} //Lógica de fechar o modal de adicionar transação
                setTransactions={setTransactions}//Para perceber a inserção de novas transaçōes
            // As propos do modal de transação são declaradas em transaction-index.js

            />
            <EditTransactionModal
                open={openModalEdit}
                setTransactions={setTransactions}
                close={() => setOpenModalEdit(false)}
                editPresentItem={editPresentItem} />

            <ProfileModal
                open={openProfile}
                close={() => setOpenProfile(false)} /> {/*Para fechar o modal profile */}
        </div>
    )
}

export default Main;