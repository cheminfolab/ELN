import {Accordion, Form, FormControl} from "react-bootstrap";
// https://getbootstrap.com/docs/5.0/examples/sidebars/#
// https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap

const ChemSidebarComp = () => (
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
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


export default ChemSidebarComp