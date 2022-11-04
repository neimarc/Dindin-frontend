import './main-styles.css';
import Header from '../../components/header/header-index';
import Table from '../../components/table/table-index';
import ResumeTable from '../../components/resume-table/resume-index';
import ProfileModal from '../../components/profile-modal/profile-index';
import { useState } from 'react';

function Main() {

    const [openProfile, setOpenProfile] = useState(false); //Para abrir o modal do profile

    return (
        <div className='container-main'>
        {/* No Header está o ícone do profile que ativa o modal e a declaraçao da prop editProfile */}
            <Header editProfile={() => setOpenProfile(true)}/>

            <section>
                <div className='width-limit'> {/*Para limitar o tamanho da sessão com a tabela */}
                    <button>Filtros</button>
                    <div className='container-data'>
                        <Table/>

                        <div className='right-side'> {/*O lado direito da página*/}
                        <ResumeTable/>
                        <button className='btn-purple btn-small'>Adicionar Registro</button>
                        </div>
                    </div>
                </div>
            </section>
            <ProfileModal
            open={openProfile}
            close={() => setOpenProfile(false)}/> {/*Para fechar o modal profile */}
        </div>
    )
}

export default Main;