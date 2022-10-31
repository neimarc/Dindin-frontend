import './main-styles.css';
import Header from '../../components/header/header-index';
import Table from '../../components/table/table-index';
import ResumeTable from '../../components/resume-table/resume-index';

function Main() {
    return (
        <div className='container-main'>
            <Header/>

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
        </div>
    )
}

export default Main;