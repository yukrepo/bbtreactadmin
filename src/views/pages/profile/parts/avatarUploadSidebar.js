import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Sidebar from "@components/sidebar";

const AvatarUploadSidebar = ({ isOpen, onClose, onAvatarUpload }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatar(file);
  };

  const handleUpload = () => {
    onAvatarUpload(selectedAvatar);
    setSelectedAvatar(null);
    onClose();
  };

  return (
    <Sidebar
      size="lg"
      open={isOpen}
      title="Upload Avatar"
      headerClassName="mb-1"
      contentClassName="p-0"
      toggleSidebar={onClose}
    >
      <Form>
        <FormGroup>
          <Label for="avatar-upload" className="form-label">
            Select Avatar
          </Label>
          <Input
            type="file"
            id="avatar-upload"
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

export default AvatarUploadSidebar;
