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
    const [openProfile, setOpenProfile] = useState(false);
    const [openTransactionModal, setOpenTransactionModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [editPresentItem, setEditPresentItem] = useState(null)

    useEffect(() => {

        async function receiveEveryTransaction() {
            const everyTransaction = await loadTransactions()
            setTransactions([...everyTransaction])
        }
        receiveEveryTransaction()
    }, [])
    return (
        <div className='container-main'>

            <Header editProfile={() => setOpenProfile(true)} />
            <section>
                <div className='width-limit'>
                    <div className='container-data'>

                        <div className='left-side'>
                            <Filter />
                            <Table
                                transactions={transactions}
                                setTransactions={setTransactions}
                                setOpenModalEdit={setOpenModalEdit}
                                setEditPresentItem={setEditPresentItem}
                            />
                        </div>

                        <div className='right-side'>
                            <ResumeTable />
                            <button className='btn-purple btn-small'
                                onClick={() => setOpenTransactionModal(true)}
                                setTransactions={transactions}>
                                Adicionar Registro</button>
                        </div>
                    </div>
                </div>
            </section>
            <TransactionModal
                open={openTransactionModal}
                close={() => setOpenTransactionModal(false)}
                setTransactions={setTransactions}
            />
            <EditTransactionModal
                open={openModalEdit}
                setTransactions={setTransactions}
                close={() => setOpenModalEdit(false)}
                editPresentItem={editPresentItem} />
            <ProfileModal
                open={openProfile}
                close={() => setOpenProfile(false)} />
        </div>
    )
}
export default Main;