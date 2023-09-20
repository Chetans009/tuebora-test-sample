import { createContext } from "react";

const IamContext = createContext({
    types: [],
    userConfig: {},
    accountConfig: {}
});

export default IamContext;