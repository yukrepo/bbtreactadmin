import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Button,
  Input,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

import InvoiceFive from "../../../apps/invoice/recent";
import styled from "styled-components";


const InvoicesInfo = (props) => {
  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-start pb-1">
        <div>
          <CardTitle className="mb-25" tag="h4">
            Last Five Invoices
          </CardTitle>
        </div> 
      </CardHeader>
      <CardBody>        
        <InvoiceFive></InvoiceFive>
        <Row>
          <Col lg="12" md="12" sm="12">
            <Button tag={Link} to="/apps/invoice/add" color="primary" style={{ marginRight: "8px" }}>
              Add Invoice
            </Button>
            <Button tag={Link} to="/apps/invoice/drafts" color="primary" className="ml-2">
              See All Drafts
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default InvoicesInfo;

