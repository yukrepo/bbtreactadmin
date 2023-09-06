import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";
import { fetchProfile, getStaticFileUrl, uploadAvatar } from "../../../utility/api";
import { Row, Col } from "reactstrap";
import AvatarUploadSidebar from "./parts/avatarUploadSidebar";

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchProfile()
      .then((response) => {
        if (response.status === 200) {
          setProfileDetails(response.data);
        } else {
          throw new Error("API returned unexpected status");
        }
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAvatarUpload = async (avatarFile) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await uploadAvatar(formData);
      if (response.status === 200) {
        // Refresh profile details after successful avatar upload
        fetchProfile()
          .then((response) => {
            if (response.status === 200) {
              setProfileDetails(response.data);
            }
          });
      } else {
        console.error("Avatar upload failed:", response.data);
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
    }
  };

  // Mapping of shortened property names to their full meanings
  const propertyMappings = {
    name: "FULL NAME",
    email: "EMAIL",
    age: "AGE",
    // Add more property mappings as needed
  };

  return (
    <div className="profile-container">
      <Row>
        <Col md="6">
          <Card>
            <CardHeader>
              <h4>Profile Details</h4>
            </CardHeader>
            <CardBody>
              {loading ? (
                <p>Loading profile details...</p>
              ) : (
                <Table striped>
                  <tbody>
                    {Object.entries(profileDetails).map(([key, value]) =>
                      propertyMappings[key] ? (
                        <tr key={key}>
                          <td>{propertyMappings[key]}</td>
                          <td>{String(value)}</td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <div className="logo-container">
            {profileDetails.avatar ? (
              <>
                <img
                  src={getStaticFileUrl(profileDetails.avatar)}
                  alt="User Avatar"
                  style={{ maxHeight: "100px" }}
                />
                <br />
                <Button className="mt-4" color="primary" onClick={toggleSidebar}>
                  Change Avatar
                </Button>
              </>
            ) : (
              <div>
                <img
                  src="stock-logo-image.jpg"
                  alt="Stock Logo"
                  style={{ maxWidth: "100px" }}
                />
                <Button color="primary" onClick={toggleSidebar}>
                  Upload Avatar
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <AvatarUploadSidebar
        isOpen={open}
        onClose={toggleSidebar}
        onAvatarUpload={handleAvatarUpload}
      />
    </div>
  );
};

export default Profile;
