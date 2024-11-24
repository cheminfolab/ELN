import React, {useContext} from 'react';
import {
    Accordion,
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
    Row
} from 'react-bootstrap';
import {Link} from "react-router-dom";

import AuthContext from "../context/AuthContext"
import {AuthContextType} from "../@types/authorization"

import Logo from "../flask.png"
import {Selected, Substance} from "../@types/chemicals";


export const MainNavbar: React.FC = () => {

    let {user, logoutUser} = useContext(AuthContext) as AuthContextType

    return (
        <div>
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand as={Link} to={"/"}>
                    <img
                      alt="Flask logo"
                      src={Logo}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                    />{' '}
                    FLASK
                </Navbar.Brand>
                {/*<a href="https://www.flaticon.com/free-icons/experimentation" title="experimentation icons">Experimentation icons created by Freepik - Flaticon</a>*/}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to={"/projects"}>Projects</Nav.Link>
                    <NavDropdown title="Inventory" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"/chemicals"}>Chemicals</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"/substances"}>Substances</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"/#"}>Equipment</NavDropdown.Item>

                        <NavDropdown.Divider />

                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to={"/"}>Wiki</Nav.Link>
                    <Nav.Link as={Link} to={"/"}>Analytics</Nav.Link>
                  </Nav>
                  <Form className="d-flex mx-auto">
                    <FormControl
                      type="search"
                      placeholder="Search (inactive)"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success" disabled>Search</Button>
                  </Form>
                  <Nav className="mr-auto">
                      <DropdownButton
                        id={`dropdown-variants-secondary`}
                        variant={'secondary'}
                        title={<i className="bi bi-gear"></i>}
                      >
                        <Dropdown.Item eventKey="1">Settings</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Profile</Dropdown.Item>

                        <Dropdown.Divider />

                        {user ? (
                            <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
                        ):(
                            <Dropdown.Item as={Link} to={"/login"}>Login</Dropdown.Item>
                        )}
                      </DropdownButton>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </div>
    );
}

interface SubstanceNavbarParams {
    substances: Substance[],
    selected: Selected[],
    setSelected: React.Dispatch<React.SetStateAction<Selected[]>>
}

