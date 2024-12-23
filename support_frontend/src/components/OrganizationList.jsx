import OrganizationItem from "./OrganizationItem";

const OrganizationList = ({organizations, title}) => {
    return (
        <div className="Organizations">
            <h1 className="titleOrganizations">{title}</h1>
            {organizations.map(organization =>
                <OrganizationItem organization={organization} key={organization.id}/>
            )}
        </div>
    );
}

export default OrganizationList;