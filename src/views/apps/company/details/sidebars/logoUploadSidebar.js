import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Sidebar from "@components/sidebar";

const LogoUploadSidebar = ({ isOpen, onClose, onLogoUpload }) => {
  const [selectedLogo, setSelectedLogo] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedLogo(file);
  };

  const handleUpload = () => {
    onLogoUpload(selectedLogo);
    setSelectedLogo(null);
    onClose();
  };

  return (
    <Sidebar
      size="lg"
      open={isOpen}
      title="Upload Logo"
      headerClassName="mb-1"
      contentClassName="p-0"
      toggleSidebar={onClose}
    >
      <Form>
        <FormGroup>
          <Label for="logo-upload" className="form-label">
            Select Logo
          </Label>
          <Input
            type="file"
            id="logo-upload"
            accept="image/*"
            onChange={handleFileChange}
          />
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button color="primary" onClick={handleUpload}>
            Upload
          </Button>
          <Button color="secondary" onClick={onClose} className="ms-1">
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default LogoUploadSidebar;