export const SubstanceNavbar: React.FC<SubstanceNavbarParams> = ({substances, selected, setSelected}) => {
    const checkAll = () => {
        selected.length === substances.length
            ? setSelected([])
            : setSelected(substances.map(substance => substance.id))
    }
    return (
        <Card>
            <Card.Header>
                <Row className={"align-items-center"}>
                    <Col xs={1}>
                        <Nav className="me-auto">
                            <Form>
                                <Form.Check
                                    id="select-all"
                                    type="checkbox"
                                    label="all"
                                    onChange={checkAll}
                                    checked={selected.length === substances.length}
                                />
                            </Form>
                        </Nav>
                    </Col>
                    <Col xs={4}>
                        <Nav className="me-auto d-flex justify-content-center">
                            <NavDropdown title={<i className="bi bi-plus-square"/>} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-sticky"/> empty
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-subtract"/> copy from existent
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-upc-scan"/> from UPC
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-qr-code"/> from QR
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-database-add"></i> from database
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to={"#"} disabled={selected.length !== 1}>
                                <i className="bi bi-pencil-square"/>
                            </Nav.Link>
                            <Nav.Link as={Link} to={"#"} disabled={selected.length === 0}>
                                <i className="bi bi-tag"/>
                            </Nav.Link>
                            <Nav.Link as={Link} to={"#"} disabled={selected.length === 0}>
                                <i className="bi bi-trash"/>
                            </Nav.Link>
                            {/* edit mode: */}
                            {/*<Nav.Link as={Link} to={"#"}><i className="bi bi-arrow-left-square"/></Nav.Link>*/}
                            {/*<Nav.Link as={Link} to={"#"}><i className="bi bi-arrow-right-square"/></Nav.Link>*/}
                        </Nav>
                    </Col>
                    <Col xs={3}>
                        <Nav className="d-flex justify-content-center">
                            <Nav.Link as={Link} to={"#"} disabled={selected.length === 0}>
                                <i className="bi bi-share"/>
                            </Nav.Link>
                            <Nav.Link as={Link} to={"#"} disabled={selected.length === 0}>
                                <i className="bi bi-database"/>
                            </Nav.Link>
                            <Nav.Link as={Link} to={"#"} disabled={selected.length !== 1}>
                                <i className="bi bi-cart3"/>
                            </Nav.Link>
                            {/*<Nav.Link as={Link} to={"#"}><i className="bi bi-bag-check"/></Nav.Link>*/}
                            {/*<Nav.Link as={Link} to={"#"}><i className="bi bi-bag-plus"/></Nav.Link>*/}
                        </Nav>
                    </Col>
                    <Col xs={3}>
                        <Nav className="me-auto d-flex justify-content-center">
                            <NavDropdown title={<i className="bi bi-arrow-down-up"/>} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-save"/> save
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-plus-square-dotted"/> upload
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title={<i className="bi bi-file-earmark-arrow-down"/>} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"#"}><i
                                    className="bi bi-file-earmark-pdf"/> pdf</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-file-earmark-word"/> Word
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-file-earmark-code"/> LaTeX
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">
                                    <i className="bi bi-file-earmark-spreadsheet"/> csv
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-file-earmark-code"/> JSON
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-file-earmark-code"/> SQL
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4"><i
                                    className="bi bi-file-earmark-zip"/> zip</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title={<i className="bi bi-sliders"/>} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <Row>
                                        <Col className="d-flex justify-content-left">
                                            <i className="bi bi-sort-down"/> sort
                                        </Col>
                                        <Col className="d-flex justify-content-right">
                                            <i className="bi bi-chevron-right"/>
                                        </Col>
                                    </Row>
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-list-ul"/> list
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"#"}>
                                    <i className="bi bi-grid"/> grid
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Col>
                    <Col xs={1}>
                        <Nav className="me-auto d-flex justify-content-right">
                            {/*<Nav.Link as={Link} to={"#"}><i className="bi bi-three-dots"/></Nav.Link>*/}
                            <Nav.Link as={Link} to={"#"}><i className="bi bi-question-square"/></Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Card.Header>
        </Card>
    )
}

// https://getbootstrap.com/docs/5.0/examples/sidebars/#
// https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap
export const SubstanceSidebar: React.FC = () => (
    <div>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Filter</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <FormControl
                            type="search"
                            placeholder="CAS, InChI, name..."
                            className="me-2 mb-3"
                            aria-label="Search"
                        />

                        <div key={`default-checkbox`} className="mb-3">
                            <Form.Check
                                type={'checkbox'}
                                id={`default-checkbox`}
                                label={`default checkbox`}
                            />
                            <Form.Check
                                disabled
                                type={'checkbox'}
                                label={`disabled checkbox`}
                                id={`disabled-default-checkbox`}
                            />
                        </div>

                        <div key={`default-radio`} className="mb-3">
                            <Form.Check
                                type={'radio'}
                                id={`default-radio`}
                                label={`default radio`}
                            />
                            <Form.Check
                                disabled
                                type={'radio'}
                                label={`disabled radio`}
                                id={`disabled-default-radio`}
                            />
                        </div>

                        {/*{ // todo: use FormCheckType*/}
                        {/*    ["checkbox", "radio"].map((checkType) => ( // checkType: "checkbox" | "radio" | "switch"*/}
                        {/*    ))}*/}
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Check this switch"
                        />
                        <Form.Check
                            disabled
                            type="switch"
                            label="disabled switch"
                            id="disabled-custom-switch"
                        />
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Locations and Owners</Accordion.Header>
                <Accordion.Body>
                    <Form.Check
                        type="radio"
                        id={`default-radio`}
                        label={"Huber"}
                    />
                    Lorem ipsum dolor sit amet, ...
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Properties</Accordion.Header>
                <Accordion.Body>
                    formula<br/>
                    labels:

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
)