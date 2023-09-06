import React, { useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { createCompany } from "../../../utility/api";

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registrationNumber: "",
    gstNo: "",
    defaultGst: 0,
    country: "",
    addLine1: "",
    addLine2: "",
    postcode: "",
    city: "",
    website: ""
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    createCompany(formData)
      .then((response) => {
        if (response.status === 201) {
          setSubmissionStatus("success");
          toast.success("Company added successfully!");
          // Redirect or navigate to a different page after successful submission
          navigate('/dashboard/analytics');
        } else {
          setSubmissionStatus("error");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setSubmissionStatus("error");
      });
  };


  return (
    <div>
      <h2>Create Company</h2><hr></hr>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="name">Company Name</Label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="registrationNumber">Registration Number</Label>
              <Input
                type="text"
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={(e) =>
                  setFormData({ ...formData, registrationNumber: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="gstNo">GST Number</Label>
              <Input
                type="text"
                id="gstNo"
                value={formData.gstNo}
                onChange={(e) => setFormData({ ...formData, gstNo: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="defaultGst">Default GST</Label>
              <Input
                type="number"
                id="defaultGst"
                value={formData.defaultGst}
                onChange={(e) =>
                  setFormData({ ...formData, defaultGst: parseInt(e.target.value) })
                }
                required
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="country">Country</Label>
              <Input
                type="text"
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="addLine1">Address Line 1</Label>
              <Input
                type="text"
                id="addLine1"
                value={formData.addLine1}
                onChange={(e) => setFormData({ ...formData, addLine1: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="addLine2">Address Line 2</Label>
              <Input
                type="text"
                id="addLine2"
                value={formData.addLine2}
                onChange={(e) => setFormData({ ...formData, addLine2: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="postcode">Postcode</Label>
              <Input
                type="text"
                id="postcode"
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </FormGroup>            
          </Col>
        </Row>
        <FormGroup row>
          <Col sm={{ size: 1 }}>
            <Button color="primary" type="submit">
              Create
            </Button>
          </Col>
        </FormGroup>
      </Form>
      
      {submissionStatus === "error" && (
        <p className="text-danger">Failed to create company.</p>
      )}
    </div>
  );
};

export default CreateCompany;
