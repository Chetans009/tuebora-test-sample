import UserIam from "./pages/UserIam";
import IamContext from "./context/iam-context";

import "./App.css";

function App() {
  //Iam Types
  const types = [
    {
      id: 1,
      name: "User Management",
    },
    {
      id: 2,
      name: "Account Management",
    },
  ];

  //User Schema
  const userConfig = {
    id: 1,
    heading: "User Management",
    configs: {
      tabs: [
        {
          name: "All",
          id: "all",
        },
        {
          id: "team_users",
          name: "My Team Users",
        },
      ],
      search: {
        layout: 8,
        placeholder: "Search Users",
        allowedFields: [
          "firstName",
          "lastName",
          "manager.name",
          "employeeId",
          "permissions",
        ],
        allowedFilters: [
          {
            name: "location",
            type: "dropdown",
            values: [
              "Bangalore",
              "Delhi",
              "Mumbai",
              "Chennai",
              "Coimbatore",
              "Austin",
              "Boston",
            ],
            field: "location"
          },
          {
            name: "manager",
            type: "text",
            field: "manager.name"
          },
        ],
      },
    },
  };

  //Account Schema
  const accountConfig = {
    id: 2,
    heading: "Account Management",
    configs: {
      tabs: [
        {
          name: "All Accounts",
          id: "all_accounts",
        },
        {
          id: "orphaned_accounts",
          name: "Orphaned Accounts",
        },
      ],
      search: {
        layout: 8,
        placeholder: "Search Accounts",
        allowedFields: [
          "account.name",
          "account.description",
          "account.createdBy",
        ],
        allowedFilters: [
          {
            name: "account.createdOn",
            type: "date",
            field: "account.id"
          },
          {
            name: "account.id",
            type: "text",
            operator: "eq",
            field: "account.id"
          },
        ],
      },
    },
  };

  return (
    <IamContext.Provider
      value={{
        types: types,
        userConfig: userConfig,
        accountConfig: accountConfig,
      }}
    >
      <UserIam />
    </IamContext.Provider>
  );
}

export default App;
