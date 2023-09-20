import {useState, useEffect} from 'react';

const ListView = props => {
    const [userData, setUserData] = useState([]);
    const [activeTab, setActiveTab] = useState();
    useEffect(() => {
        console.log(props.usersList);
        if(props.usersList && props.usersList.length > 0) {
            setUserData(props.usersList);
            console.log(userData);
        } else {
            setUserData([]);
        }

        setActiveTab(props.activeTab);

    },[props.usersList, props.activeTab]);

    const userContent = () => {
        return (
            <tr>
                <th scope="col">#</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Employee Id</th>
                <th scope="col">Location</th>
                <th scope="col">Manager</th>
            </tr>
        )
    }

    const accountContent = () => {
        return (
            <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">created On</th>
                <th scope="col">created By</th>
            </tr>
        )
    }

    return (
        <div>
            <table className="table">
            <thead>
                {props.activeTab === 1 && userContent()}
                {props.activeTab === 2 && accountContent()}
            </thead>
            <tbody>
                {props.activeTab === 1 && userData.length > 0 && userData.map((user, idx) => {
                    return ( <tr key={user.employeeId}>
                        <th scope="row">{idx+1}</th>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.employeeId}</td>
                        <td>{user.location}</td>
                        <td>{user.manager[0].name}</td>
                    </tr>
                    )
                })}

                {props.activeTab === 2 && userData.length > 0 && userData.map((user, idx) => {
                    return ( <tr key={user.employeeId}>
                        <th scope="row">{idx+1}</th>
                        <td>{user.account.name}</td>
                        <td>{user.account.createdOn}</td>
                        <td>{user.account.createdBy}</td>
                    </tr>
                    )
                })} 
                {userData.length === 0 && (<tr><td colSpan={5}>No Results Found</td></tr>)}
                
            </tbody>
            </table>
        </div>
    )
}

export default ListView;