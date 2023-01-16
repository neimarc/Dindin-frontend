import { useEffect, useState } from 'react';
import './filter-styles.css';
import FilterIcon from '../../assets/filter-icon.svg'
import Tag from '../tag/tag-index';
import { fillCategories, loadTransactions } from '../../utils/requisitions';
function Filter({ transactions, setTransactions }) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    async function clearFilters() {
        const categoriesArea = [...categories];
        categoriesArea.forEach(categ => categ.checked = false)
        setCategories([...categoriesArea])
        const everyTransaction = await loadTransactions();
        setTransactions([...everyTransaction])
    }
    async function ApplyFilter() {
        const transactionArea = await loadTransactions();
        setTransactions([...transactionArea])
        const checkedCategories = [];
        categories.forEach((categ) => {
            if (categ.checked) {
                checkedCategories.push(categ.id)
            }
        })
        if (!checkedCategories.length) {
            return;
        }
        const filteredTransactions = transactionArea.filter((trans) =>
            checkedCategories.includes(trans.categoria_id))
        setTransactions([...filteredTransactions])
    }
    useEffect(() => {
        async function receiveEveryCategorie() {
            const everyCategorie = await fillCategories();
            everyCategorie.forEach(categ => {
                categ.checked = false
            });
            setCategories([...everyCategorie])
        }
        if (open) {
            receiveEveryCategorie()
        }
    }, [open])
    return (
        <div className='filter-box'>
            <button onClick={() => setOpen(!open)}
                className='btn-filter btn-white'>
                <img src={FilterIcon} alt='filter' /> Filtrar</button>
            {open &&
                <div className='filter-body'>
                    <strong>Categoria</strong>
                    <div className='categories-content'>

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
                        <button
                            className='btn-white btn-extra-small'
                            onClick={clearFilters}>
                            Limpar Filtros
                        </button>
                        <button
                            className='btn-purple btn-extra-small'
                            onClick={ApplyFilter}>
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
export default Filter;