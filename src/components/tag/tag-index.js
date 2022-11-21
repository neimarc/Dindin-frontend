import './tag-styles.css';

function Tag({ title, checked, id, categories, setCategories }) {

    // Para encontrar a categoria atual está sendo usado do id como prop, que será localizado dentro 
    //do array de categorias e modificar o checked para true ou false

    function categorieChecked() {
        // Array de categorias para dentro da constante categoriesArea
        const categoriesArea = [...categories];

        //Se o categ.id for = ao recebido como prop, inverte-se o valor dele: se true, false e vice-versa
        categoriesArea.forEach((categ) => {
            if (categ.id === id) {
                categ.checked = !categ.checked
            }
        })

        //Passando o categoriesArea para dentro da função que altera o estado das categorias
        setCategories([...categoriesArea])

    }

    return (
        <div
            className={`${checked ? 'checked' : 'unchecked'} tag-box`}
            onClick={categorieChecked}>
            <span>{title}</span>
            {checked ? 'x' : '+'} {/*As categorias checadas terão um x, as outras terão um +*/}
        </div>
    )
}

export default Tag;