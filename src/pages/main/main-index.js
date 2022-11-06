import './main-styles.css';
import Header from '../../components/header/header-index';
import Table from '../../components/table/table-index';
import ResumeTable from '../../components/resume-table/resume-index';
import ProfileModal from '../../components/profile-modal/profile-index';
import { useState } from 'react';
import TransactionModal from '../../components/transaction-modal/transaction-index';
import Filter from '../../components/filter/filter-index';


function Main() {

    const [openProfile, setOpenProfile] = useState(false); //Para abrir o modal do profile
    const [openTransactionModal, setOpenTransactionModal] = useState(false);

    return (
        <div className='container-main'>
            {/* No Header está o ícone do profile e a declaraçao da prop editProfile que ativa o modal  */}
            <Header editProfile={() => setOpenProfile(true)} />

            <section>
                <div className='width-limit'> {/*Para limitar o tamanho da sessão com a tabela */}
                    <Filter />
                    <div className='container-data'>
                        <Table />

                        <div className='right-side'> {/*O lado direito da página*/}
                            <ResumeTable />
                            <button className='btn-purple btn-small'
                                onClick={() => setOpenTransactionModal(true)}>
                                Adicionar Registro</button>
                        </div>
                    </div>
                </div>
            </section>

            <ProfileModal
                open={openProfile}
                close={() => setOpenProfile(false)} /> {/*Para fechar o modal profile */}
            <TransactionModal
                open={openTransactionModal}
                close={() => setOpenTransactionModal(false)} //Lógica de fechar o modal de adicionar transação
            // As propos do modal de transação são declaradas em transaction-index.js
            />

        </div>
    )
}

export default Main;