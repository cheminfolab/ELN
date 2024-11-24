import React, {useContext, useEffect, useState} from "react";
import {Col, Container, Pagination, Row} from "react-bootstrap";
import useAxios from "../hooks/useAxios";
import SubstanceTable from "../components/SubstanceTable";
import ChemContext from "../contexts/ChemContext";
import {ChemContextType, Selected} from "../@types/chemicals";
import {SubstanceSidebar, SubstanceNavbar} from "../components/Navbars";


export const SubstancePage: React.FC = () => {

    const api = useAxios(true)

    const {
        units,
        setUnits,
        substances,
        setSubstances
    } = useContext(ChemContext) as ChemContextType

    let [selection, setSelection] = useState<Selected[]>([])

    useEffect(() => {
        api
            .getAll('/unit/')
            .then(res => setUnits(res))
            .catch(error => console.log('getAll error:', error))
        api
            .getAll('/substance/')
            .then(res => setSubstances(res))
            .catch(error => console.log('getAll error:', error))
    }, [])

    return (
        <Container fluid>
            <Row className="mb-2 mt-2">
                <Col xs={2}>
                    <h3>Substances</h3>
                </Col>
                <Col xs={10}>
                    <SubstanceNavbar
                        substances={substances}
                        selected={selection}
                        setSelected={setSelection}
                    />
                </Col>
            </Row>
            <Row xs="auto">
                <Col xs={2} id="sidebar-wrapper">
                    <SubstanceSidebar/>
                </Col>
                <Col  xs={10} id="page-content-wrapper">
                    <div className="overflow-auto">
                        {/* todo: overflow not working */}
                        <SubstanceTable
                            units={units}
                            substances={substances}
                            selected={selection}
                            setSelected={setSelection}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={2}/>
                <Col xs={9}>
                    <Pagination className="d-flex justify-content-center">
                      <Pagination.First />
                      <Pagination.Prev />
                      <Pagination.Item>{1}</Pagination.Item>
                      <Pagination.Ellipsis />

                      <Pagination.Item>{10}</Pagination.Item>
                      <Pagination.Item>{11}</Pagination.Item>
                      <Pagination.Item active>{12}</Pagination.Item>
                      <Pagination.Item>{13}</Pagination.Item>
                      <Pagination.Item disabled>{14}</Pagination.Item>

                      <Pagination.Ellipsis />
                      <Pagination.Item>{20}</Pagination.Item>
                      <Pagination.Next />
                      <Pagination.Last />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
}