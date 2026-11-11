const Table = ({
    columns = [],
    data = [],
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                        {columns.map((column) => (
                            <th
                                key={column.accessor}
                                className={`
                                px-4 py-3
                                text-left
                                font-semibold
                                text-slate-600
                                dark:text-slate-300
                                `}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className="
                                border-b
                                border-slate-100
                                dark:border-slate-800
                                hover:bg-slate-50
                                dark:hover:bg-slate-800
                                dark:text-slate-300
                            "
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.accessor}
                                    className="px-4 py-3"
                                >
                                    {column.render
                                        ? column.render(row)
                                        : row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;