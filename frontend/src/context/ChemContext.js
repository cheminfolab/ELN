import {createContext} from "@types/react";

const ChemContext = createContext({})
export default ChemContext

export const ChemProvider = ({children}) => {

    let getContainerList
    let getContainer

    let contextData = {
        // ContainerList:ContainerList,
        // Container:Container,
        // show:show  // in context or on table page?
    }
    return(
        <ChemContext.Provider value={contextData}>
            {/*{loading ? null : children}*/}
        </ChemContext.Provider>
    )
}