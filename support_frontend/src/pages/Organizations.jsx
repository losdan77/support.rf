import axios from "axios"
import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/pages";
import OrganizationList from "../components/OrganizationList";
import Spiner from "../components/Spiner";
import Paginator from "../components/Paginator";
import "../styles/Organizations.css"

const Organizations = () => {
    const API_URL = process.env.REACT_APP_API_URL; 
    const [organizations, setOrganizations] = useState([]);
    const [filter, setFilter] = useState("");
    const [totalOrganizationsPages, setTotalOrganizationsPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    let pagesArray = getPagesArray(totalOrganizationsPages);
    const [fetchOrganizations, isLoading, error] = useFetching( async () => {
        const response = await getOrganization(filter);
        setOrganizations(response.data);
    })

    async function getOrganization() {
        try {
            const response = await axios.get(`${API_URL}/organizations/find_organization_or_person?name_organization=${filter}&limit=${limit}&page=${page}`);
            return response;
        }
        catch(error) {
            alert("Ошибка сервера");
        }       
    }

    async function getOrganizationCount() {
        try {
            const response = await axios.get(`${API_URL}/organizations/get_organization_count_by_filter?text=${filter}`);
            setTotalOrganizationsPages(getPageCount(response.data.count, limit));
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    useEffect( () => {
        getOrganizationCount();
        fetchOrganizations(filter); // eslint-disable-next-line
      }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setPage(1);
            fetchOrganizations(filter);
            getOrganizationCount();
        }, 500);

        return () => clearTimeout(delayDebounceFn); // eslint-disable-next-line
    }, [filter]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchOrganizations(filter);
            getOrganizationCount();
        }, 500);

        return () => clearTimeout(delayDebounceFn); // eslint-disable-next-line
    }, [page]);

    return (
        <div className="organizationsPage">
            <div className="d-flex justify-content-center">
                <div className="input-group" style={{}}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupPrepend2">Поиск</span>
                    </div>
                    <input 
                        type="text"
                        className="form-control"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        placeholder="Введите имя пользователя или название организации..."
                    />
                </div>
            </div>
            <div>
                {error
                    ? <h1 className="errorOrganizations">Ошибка {error}</h1> :
                    isLoading
                        ? <Spiner/> :
                        (organizations.length === 0)
                        ? <h1 className="titleOrganizations">Организаций или пользователей не найдено</h1> :
                <OrganizationList organizations={organizations} title="Список организаций и пользователей:"/>
                }
                <Paginator page={page} pagesArray={pagesArray} totalPages={totalOrganizationsPages} setPage={setPage}/>
            </div>
        </div>
    );
}

export default Organizations;