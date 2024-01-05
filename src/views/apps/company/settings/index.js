// PaymentTerms.js

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Button, Table, Form, Label, Input } from 'reactstrap';
import { fetchPrefixData, setPrefixData } from '../../../../utility/api';
import Sidebar from "@components/sidebar";
import toast from "react-hot-toast";
import { X } from 'react-feather';

function PaymentTerms() {

  const [prefix, setPrefix] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {

    fetchPrefixData().then((response) => {
      setPrefix(response.data)
    });
  }, [])

  const toggleSidebar = () => setOpen(!open);
  const ToastContent = ({ t, content }) => {
    return (
      <div className="d-flex">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            <X
              size={15}
              color="#FF0000"
              className="cursor-pointer"
              onClick={() => toast.dismiss(t.id)}
            />
          </div>
          <span className=" px-2 py-2">{content}</span>
        </div>
      </div>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const invoiceFirst = event.target.querySelector("#invoiceFirst").value;
    const invoicePrefix = event.target.querySelector("#invoicePrefix").value;
    const estimateFirst = event.target.querySelector("#estimateFirst").value;
    const estimatePrefix = event.target.querySelector("#estimatePrefix").value;
    const newPrefix = {
      invoiceFirst,
      invoicePrefix,
      estimateFirst,
      estimatePrefix

    }
    try {
      const response = await setPrefixData(newPrefix);
      if (response.error) {
        throw new error(response.error)
      }
      toggleSidebar();
      toast((t) => (
        <ToastContent t={t} content="Configured Successfully" />
      ));
      fetchPrefixData().then((response) => {
        setPrefix(response.data)
      });


    } catch {
      toast((t) => (
        <ToastContent t={t} content="Error While Configuring" />
      ));
    }
  }

  return (
    <div>
      <Row>
        <Col xl={6} md={6} sm={6}>
          <Card>
            <CardHeader>
              <h4>Payment Terms</h4>
            </CardHeader>
            <CardBody>
              <Button color="primary" className="mt-2" tag="a" href="/apps/company/paymentTerms">
                Manage Payment Terms
              </Button>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h4>Invoice & Estimate Settings</h4>
            </CardHeader>
            <CardBody>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Invoice Prefix</td>
                    <td>{prefix.invoicePrefix}</td>
                  </tr>
                  <tr>
                    <td>First Invoice Number</td>
                    <td>{prefix.invoiceFirst}</td>
                  </tr>
                  <tr>
                    <td>Estimate Prefix</td>
                    <td>{prefix.estimatePrefix}</td>
                  </tr>
                  <tr>
                    <td>First Estimate Number</td>
                    <td>{prefix.estimateFirst}</td>
                  </tr>
                </tbody>
              </Table>
              <br></br>
              <Button onClick={toggleSidebar} color='primary'>
                Configure
              </Button>
            </CardBody>
          </Card>

        </Col>
        <Col xl={6} md={6} sm={6}>
        </Col>
      </Row>
      <Sidebar
        size="lg"
        open={open}
        title="Configure Prefix & Starting Values"
        headerClassName="mb-1"
        contentClassName="p-0"
        toggleSidebar={toggleSidebar}
      >
        <Form onSubmit={handleSubmit}>
          {/* onSubmit={handleSubmit} */}
          <div className="mb-2">
            <Label for="invoicePrefix" className="form-label">
              Invoice Prefix
            </Label>
            <Input id="invoicePrefix" placeholder={prefix.invoicePrefix} />
          </div>
          <div className="mb-2">
            <Label for="invoiceFirst" className="form-label">
              Starting Invoice Number
            </Label>
            <Input type="number" id="invoiceFirst" placeholder={prefix.invoiceFirst}/>
          </div>
          <div className="mb-2">
            <Label for="estimatePrefix" className="form-label">
              Estimate Prefix
            </Label>
            <Input id="estimatePrefix" placeholder={prefix.estimatePrefix} />
          </div>
          <div className="mb-2">
            <Label for="estimateFirst" className="form-label">
              Starting Estimate Number
            </Label>
            <Input type="number" id="estimateFirst" placeholder={prefix.estimateFirst}/>
          </div>



          <div className="d-flex flex-wrap my-2">
            <Button className="me-1" color="primary" type="submit">
              Configure
            </Button>
            <Button color="secondary" onClick={() => setOpen(false)} outline>
              Cancel
            </Button>
          </div>
        </Form>
      </Sidebar>
    </div>
  );
}

export default PaymentTerms;
