import { useEffect, useState } from 'react';
import './filter-styles.css';
import FilterIcon from '../../assets/filter-icon.svg'
import Tag from '../tag/tag-index';
import { fillCategories, loadTransactions } from '../../utils/requisitions';


function Filter({ transactions, setTransactions }) {

    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);


    //Para limpar filtros
    async function clearFilters() {
        const categoriesArea = [...categories]; //Para pegar as categorias
        categoriesArea.forEach(categ => categ.checked = false) //Por ser uma expressão simples, não precisa abrir chaves
        
        setCategories([...categoriesArea]) //Para receber todas as categorias negadas

        const everyTransaction = await loadTransactions();

        setTransactions([...everyTransaction]) //Para quando clicar em limpar filtros, recarregue todas as transações

    }

    //Para filtrar todas as transações selecionadas de acordo com parâmetro pesquisado
    async function ApplyFilter() {
        const transactionArea = await loadTransactions(); //Se não tiver nenhuma categoria selecionada, então traz todas que já estão
        setTransactions([...transactionArea]) //Atualizando com todas as transações

        const checkedCategories = [];

        categories.forEach((categ) => {
            if (categ.checked) {
                checkedCategories.push(categ.id) //Para armazenar todas as informações de id das categorias pesquisadas
            }
        })

        //Isso !checkedCategories.length é igual a checkedCategories.length === 0
        if (!checkedCategories.length) {
            
            return;
        }

        //Verifica se nas transações têm o id das categorias filtradas (coincidência de id). Se sim, armazena na constante filteredTransactions
        const filteredTransactions = transactionArea.filter((trans) =>
            checkedCategories.includes(trans.categoria_id))

        //Atualiza o setTransactions com os transações filtradas
        setTransactions([...filteredTransactions])
    }

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