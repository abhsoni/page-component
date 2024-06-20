function ListRow({ title, checked, onCheckboxChange }) {
    return (
        <div className="flex justify-between items-center mb-2 text-sm py-2 px-2">
            <span>{title}</span>
            <input 
            type="checkbox" 
            className="checkBox" 
            checked={checked} 
            onChange={onCheckboxChange} 
            />
        </div>
    );
}
export default ListRow; 
