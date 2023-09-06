import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Sidebar from "@components/sidebar";

const UpdateCompanySidebar = ({ isOpen, onClose, onUpdateCompany, companyDetails }) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      registrationNumber: "",
      gstNo: "",
      defaultGst: "",
      country: "",
      addLine1: "",
      addLine2: "",
      postcode: "",
      city: "",
      website: "",
    });
  
    useEffect(() => {
      if (companyDetails) {
        setFormData({
          name: companyDetails.name || "",
          email: companyDetails.email || "",
          registrationNumber: companyDetails.registrationNumber || "",
          gstNo: companyDetails.gstNo || "",
          defaultGst: companyDetails.defaultGst || "",
          country: companyDetails.country || "",
          addLine1: companyDetails.addLine1 || "",
          addLine2: companyDetails.addLine2 || "",
          postcode: companyDetails.postcode || "",
          city: companyDetails.city || "",
          website: companyDetails.website || "",
        });
      }
    }, [companyDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdateCompany(formData);
    onClose();
  };

  return (
    <Sidebar
      size="lg"
      open={isOpen}
      title="Update Company"
      headerClassName="mb-1"
      contentClassName="p-0"
      toggleSidebar={onClose}
    >
      <Form>
        <FormGroup>
          <Label for="name">Company Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Company Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="registrationNumber">Registration Number</Label>
          <Input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="gstNo">GST Number</Label>
          <Input
            type="text"
            id="gstNo"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="defaultGst">Default GST</Label>
          <Input
            type="number"
            id="defaultGst"
            name="defaultGst"
            value={formData.defaultGst}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="country">Country</Label>
          <Input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="addLine1">Address Line 1</Label>
          <Input
            type="text"
            id="addLine1"
            name="addLine1"
            value={formData.addLine1}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="addLine2">Address Line 2</Label>
          <Input
            type="text"
            id="addLine2"
            name="addLine2"
            value={formData.addLine2}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="postcode">Postal Code</Label>
          <Input
            type="number"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">City/Town</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="website">Company Website</Label>
          <Input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button color="secondary" onClick={onClose} className="ms-1">
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default UpdateCompanySidebar;
