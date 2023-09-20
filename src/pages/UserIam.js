import { useContext, useState, useEffect } from "react";

import Tabs from "../components/Tabs";
import Search from "../components/Search";
import Filter from "../components/Filter";
import SubTabs from "../components/SubTabs";
import ListViewType from "../components/ListViewType";
import Pagination from "../components/Pagination";
import CardListView from "../components/CardListView";
import ListView from "../components/ListView";
import IamContext from "../context/iam-context";

const userContent = {
  users: [
    {
      id: 1,
      firstName: "Adam",
      lastName: "George",
      account: {
        id: "ACC1",
        name: "adam.george@tuebora.com",
        description: "Completed the setup",
        createdOn: "2024-07-11 10:11:21",
        createdBy: "Robert Williams",
      },
      location: "Bangalore",
      manager: [
        {
          name: "Adam Gray",
          id: 5,
        },
      ],
      employeeId: "A123",
      provisioningStatus: [
        {
          completed: 2,
          completedOn: "2024-07-11 10:11:21",
        },
      ],
      permissions: [
        "Business Administrator (Office 365 membership)",
        "Create Group in Active Directory",
        "xanadu financials (CFS) allow",
      ],
    },
    {
      id: 2,
      firstName: "Eric",
      lastName: "Hill",
      account: {
        id: null,
        name: "eric.hill@tuebora.com",
        description: "",
        createdOn: "2024-07-11 10:11:21",
        createdBy: "Robert Williams",
      },
      location: "Austin",
      manager: [
        {
          name: "Adam Gray",
          id: 5,
        },
      ],
      employeeId: "A1234",
      provisioningStatus: [
        {
          completed: 1,
          completedOn: "2024-04-11 10:11:21",
        },
      ],
      permissions: [
        "Business Administrator (Office 365 membership)",
        "Create Group in Active Directory",
      ],
    },
    {
      id: 3,
      firstName: "Adam",
      lastName: "Pisapia",
      account: {
        id: "ACC3",
        name: "adam.pisapia@tuebora.com",
        description: "",
        createdOn: "2024-07-11 10:11:21",
        createdBy: "Robert Williams",
      },
      location: "Bangalore",
      manager: [
        {
          name: "Adam Gray",
          id: 5,
        },
      ],
      employeeId: "A1235",
      provisioningStatus: [
        {
          completed: 4,
          completedOn: "2024-08-11 10:11:21",
        },
      ],
      permissions: [
        "Business Administrator (Office 365 membership)",
        "Create Group in Active Directory",
      ],
    },
  ]
};

