import { Settings, ArrowRight } from "react-feather";
import Avatar from "@components/avatar";
import { Card, CardBody, CardText } from "reactstrap";
import decorationLeft from "@src/assets/images/elements/decore-left.png";
import decorationRight from "@src/assets/images/elements/decore-right.png";
import { Link } from "react-router-dom";

const CardNextSteps = () => {
  return (
    <Card className="card-next-steps">
      <CardBody>
        <img
          className="next-steps-img-left"
          src={decorationLeft}
          alt="decor-left"
        />
        <img
          className="next-steps-img-right"
          src={decorationRight}
          alt="decor-right"
        />
        <div>
          <CardText className="mt-1">
            Congratulations on setting up your company on E-Invoicing! Here are
            the next steps to get started:
            <ol className="text-left mt-3 pl-4">
              <li>Update Company Logo and other settings.</li>
              <li>Create customers and products.</li>
              <li>Add Payment Terms.</li>
              <li>Create Invoices and Estimates.</li>
            </ol>
          </CardText>
          <Link to="/apps/company/settings" className="btn btn-primary">
            Company Settings
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardNextSteps;
