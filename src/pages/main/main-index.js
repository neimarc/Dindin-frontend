import './main-styles.css';
import Header from '../../components/header/header-index';
import Table from '../../components/table/table-index';

function Main() {
    return (
        <div className='container-main'>
            <Header/>

            <section>
                <Table/>
            </section>
        </div>
    )
}

export default Main;