const UserIam = (props) => {
  const iamContext = useContext(IamContext);
  const [activeType, setActiveType] = useState(1);
  const [activeSubTab, setActiveSubTab] = useState("all");
  const [userData, setUserData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [subTabConfig, setSubTabConfig] = useState();
  const [listType, setListType] = useState("card");
  const [recordsList, setRecordsList] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filterSearch, setFilterSearch] = useState({});

  const recordPerPage = 3;

  const onSetTabHandler = (id) => {
    setActiveType(id);
    if (id === 1) {
      setActiveSubTab(iamContext.userConfig.configs.tabs[0].id);
      setSubTabConfig(iamContext.userConfig);
    } else {
      setActiveSubTab(iamContext.accountConfig.configs.tabs[0].id)
      setSubTabConfig(iamContext.accountConfig);
    }
  };

  const onSetSubTabHandler = (id) => {
    setActiveSubTab(id);
  };

  const onSetViewTypeHandler = (type) => {
    setListType(type);
  };

  const onPageChangeHandler = (page) => {
    if(userData && userData.users){
      setCurrentPage(page);
      let currentPage = Math.ceil((page - 1) / recordPerPage) + 1;
      console.log(currentPage);
      console.log(userData.users.slice((currentPage - 1), page * recordPerPage));
      setRecordsList(userData.users.slice((currentPage - 1), page * recordPerPage));
    }
  };

  const onSearchHandler = (search) => {
    setSearchItem(search);
    let userResults = userContent;
    if(Object.keys(filterSearch).length > 0){
      userResults = userData;
    }
    let filterResult = []
    if( search !== ''){
        filterResult = userResults.users.filter((user) => {
            const searchFound = subTabConfig.configs.search.allowedFields.find((field) => {
                let fieldItemArray = field.split('.');
                if( fieldItemArray.length > 1 ){
                    if(Array.isArray(user[fieldItemArray[0]])){
                      const found = user[fieldItemArray[0]].find((item) => {
                          return item[fieldItemArray[1]] && item[fieldItemArray[1]].includes(search);
                      });
                      return found;
                    } else{
                      return user[fieldItemArray[0]][fieldItemArray[1]] && user[fieldItemArray[0]][fieldItemArray[1]].includes(search);
                    }
                } else if( fieldItemArray.length === 1) {
                    if(Array.isArray(user[fieldItemArray[0]])){
                        const foundIt = user[fieldItemArray[0]].find((resItem) => {
                            return resItem && resItem.includes(search);
                        });
                        return foundIt;
                    } else{
                        return user[fieldItemArray[0]] && user[fieldItemArray[0]].includes(search);
                    }
                    
                    
                }
                return false;
            })
            return searchFound;
        })
    } else {
        filterResult = userResults.users;
    }
    setUserData({...userData, users: filterResult});
  };

  const searchByFilter = (filterData) => {
    setFilterSearch(filterData)
    let userResults = userContent;
    let filterResult = [];
    let filterKeys = Object.keys(filterData);
    if(searchItem !== ''){
      userResults = userData;
    }

    filterResult = userResults.users.filter((user) => {
        let result = true;
        const searchFound = filterKeys.find((field) => {
            let fieldItemArray = field.split('.');
            if( fieldItemArray.length > 1 ){
              if(Array.isArray(user[fieldItemArray[0]])){
                user[fieldItemArray[0]].find((item) => {
                    if(!(item[fieldItemArray[1]] && item[fieldItemArray[1]].includes(filterData[field].searchValue)))
                        result = false;
                });
              } else {
                if(!(user[fieldItemArray[0]][fieldItemArray[1]] && user[fieldItemArray[0]][fieldItemArray[1]].includes(filterData[field].searchValue)))
                        result = false;
              }
            } else if( fieldItemArray.length === 1) {
                if(Array.isArray(user[fieldItemArray[0]])){
                    user[fieldItemArray[0]].find((resItem) => {
                        if(!(resItem && resItem.includes(filterData[field].searchValue))){
                            result = false;
                        }
                    });
                } else if(!(user[fieldItemArray[0]] && user[fieldItemArray[0]].includes(filterData[field].searchValue))) {
                    result = false;
                }
                    
            }
        })
        return result;
    })
    setFilterSearch(filterData);
    setUserData({...userData, users: filterResult});
  }

  useEffect(() => {
    if(userData && userData.users){
        setTotalCount(userData.users.length);
        onPageChangeHandler(currentPage);
    }  
  }, [userData]);

  useEffect(() => {
    setUserData(userContent);
    setTotalCount(userContent.users.length);
    if (activeType === 1) {
      setSubTabConfig(iamContext.userConfig);
    } else {
      setSubTabConfig(iamContext.accountConfig);
    }
    onPageChangeHandler(currentPage);
  }, []);

  return (
    <div className="w-full h-screen px-5 py-5">
      <div>
        <Tabs
          types={iamContext.types}
          activeType={activeType}
          setTab={onSetTabHandler}
        />
      </div>
      <div className="flex flex-row justify-between">
        <Search onSearch={onSearchHandler}/> {subTabConfig && <Filter filterConfigs={subTabConfig.configs.search.allowedFilters} searchByFilter={searchByFilter}/>}
      </div>

      <div className="flex flex-row justify-between">
        {subTabConfig && <SubTabs
          subTabs={subTabConfig.configs.tabs}
          activeSubTab={activeSubTab}
          setSubTab={onSetSubTabHandler}
        />}
        <ListViewType listType={listType} setViewType={onSetViewTypeHandler} />
      </div>

      <div className="w-full h-auto">
        {listType === "card" && <CardListView usersList={recordsList} activeTab={activeType}/>}
        {listType === "list" && <ListView usersList={recordsList} activeTab={activeType}/>}
      </div>

      <div>
        {totalCount > 0 && <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          recordsPerPage={recordPerPage}
          setPageChange={onPageChangeHandler}
        /> }
      </div>
    </div>
  );
};

export default UserIam;
