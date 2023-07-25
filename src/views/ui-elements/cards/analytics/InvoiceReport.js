// ** Third Party Components
import Chart from "react-apexcharts";
import { Card, CardHeader, CardTitle, CardBody, CardText } from "reactstrap";

const InvoicesPieChart = () => {
  // Dummy data for paid and unpaid invoices
  const paidInvoices = 150,
    unpaidInvoices = 50;

  const options = {
    labels: ["Paid Invoices", "Unpaid Invoices"],
    colors: ["#43d187", "#ff5b5b"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: -10,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [paidInvoices, unpaidInvoices];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Invoices</CardTitle>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type="donut" height={280} />
        <div className="d-flex justify-content-between mt-1">
          <div className="text-center">
            <CardText className="mb-50">Paid</CardText>
            <h2 className="font-weight-bolder">150</h2>
          </div>
          <div className="text-center">
            <CardText className="mb-50">Unpaid</CardText>
            <h2 className="font-weight-bolder">50</h2>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default InvoicesPieChart;
