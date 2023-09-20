import {useEffect, useState} from 'react';

const SubTabs = props => {
    const [subTabs, setSubTabs] = useState([]);
    
    useEffect(() => {
        setSubTabs(props.subTabs);
    },[props.subTabs])

    const onSetSubTabHandler = (id) => {
        if(props.activeSubTab !== id)
            props.setSubTab(id)
      }

    return (
        <div className="w-[80%] my-4 ">
            <ul className="nav nav-tabs">
                {subTabs && subTabs.map((subTab) => {
                    return(
                        <li className="nav-item cursor-pointer" key={subTab.name}>
                            <a className={`${props.activeSubTab === subTab.id ? "active " : ""} nav-link `} onClick={() => onSetSubTabHandler(subTab.id)} href="#">{subTab.name}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SubTabs;