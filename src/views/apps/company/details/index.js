import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";
import { fetchCompany, getStaticFileUrl, uploadLogo, updateCompany } from "../../../../utility/api";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import LogoUploadSidebar from "./sidebars/logoUploadSidebar";
import UpdateCompanySidebar from "./sidebars/updateCompanySidebar";

const CompanyDetails = () => {
  const [logoSidebarOpen, setLogoSidebarOpen] = useState(false);
  const [updateSidebarOpen, setUpdateSidebarOpen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const toggleLogoSidebar = () => {
    setLogoSidebarOpen(!logoSidebarOpen);
  };

  const toggleUpdateSidebar = () => {
    setUpdateSidebarOpen(!updateSidebarOpen);
  };

  const handleLogoUpload = async (logoFile) => {
    const formData = new FormData();
    formData.append("logo", logoFile);

    try {
      const response = await uploadLogo(formData);
      fetchCompany()
        .then((response) => {
          if (response.status === 200) {
            setCompanyDetails(response.data);
          } else if (response.status === 404) {
            setCompanyDetails(null);
          } else {
            throw new Error("API returned unexpected status");
          }
        })
        .catch((error) => {
          console.error("Error fetching API:", error);
        });
      
      // Close the sidebar after successful upload
      toggleLogoSidebar();
    } catch (error) {
      console.error("Logo upload error:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleUpdateCompany = async (updatedCompanyDetails) => {
    try {
      const response = await updateCompany(updatedCompanyDetails);
      if (response.status === 200) {
        const response = await fetchCompany();
        if (response.status === 200) {
          setCompanyDetails(response.data);
        } else {
          throw new Error("API returned unexpected status");
        }
        toggleUpdateSidebar(); // Close the sidebar after successful update
      } else {
        throw new Error("API returned unexpected status");
      }
    } catch (error) {
      console.error("Company update error:", error);
      // Handle error, e.g., show an error message
    }
  };

  useEffect(() => {
    fetchCompany()
      .then((response) => {
        if (response.status === 200) {
          setCompanyDetails(response.data);
        } else if (response.status === 404) {
          setCompanyDetails(null);
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

  return (
    <div className="company-details-container">
      <Row>
        <Col md="6">
          <Card>
            <CardHeader>
              <h3>Company Information</h3>
            </CardHeader>
            <CardBody>
              {loading ? (
                <p>Loading company details...</p>
              ) : (
                <Table striped>
                  <tbody>
                    {Object.entries(companyDetails).map(
                      ([key, value]) =>
                        propertyMappings[key] && (
                          <tr key={key}>
                            <td>{propertyMappings[key]}</td>
                            <td>{String(value).toUpperCase()}</td>
                          </tr>
                        )
                    )}
                  </tbody>
                </Table>
              )}
            </CardBody>
            <Button color="primary"  onClick={toggleUpdateSidebar}>
                Update Company Info
              </Button>
              <Button color="primary" className="mt-2" tag="a" href="/apps/company/settings">
                Company Settings
              </Button>
          </Card>
        </Col>
        <Col md="6">
          <div className="logo-container">
            {companyDetails.logo ? (
              <>
                <img
                  src={getStaticFileUrl(companyDetails.logo)}
                  alt="Stock Logo"
                  style={{ maxHeight: "100px" }}
                />
                <br />
                <Button className="mt-4" color="primary" onClick={toggleLogoSidebar}>
                  Change Logo
                </Button>
              </>
            ) : (
              <div>
                <img
                  src="stock-logo-image.jpg"
                  alt="Stock Logo"
                  style={{ maxWidth: "100px" }}
                />
                <Button color="primary" onClick={toggleLogoSidebar}>
                  Upload Logo
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <LogoUploadSidebar
        isOpen={logoSidebarOpen}
        onClose={toggleLogoSidebar}
        onLogoUpload={handleLogoUpload}
      />
      <UpdateCompanySidebar
        isOpen={updateSidebarOpen}
        onClose={toggleUpdateSidebar}
        onUpdateCompany={handleUpdateCompany}
        companyDetails={companyDetails}
      />
    </div>
  );
};

const propertyMappings = {
  name: "COMPANY NAME",
  email: "COMPANY EMAIL",
  registrationNumber: "REGISTRATION NUMBER",
  gstNo: "GST NUMBER",
  defaultGst: "DEFAULT GST",
  addLine1: "ADDRESS LINE 1",
  addLine2: "ADDRESS LINE 1",
  city: "CITY / TOWN",
  postcode: "POSTAL CODE",
  country: "COUNTRY",
  website: "COMPANY WEBSITE",
};

export default CompanyDetails;
