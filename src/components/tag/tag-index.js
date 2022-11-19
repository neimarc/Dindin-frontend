import './tag-styles.css';

function Tag({ title, checked, id, categories, setCategories }) {

    function categorieChecked() {
        const categoriesArea = [...categories];

        categoriesArea.forEach((categ) => {
            if (categ.id === id) {
                categ.checked = !categ.checked
            }
        })

        setCategories([...categoriesArea])

    }

    return (
        <div className={`${checked ? 'checked' : 'unchecked'} tag-box`}>
            <span>{title}</span>
            {checked ? 'x' : '+'}
        </div>
    )
}

export default Tag;