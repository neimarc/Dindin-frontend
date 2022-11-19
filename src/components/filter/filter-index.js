import { useEffect, useState } from 'react';
import './filter-styles.css';
import FilterIcon from '../../assets/filter-icon.svg'
import Tag from '../tag/tag-index';
import { fillCategories } from '../../utils/requisitions';


function Filter({ transactions, setTransactions }) {

    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function receiveEveryCategorie() {
            const everyCategorie = await fillCategories();
            //Para prencher de azul somente a categoria selecionada.
            everyCategorie.forEach(categ => {
                categ.checked = false
            });

            setCategories([...everyCategorie])
        }
        //Para não fazer uma requisição quando fechar o filtro e garantir que sempre que abra o 
        //filtro ele vai caregar corretamente
        if (open) {
            receiveEveryCategorie()
        }

    }, [open])


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
                        {/* Para aplicar dinamismo às adições das tags*/}
                        {categories.map((categ) => (
                            <Tag
                                key={categ.id}
                                id={categ.id}
                                checked={categ.checked}
                                title={categ.descricao}
                                categories={categories}
                                setCategories={setCategories}
                            />

                        ))}

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