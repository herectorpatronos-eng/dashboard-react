const SearchInput = ({
    value,
    onChange,
    placeholder = "Pesquisar..."
}) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="
                w-full
                px-4 py-2
                border
                rounded-lg
                text-sm
                border-slate-300
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
            "
        />
    );
};

export default SearchInput;