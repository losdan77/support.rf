import { Link } from "react-router-dom";

const Paginator = ({page, pagesArray, totalPages, setPage}) => {
    const getPagesToShow = () => {
        const range = 2; // количество соседних страниц до и после текущей
        const start = Math.max(1, page - range);
        const end = Math.min(totalPages, page + range);
        const pages = [];

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pagesToShow = getPagesToShow();

    return(
        <nav aria-label="...">
            <ul className="pagination">
                <li 
                    className={page === 1 ? "page-item disabled" : "page-item"}
                    onClick={page === 1 ? null : () => setPage(page - 1)}
                >
                    <Link className="page-link">Прошлая</Link>
                </li>
                {pagesToShow.map(p =>
                    <li 
                        key={p} 
                        className={page === p ? "page-item active" : "page-item"}
                        onClick={() => setPage(p)}
                    >
                        <Link className="page-link">{p}</Link>
                    </li>
                )}
                <li 
                    className={page === totalPages ? "page-item disabled" : "page-item"}
                    onClick={page === totalPages ? null : () => setPage(page + 1)}
                >
                    <Link className="page-link">Следующая</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Paginator;