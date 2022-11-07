import { useState } from 'react';
import './filter-styles.css';
import FilterIcon from '../../assets/filter-icon.svg'
import Tag from '../tag/tag-index';


function Filter() {

    const [open, setOpen] = useState(false);


    return (
        <div className='filter-box'>
            {/* Se o open está setado como false, quando clicar o setOpen se torna true (open negado) e mostra o modal */}
            <button onClick={() => setOpen(!open)}
                className='btn-filter btn-white'>
                <img src={FilterIcon} alt='filter' /> Filtrar</button>

            {open &&
                <div className='filter-body'>
                    <strong>Categoria</strong>

                    <div className='categories-content'>
                        <Tag title='Compras' checked />
                        <Tag title='Vendas' checked={false} />
                    </div>

                    <div className='buttons-filter'>
                        <button className='btn-white btn-extra-small'>Limpar Filtros</button>
                        <button className='btn-purple btn-extra-small'>Aplicar Filtros</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Filter;