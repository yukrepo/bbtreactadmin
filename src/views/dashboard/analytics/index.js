// ** React Imports
import { useState, useEffect, useContext } from "react";

// ** Icons Imports
import { List } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";
import Timeline from "@components/timeline";
import AvatarGroup from "@components/avatar-group";

// ** Utils
import { kFormatter } from "@utils";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap";

// ** Demo Components
import InvoiceList from "@src/views/apps/invoice/list";
import Sales from "@src/views/ui-elements/cards/analytics/Sales2";

// Custom Cards

import InvoicesInfo from "../../ui-elements/cards/dashboard/InvoicesInfo";
import InvoicesPieChart from "../../ui-elements/cards/analytics/InvoiceReport";

//create company if the company is not created
import CreateCompany from "./createCompany";

import AvgSessions from "@src/views/ui-elements/cards/analytics/AvgSessions";
import CardAppDesign from "@src/views/ui-elements/cards/advance/CardAppDesign";
import SupportTracker from "@src/views/ui-elements/cards/analytics/SupportTracker";
import OrdersReceived from "@src/views/ui-elements/cards/statistics/OrdersReceived";
import SubscribersGained from "@src/views/ui-elements/cards/statistics/SubscribersGained";
import CardCongratulations from "@src/views/ui-elements/cards/advance/CardCongratulations";
import CardNextSteps from "../../ui-elements/cards/advance/CardNestSteps";

// Spinner

import SpinnerGrowing from "../../components/spinners/SpinnerGrowing";

// ** Images
import jsonImg from "@src/assets/images/icons/json.png";

import api, { fetchCompany } from "@src/utility/api.js";

// ** Avatar Imports
import avatar6 from "@src/assets/images/portrait/small/avatar-s-6.jpg";
import avatar7 from "@src/assets/images/portrait/small/avatar-s-7.jpg";
import avatar8 from "@src/assets/images/portrait/small/avatar-s-8.jpg";
import avatar9 from "@src/assets/images/portrait/small/avatar-s-9.jpg";
import avatar20 from "@src/assets/images/portrait/small/avatar-s-20.jpg";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";

const AnalyticsDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);

  const [companyStatus, setCompanyStatus] = useState(null);
  const [refreshDashboard, setRefreshDashboard] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoader(true);
      await fetchCompany()
        .then((response) => {
          if (response.status === 200) {
            setCompanyStatus(true);
          } else if (response.status === 404) {
            setCompanyStatus(false);
          } else {
            throw new Error("API returned unexpected status");
          }
        })
        .catch((error) => {
          console.error("Error fetching API:", error);
          setCompanyStatus(false);
        });
      setLoader(false);
    }
    fetchData();
  }, [refreshDashboard]);

  // ** Vars
  const avatarGroupArr = [
    {
      imgWidth: 33,
      imgHeight: 33,
      title: "Billy Hopkins",
      placement: "bottom",
      img: avatar9,
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: "Amy Carson",
      placement: "bottom",
      img: avatar6,
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: "Brandon Miles",
      placement: "bottom",
      img: avatar8,
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: "Daisy Weber",
      placement: "bottom",
      img: avatar7,
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: "Jenny Looper",
      placement: "bottom",
      img: avatar20,
    },
  ];
  const data = [
    {
      title: "12 Invoices have been paid",
      content: "Invoices have been paid to the company.",
      meta: "",
      metaClassName: "me-1",
      customContent: (
        <div className="d-flex align-items-center">
          <img className="me-1" src={jsonImg} alt="data.json" height="23" />
          <span>data.json</span>
        </div>
      ),
    },
    {
      title: "Client Meeting",
      content: "Project meeting with john @10:15am.",
      meta: "",
      metaClassName: "me-1",
      color: "warning",
      customContent: (
        <div className="d-flex align-items-center">
          <Avatar img={avatar9} />
          <div className="ms-50">
            <h6 className="mb-0">John Doe (Client)</h6>
            <span>CEO of Infibeam</span>
          </div>
        </div>
      ),
    },
    {
      title: "Create a new project for client",
      content: "Add files to new design folder",
      color: "info",
      meta: "",
      metaClassName: "me-1",
      customContent: <AvatarGroup data={avatarGroupArr} />,
    },
    {
      title: "Create a new project for client",
      content: "Add files to new design folder",
      color: "danger",
      meta: "",
      metaClassName: "me-1",
    },
  ];

  return (
    <div id="dashboard-analytics">
      {loader ? (
        <SpinnerGrowing></SpinnerGrowing>
      ) : companyStatus === true ? (
        <div id="dashboard-analytics">
          <Row className="match-height">
            <Col lg="6" md="6" sm="12">
              <CardNextSteps></CardNextSteps>
            </Col>
            <Col lg="6" md="6" sm="12">
              <Sales></Sales>
            </Col>
          </Row>
          <Row className="match-height">
            <Col lg="8" md="8" sm="12">
              <InvoicesInfo></InvoicesInfo>
            </Col>

            <Col lg="4" md="4" sm="12">
              <InvoicesPieChart></InvoicesPieChart>
            </Col>
          </Row>

          <Row className="match-height">
            <Col xs="12">
              <InvoiceList />
            </Col>
          </Row>
        </div>
      ) : (
        <Row className="match-height">
          <Col lg="4" md="4" sm="12">
            <CardCongratulations />
          </Col>
          <Col lg="8" md="8" sm="12">
            <CreateCompany />
          </Col>
        </Row>
      )}
    </div>
  );
};
export default AnalyticsDashboard;
