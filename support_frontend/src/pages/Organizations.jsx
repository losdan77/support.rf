import OrganizationList from "../components/OrganizationList";
import axios from "axios"
import { useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import { useState } from "react";
import Spiner from "../components/Spiner";
import "../styles/Organizations.css"

const Organizations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [filter, setFilter] = useState("");
    const [fetchOrganizations, isLoading, error] = useFetching( async () => {
        const response = await getOrganization(filter);
        setOrganizations(response.data);
    })

    async function getOrganization() {
        try {
            const response = await axios.get(`http://localhost:8000/organizations/find_organization_or_person?name_organization=${filter}`);
            return response;
        }
        catch(error) {
            alert("Ошибка сервера");
        }
            
    }

    useEffect( () => {
        fetchOrganizations(filter); // eslint-disable-next-line
      }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchOrganizations(filter);
        }, 500);

        return () => clearTimeout(delayDebounceFn); // eslint-disable-next-line
    }, [filter]);

    return (
        <div className="organizationsPage">
            <div className="d-flex justify-content-center">
                <div className="input-group" style={{maxWidth: '60vw'}}>
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
            <div className="d-flex justify-content-center">
                {error
                    ? <h1 className="errorOrganizations">Ошибка {error}</h1> :
                    isLoading
                        ? <Spiner/> :
                        (organizations.length === 0)
                        ? <h1 className="titleOrganizations">Организаций или пользователей не найдено</h1> :
                <OrganizationList organizations={organizations} title="Список организаций и пользователей:"/>
                }
            </div>
        </div>
    );
}

export default Organizations;