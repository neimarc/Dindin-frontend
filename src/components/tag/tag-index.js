import './tag-styles.css';

function Tag({ title, checked }) {
    return (
        <div className={`${checked ? 'checked' : 'unchecked'} tag-box`}>
            <span>{title}</span>
            {checked ? 'x' : '+'}
        </div>
    )
}

export default Tag;