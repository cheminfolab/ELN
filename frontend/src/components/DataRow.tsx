import {ChemContextType, Id, Unit} from "../@types/chemicals";
import React, {useContext} from "react";
import ChemContext from "../context/ChemContext";

interface DataRowParams {
    name: string,
    data: any,
    edit: boolean,
    text?: any,
    unitId?: Id,
}

// TODO: revise! (rewrite + better unit handling)
const DataRow: React.FC<DataRowParams> = ({name, data, edit, text = undefined, unitId = undefined}) => {

    const {units} = useContext(ChemContext) as ChemContextType

    // data formatter
    if ((data?.constructor !== Array) && !edit && units !== undefined) return (
        <tr>
            <td className={"py-0"}>
                <b>{name}:</b>
            </td>
            <td
                className={"py-0"} onClick={() => navigator.clipboard.writeText(data)}
                style={{cursor: 'pointer'}}
            >
                {text
                    ? text
                    : data === null || data === ""
                        ? <span>-</span>
                        : unitId
                            ? <span>{data} {
                                units ? "unit" : null // units.find((unit: Unit) => unit.id === unitId).symbol : ""
                            }</span>
                            : <span>{data}</span>
                }
            </td>
        </tr>
    )

    if (!edit) return(
        <tr>
            <td rowSpan={data.length? data.length : 1} className={"py-0"}>
                <b>{name}:</b>
            </td>
            <td className={"py-0"}>
                {!data.length
                    ? <span>-</span>
                    : data.map(
                        (item: string, index: number) =>
                            <span
                                key={index}
                                className={"p-0"} onClick={() => navigator.clipboard.writeText(item)}
                                style={{cursor: 'pointer'}}
                            >
                                {item} {unitId ? "unit" : null // units.find(u => u.id === unitId).symbol : null
                                }<br/>
                            </span>
                    )
                }
            </td>
        </tr>
    )
    return(
        <tr>
            <td rowSpan={data.length} className={"py-0"}>
                <b>{name}:</b>
            </td>
            <td className={"py-0"}>
                {data.map((item: string) =>
                    <tr className={"p-0"}>
                        <td className={"p-0"} onClick={() => navigator.clipboard.writeText(item)}>
                            {item} {unitId ? "unit" : null // units.find(u => u.id === unitId).symbol : null
                            }
                        </td>
                    </tr>)
                }
            </td>
        </tr>
    )
}

export default DataRow