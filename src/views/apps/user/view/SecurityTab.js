// ** React Imports
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Alert,
  Input,
  Modal,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader,
  FormFeedback,
} from "reactstrap";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Third Party Components
import * as yup from "yup";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {
  Edit,
  Trash,
  Settings,
  MessageSquare,
  ChevronRight,
} from "react-feather";

// ** Images
import qrCode from "@src/assets/images/icons/qrcode.png";
import chromeLogo from "@src/assets/images/icons/google-chrome.png";

const SignupSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const recentDevicesArr = [
  {
    device: "Dell XPS 15",
    location: "United States",
    browser: "Chrome on Windows",
    activity: "10, Jan 2021 20:07",
  },
  {
    location: "Ghana",
    device: "Google Pixel 3a",
    browser: "Chrome on Android",
    activity: "11, Jan 2021 10:16",
  },
  {
    location: "Mayotte",
    device: "Apple iMac",
    browser: "Chrome on MacOS",
    activity: "11, Jan 2021 12:10",
  },
  {
    location: "Mauritania",
    device: "Apple iPhone XR",
    browser: "Chrome on iPhone",
    activity: "12, Jan 2021 8:29",
  },
];

const defaultValues = {
  password: "",
  confirmPassword: "",
};

const AppAuthComponent = ({ setShow, setShowDetailModal }) => {
  const toggle = () => {
    setShow(false);
    setShowDetailModal(false);
  };

  return (
    <Fragment>
      <h1 className="text-center mb-2 pb-50">Add Authenticator App</h1>
      <h4>Authenticator Apps</h4>
      <p>
        Using an authenticator app like Google Authenticator, Microsoft
        Authenticator, Authy, or 1Password, scan the QR code. It will generate a
        6 digit code for you to enter below.
      </p>
      <div className="d-flex justify-content-center my-2 py-50">
        <img src={qrCode} alt="QR Code" className="img-fluid" width="122" />
      </div>
      <Alert color="warning">
        <h4 className="alert-heading">ASDLKNASDA9AHS678dGhASD78AB</h4>
        <div className="alert-body fw-normal">
          If you having trouble using the QR code, select manual entry on your
          app
        </div>
      </Alert>
      <Row className="gy-1">
        <Col xs={12}>
          <Input placeholder="Enter authentication code" />
        </Col>
        <Col className="d-flex justify-content-end" xs={12}>
          <Button
            outline
            color="secondary"
            className="mt-1 me-1"
            onClick={toggle}
          >
            Cancel
          </Button>
          <Button color="primary" className="mt-1">
            <span className="me-50">Continue</span>
            <ChevronRight size={14} />
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

const AppSMSComponent = ({ setShow, setShowDetailModal }) => {
  const toggle = () => {
    setShow(false);
    setShowDetailModal(false);
  };
  return (
    <Fragment>
      <h1 className="text-center mb-2 pb-50">Add your number</h1>
      <h4>Verify Your Mobile Number for SMS</h4>
      <p>
        Enter your mobile phone number with country code and we will send you a
        verification code.
      </p>
      <Row className="gy-1 mt-1">
        <Col xs={12}>
          <Cleave
            className="form-control"
            placeholder="1 234 567 8900"
            options={{ phone: true, phoneRegionCode: "US" }}
          />
        </Col>
        <Col className="d-flex justify-content-end" xs={12}>
          <Button
            outline
            color="secondary"
            className="mt-1 me-1"
            onClick={toggle}
          >
            Cancel
          </Button>
          <Button color="primary" className="mt-1">
            <span className="me-50">Continue</span>
            <ChevronRight size={14} />
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

const SecurityTab = () => {
  // ** Hooks
  const [show, setShow] = useState(false);
  const [authType, setAuthType] = useState("authApp");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) });

  const onSubmit = (data) => {
    trigger();
    console.log(data);
  };
  const handleContinue = () => {
    setShow(false);
    setShowDetailModal(true);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Invoice & Estimate Settings</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={6} xs={12}>
              <h6>Invoice Prefix</h6>
              <hr></hr>
              <h6>Auto Generate Invoice Number from</h6>
            </Col>
            <Col md={6} xs={12}>
              <h6>Estimate Prefix</h6>
              <hr></hr>
              <h6>Auto Generate Estimate Number from</h6>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="mb-50">Select Invoice Style</CardTitle>          
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="mb-50">Select Currency Symbol</CardTitle>
        </CardBody>
      </Card>
     
      
    </Fragment>
  );
};

export default SecurityTab;
