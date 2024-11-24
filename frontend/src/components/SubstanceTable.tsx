import React, {useState} from "react";
import {Col, Row, Table, Card, Button, Form, Modal, Container, Tabs, Tab} from "react-bootstrap";
import SubstanceImage from "./SubstanceImage";
import FormulaFormatter from "./FormulaFormatter";
import "./SubstanceTable.css"
import {Id, Selected, Substance, Unit} from "../@types/chemicals";
import SubstanceDetail from "./SubstanceDetail";
import DataRow from "./DataRow";

interface SubstanceCardParams {
    units: Unit[],
    substance: Substance | undefined,
    selection: Selected[],
    setSelection: React.Dispatch<React.SetStateAction<Selected[]>>,
    setDetail: React.Dispatch<React.SetStateAction<Substance | undefined>>
}

const SubstanceCard: React.FC<SubstanceCardParams> = ({units, substance, selection, setSelection, setDetail}) => {

    if (substance) {
    const setSelected = () => {
        selection.includes(substance.id)
            ? setSelection(selection.filter(item => item !== substance.id))
            : setSelection([substance.id, ...selection])
    }
    return (
        <Card key={substance.id} className="mb-2">
            <Card.Header>
                <Row className={"align-items-center"}>
                    <Col xs={1}>
                        <Form style={{float: 'left'}}>
                            <Form.Check
                                checked={selection.includes(substance.id)}
                                onChange={setSelected}
                            />
                        </Form>
                    </Col>
                    <Col
                        xs={11}
                        className="fs-5 text-lg-start text-wrap"
                        onClick={() => setDetail(substance)}
                        style={{cursor: 'pointer'}}
                    >
                        <span>{substance.name} {substance.label ? <span>({substance.label})</span> : null}</span>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col xs={2} className={"position-relative"}>
                        {substance.image
                            ? <SubstanceImage
                                className={"position-absolute top-50 start-50 translate-middle"}
                                path={substance.image}
                                onClick={() => setDetail(substance)}
                              />
                            : null}
                    </Col>
                    <Col xs={5}>
                        <Table borderless>
                            <tbody>
                                <DataRow
                                    name={"CAS"}
                                    data={substance.cas}
                                    edit={false}
                                />
                                <DataRow
                                    name={"formula"}
                                    data={substance.formula}
                                    text={<FormulaFormatter formula={substance.formula}/>}
                                    edit={false}
                                />
                                <DataRow
                                    name={"molar mass"}
                                    data={substance.mol_weight}
                                    unitId={substance.mol_weight_unit}
                                    edit={false}
                                />
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={5}>
                        <Table borderless>
                            <tbody>
                                <DataRow
                                    name={"synonyms"}
                                    data={substance.synonyms}
                                    edit={false}
                                />
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )}
    return <></>
}

interface ChemSubTableParams {
    units: Unit[]
    substances: Substance[]
    selected: Selected[]
    setSelected: React.Dispatch<React.SetStateAction<Selected[]>>
}

const SubstanceTable: React.FC<ChemSubTableParams> = ({units, substances, selected, setSelected}) => {
    let [detail, setDetail] = useState<Substance | undefined>(undefined)

    if (substances.length === 0) return(<Row>No data available.</Row>)
    return(
        <>
            {substances.map((substance: Substance) => (
                <SubstanceCard
                    key={substance.id}
                    units={units}
                    substance={substance}
                    selection={selected}
                    setSelection={setSelected}
                    setDetail={setDetail}
                />
            ))}
            <SubstanceDetail
                substance={detail}
                setDetail={setDetail}
            />
        </>
    )
}

export default SubstanceTable