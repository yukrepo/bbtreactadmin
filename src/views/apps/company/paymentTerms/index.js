import React, { useState, useEffect } from 'react';
import { fetchPaymentTerms, addPaymentTerm, deletePaymentTerms } from '../../../../utility/api';
import { selectThemeColors } from "@utils";
import toast from "react-hot-toast";
import { X } from 'react-feather';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  InputGroup,
  InputGroupText,
  CardHeader,
  Table
} from "reactstrap"
import { error } from 'jquery';


function PaymentTerms() {

  const [paymentTerm, setPaymentTerm] = useState([]);

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

  useEffect(() => {

    fetchPaymentTerms().then((response) => {
      setPaymentTerm(response.data)
    });
  }, [])

  const handleAddPaymentTerm = async (event) => {
    event.preventDefault();

    const name = event.target.querySelector("#name").value;
    const days = Number(event.target.querySelector("#days").value);

    try {
      const newPay = {
        "name": name,
        "days": days
      }

      const response = await addPaymentTerm(newPay);
      if (response.error) {
        throw new error(response);
      }

      event.target.querySelector("#name").value = ""
      event.target.querySelector("#days").value = 0



      toast((t) => (
        <ToastContent t={t} content="Payment Term Added Successfully." />
      ));

      fetchPaymentTerms().then((response) => {
        setPaymentTerm(response.data);
      });

    } catch {
      toast(t => (
        <ToastContent t={t} content="Failed to Add Payment Term." />
      ))
    }

  };

  const handleDeletePaymentTerm = async (id) => {

    try {
      const response = await deletePaymentTerms(id);
      if (response.error) {
        throw new error(response)
      }
      toast(t => (
        <ToastContent t={t} content="Payment Term deleted." />
      ))
      fetchPaymentTerms().then((response) => {
        setPaymentTerm(response.data);
      });
    } catch {
      toast(t => (
        <ToastContent t={t} content="Cant Delete Payment Term" />
      ))
    }


  }

  const toggleSidebar = () => setOpen(!open);



  return (
    <div>
      <Row>
        <Col xl={6} md={6} sm={12}>
          <Card>
            <CardHeader>
              <h4>Payment Terms</h4>
            </CardHeader>
            <CardBody>
              {paymentTerm.length === 0 ? (
                <p>No Payment Terms found. Please Add.</p>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Days</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentTerm.map((term) => (
                      <tr key={term._id}>
                        <td>{term.name}</td>
                        <td>{term.days}</td>
                        <td>
                          <Button
                            color="#FFFFFF"
                            onClick={() => handleDeletePaymentTerm(term._id)}
                          >
                            <X size={15} color="red" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col xl={6} md={6} sm={12}>
          <Card>
            <CardHeader>
              <h4>Add Payment Term</h4>
              <hr></hr>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleAddPaymentTerm}>
                <Label for="name">Payment Term Name</Label>
                <Input type="text" id="name" name="name" />

                <Label for="days">Days</Label>
                <Input type="number" id="days" name="days" />
                <br></br>
                <Button type="submit" color="primary">Add Payment Term</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </div>

  );
}

export default PaymentTerms;
