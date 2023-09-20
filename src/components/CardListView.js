import {useState, useEffect} from 'react';
import {BsCheckCircle} from 'react-icons/bs';
import {BiCircle} from 'react-icons/bi';

const CardListView = props => {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        console.log(props.usersList);
        if(props.usersList && props.usersList.length > 0) {
            setUserList(props.usersList);
        } else {
            setUserList([]);
        }
    },[props.usersList]);


    return (
        <>
        <div className="w-full h-full grid grid-cols-3">
            {props.activeTab === 1 && userList.length > 0 && userList.map((user, idx) => {
                return (
                    <div className="w-[95%] card mx-2 px-2 my-2 text-sm" key={idx}>
                        <div className="card-body">
                            <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                            <div className='flex flex-row'>
                                <label>Manager</label>: <span className='font-bold ml-2'> {user.manager[0].name}</span>
                                <label className='ml-2'>Employee Id</label>: <span className='font-bold ml-2'> {user.employeeId}</span>
                            </div>

                            <div className='w-full py-2'>
                                <label className='font-bold'>User Provisioning Status</label>
                                <div>
                                        <ul className="w-full flex flex-row justify-between py-2 px-6">
                                            <li className=''>{user.provisioningStatus[0].completed >= 1? <BsCheckCircle color="green" size={20}/>: <BiCircle size={20}/>}</li>
                                            <li className="active">{user.provisioningStatus[0].completed >= 2? <BsCheckCircle color="green" size={20}/>: <BiCircle size={20}/>}</li>
                                            <li className=''>{user.provisioningStatus[0].completed >= 3? <BsCheckCircle color="green" size={20}/>: <BiCircle size={20}/>}</li>
                                            <li className=''>{user.provisioningStatus[0].completed >= 4? <BsCheckCircle color="green" size={20}/>: <BiCircle size={20}/>}</li>
                                        </ul>
                                </div>
                            </div>
                            <div className=''>
                                <label className='font-bold'>Permissions</label>
                                <ul className="w-full py-1 list-disc">
                                    {user.permissions.map((permission, idx) => {
                                        return (
                                            <li key={`permission_${idx}`}>{permission}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })}

            {props.activeTab === 2 && userList.length > 0 && userList.map((user, idx) => {
                return (
                    <div className="w-[95%] card mx-2 px-2 my-2 text-sm" key={idx}>
                        <div className="card-body">
                            <h5 className="card-title">{user.account.name}</h5>
                            <div className='flex flex-row text-xs'>
                                <label>Created By</label>: <span className='font-bold ml-2'> {user.account.createdBy}</span>
                                <label className='ml-2'>Created On</label>: <span className='font-bold ml-2'> {new Date(user.account.createdOn ).toLocaleDateString()}</span>
                            </div>
                            <div className='py-4'>
                                <label className='font-bold'>Description</label>
                                <ul className="w-full py-2 list-disc">
                                    {user.account.description !== '' && user.account.description}
                                    {user.account.description === '' && ('NA')}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        {userList.length === 0 && (<div className='text-center mx-3 my-3'>No Results Found</div>)}
        </>
    )
}

export default CardListView;