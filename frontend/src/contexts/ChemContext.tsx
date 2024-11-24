import {createContext, useState} from "react";
import {ChemContextType, Selected, Substance, Unit} from "../@types/chemicals";

const ChemContext = createContext<ChemContextType | {}>({})
export default ChemContext

export const ChemProvider = ({children}: any) => {

    let [units, setUnits] = useState<Unit[]>([])
    let [substances, setSubstances] = useState<Substance[]>([])

    let contextData = {
        units,
        setUnits,
        substances,
        setSubstances
    }

    return(
        <ChemContext.Provider value={contextData}>
            {/*{loading ? null : children}*/}
            {children}
        </ChemContext.Provider>
    )
}