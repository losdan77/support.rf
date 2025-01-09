import OrganizationItem from "./OrganizationItem";

const OrganizationList = ({organizations, title}) => {
    return (
        <div className="Organizations">
            <p className="text-start fs-2 mt-2">{title}</p>
            {organizations.map(organization =>
                <OrganizationItem organization={organization} key={organization.id}/>
            )}
        </div>
    );
}

export default OrganizationList;