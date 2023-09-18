// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";
import Repeater from "@components/repeater";

// ** Third Party Components
import axios from "axios";
import Flatpickr from "react-flatpickr";
import { SlideDown } from "react-slidedown";
import { X, Plus, Hash } from "react-feather";
import Select, { components } from "react-select";

// ** Reactstrap Imports
import { selectThemeColors } from "@utils";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  InputGroup,
  InputGroupText
} from "reactstrap"

// ** Styles
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"

const AddCard = () => {
  // ** States
  const [count, setCount] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([null]);
  const [discounts, setDiscounts] = useState([0]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [picker, setPicker] = useState(new Date());
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [company, setCompany] = useState({});
  const [dueDatepicker, setDueDatePicker] = useState(new Date());
  const [options, setOptions] = useState([
    {
      value: "add-new",
      label: "Add New Customer",
      type: "button",
      color: "flat-success"
    }
  ]);

  useEffect(() => {
    // Fetch clients, company details, and invoice number here
    // Replace the following placeholders with actual API calls
    const fetchClients = async () => {
      try {
        const response = await axios.get("/api/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    const fetchCompany = async () => {
      try {
        const response = await axios.get("/api/company");
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    const fetchInvoiceNumber = async () => {
      try {
        const response = await axios.get("/api/invoice/number");
        setInvoiceNumber(response.data);
      } catch (error) {
        console.error("Error fetching invoice number:", error);
      }
    };

    // Fetch data when the component mounts
    fetchClients();
    fetchCompany();
    fetchInvoiceNumber();
  }, []);

  // Function to add a new product row
  const addProductRow = () => {
    setCount(count + 1);
    setSelectedProducts([...selectedProducts, null]);
    setDiscounts([...discounts, 0]);
  };

  // Function to remove a product row
  const removeProductRow = (index) => {
    setCount(count - 1);
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    setDiscounts(discounts.filter((_, i) => i !== index));
  };

  // Function to handle changes in selected products
  const handleProductChange = (productId, index) => {
    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts[index] = productId;
    setSelectedProducts(updatedSelectedProducts);
  };

  // Function to handle changes in discounts
  const handleDiscountChange = (discount, index) => {
    const updatedDiscounts = [...discounts];
    updatedDiscounts[index] = discount;
    setDiscounts(updatedDiscounts);
  };

  // Function to calculate the price for a product row
  const calculatePrice = (productId, discount, quantity) => {
    // Retrieve the selected product from the products list
    const selectedProduct = products.find((product) => product._id === productId);

    if (selectedProduct) {
      const cost = selectedProduct.cost || 0;
      // Calculate the discounted price
      const discountedPrice = cost - (cost * discount) / 100;
      // Calculate the total price for the row
      return `$${(discountedPrice * quantity).toFixed(2)}`;
    }

    return "$0.00"; // Default value if no product is selected
  };

  // Function to calculate the subtotal of all product rows
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (let i = 0; i < count; i++) {
      const productId = selectedProducts[i];
      const discount = discounts[i];
      const quantity = 1; // You can add a quantity input for each row if needed
      const rowTotal = calculatePrice(productId, discount, quantity);
      subtotal += parseFloat(rowTotal.replace("$", ""));
    }
    return `$${subtotal.toFixed(2)}`;
  };

  // Function to handle changes in the selected client
  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
  };

  // ... (Other form handling functions remain the same)

  return (
    <Fragment>
      <Card className="invoice-preview-card">
        {/* Header */}
        <CardBody className="invoice-padding pb-0">
          <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
            <div>
              <div className="logo-wrapper">
                <img></img>
                <h3 className="text-primary invoice-logo">{company.name}</h3>
              </div>
              <p className="card-text mb-25">
                {company.addLine1}, {company.addLine2}
              </p>
              <p className="card-text mb-25">{company.city}</p>
              <h5 className="card-text mb-0">GST : {company.gstNo ? company.gstNo.toUpperCase() : ''}</h5>
            </div>
            <div className="invoice-number-date mt-md-0 mt-2">
              <div className="d-flex align-items-center justify-content-md-end mb-1">
                <h4 className="invoice-title">Estimate</h4>
                <InputGroup className="input-group-merge invoice-edit-input-group disabled">
                  <Input
                    type="number"
                    className="invoice-edit-input"
                    value={invoiceNumber}
                    placeholder={invoiceNumber.toString()}
                    disabled
                  />
                </InputGroup>
              </div>
              <div className="d-flex align-items-center mb-1">
                <span className="title">Date:</span>
                <Flatpickr
                  value={picker}
                  onChange={(date) => setPicker(date)}
                  className="form-control invoice-edit-input date-picker"
                />
              </div>
              <div className="d-flex align-items-center">
                <span className="title">Due Date:</span>
                <Flatpickr
                  value={dueDatepicker}
                  onChange={(date) => setDueDatePicker(date)}
                  className="form-control invoice-edit-input due-date-picker"
                />
              </div>
            </div>
          </div>
        </CardBody>
        {/* /Header */}
        <hr className="invoice-spacing" />
        {/* Address and Contact */}
        <CardBody className="invoice-padding pt-0">
          <Row className="row-bill-to invoice-spacing">
            <Col className="col-bill-to ps-0" xl="8">
              <h6 className="invoice-to-title">Invoice To:</h6>
              <div className="invoice-customer">
                {clients !== null ? (
                  <Fragment>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      id="label"
                      value={selectedClient}
                      options={clients.map((client) => ({
                        value: client.name,
                        label: client.name
                      }))}
                      theme={selectThemeColors}
                      components={{
                        Option: OptionComponent,
                      }}
                      onChange={handleClientChange}
                    />
                    {selectedClient !== null ? (
                      <div className="customer-details mt-1">
                        <p className="mb-25">{selectedClient.name}</p>
                        <p className="mb-25">{selectedClient.email}</p>
                        <p className="mb-25">{selectedClient.invoicingAddress}</p>
                        <p className="mb-25">{selectedClient.gstNo}</p>
                      </div>
                    ) : null}
                  </Fragment>
                ) : null}
              </div>
            </Col>
          </Row>
        </CardBody>
        {/* /Address and Contact */}
        {/* Product Details */}
        <CardBody className="invoice-padding invoice-product-details">
          <Repeater count={count}>
            {(i) => {
              const Tag = i === 0 ? "div" : SlideDown;
              return (
                <Tag key={i} className="repeater-wrapper">
                  <Row>
                    <Col
                      className="d-flex product-details-border position-relative pe-0"
                      sm="12"
                    >
                      <Row className="w-100 pe-lg-0 pe-1 py-2">
                        <Col className="mb-lg-0 mb-2 mt-lg-0 mt-2" lg="4" sm="12">
                          <CardText className="col-title mb-md-50 mb-0">
                            Item
                          </CardText>
                          <Select
                            className="item-details"
                            options={products.map((term) => ({
                              value: term._id,
                              label: term.name
                            }))}
                            onChange={(selectedOption) =>
                              handleProductChange(selectedOption.value, i)
                            }
                            value={selectedProducts[i] ? { value: selectedProducts[i], label: selectedProducts[i] } : null}
                          />
                        </Col>
                        <Col className="my-lg-0 my-2" lg="2" sm="12">
                          <CardText className="col-title mb-md-2 mb-0">
                            Cost
                          </CardText>
                          <p>{calculatePrice(selectedProducts[i], discounts[i], 1)}</p>
                        </Col>
                        <Col className="my-lg-0 my-2" lg="2" sm="12">
                          <CardText className="col-title mb-md-2 mb-0">
                            Discount %
                          </CardText>
                          <Input
                            type="number"
                            value={discounts[i]}
                            onChange={(e) => handleDiscountChange(e.target.value, i)}
                            placeholder="0"
                          />
                        </Col>
                        <Col className="my-lg-0 my-2" lg="2" sm="12">
                          <CardText className="col-title mb-md-2 mb-0">
                            Qty
                          </CardText>
                          <Input
                            type="number"
                            defaultValue="1"
                            placeholder="1"
                          />
                        </Col>
                        <Col className="my-lg-0 mt-2" lg="2" sm="12">
                          <CardText className="col-title mb-md-50 mb-0">
                            Price
                          </CardText>
                          <p>{calculatePrice(selectedProducts[i], discounts[i], 1)}</p>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-center border-start invoice-product-actions py-50 px-25">
                        <X
                          size={18}
                          className="cursor-pointer"
                          onClick={() => removeProductRow(i)}
                        />
                      </div>
                    </Col>
                  </Row>
                </Tag>
              );
            }}
          </Repeater>
          <Row className="mt-1">
            <Col sm="12" className="px-0">
              <Button
                color="primary"
                size="sm"
                className="btn-add-new"
                onClick={addProductRow}
              >
                <Plus size={14} className="me-25"></Plus>{" "}
                <span className="align-middle">Add Item</span>
              </Button>
            </Col>
          </Row>
        </CardBody>
        {/* /Product Details */}
        {/* Invoice Total */}
        <CardBody className="invoice-padding">
          <Row className="invoice-sales-total-wrapper">
            <Col
              className="mt-md-0 mt-3"
              md={{ size: "6", order: 1 }}
              xs={{ size: 12, order: 2 }}
            >
              <div className="d-flex align-items-center mb-1">
                <Label for="salesperson" className="form-label">
                  Salesperson:
                </Label>
                <Input
                  type="text"
                  className="ms-50"
                  id="salesperson"
                  placeholder="Edward Crowley"
                />
              </div>
            </Col>
            <Col
              className="d-flex justify-content-end"
              md={{ size: "6", order: 2 }}
              xs={{ size: 12, order: 1 }}
            >
              <div className="invoice-total-wrapper">
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Subtotal:</p>
                  <p className="invoice-total-amount">{calculateSubtotal()}</p>
                </div>
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Discount:</p>
                  <p className="invoice-total-amount">$28</p>
                </div>
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Tax:</p>
                  <p className="invoice-total-amount">21%</p>
                </div>
                <hr className="my-50" />
                <div className="invoice-total-item">
                  <p className="invoice-total-title">Total:</p>
                  <p className="invoice-total-amount">$1690</p>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Total */}
        <hr className="invoice-spacing mt-0" />
        {/* Invoice Note */}
        <CardBody className="invoice-padding py-0">
          <Row>
            <Col>
              <div className="mb-2">
                <Label for="note" className="form-label fw-bold">
                  Note:
                </Label>
                <Input type="textarea" rows="2" id="note" defaultValue={note} />
              </div>
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Note */}
      </Card>
      <Sidebar
        size="lg"
        open={open}
        title="Add Customer"
        headerClassName="mb-1"
        contentClassName="p-0"
        toggleSidebar={toggleSidebar}
      >
        <Form>
          <div className="mb-2">
            <Label for="customer-name" className="form-label">
              Customer Name
            </Label>
            <Input id="customer-name" placeholder="John Doe" />
          </div>
          <div className="mb-2">
            <Label for="customer-email" className="form-label">
              Customer Email
            </Label>
            <Input
              type="email"
              id="customer-email"
              placeholder="example@domain.com"
            />
          </div>
          <div className="mb-2">
            <Label for="customer-address" className="form-label">
              Customer Address
            </Label>
            <Input
              type="textarea"
              cols="2"
              rows="2"
              id="customer-address"
              placeholder="1307 Lady Bug Drive New York"
            />
          </div>
          <div className="mb-2">
            <Label for="country" className="form-label">
              Country
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={countryOptions}
              isClearable={false}
            />
          </div>
          <div className="mb-2">
            <Label for="customer-contact" className="form-label">
              Contact
            </Label>
            <Input
              type="number"
              id="customer-contact"
              placeholder="763-242-9206"
            />
          </div>
          <div className="d-flex flex-wrap my-2">
            <Button
              className="me-1"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Add
            </Button>
            <Button color="secondary" onClick={() => setOpen(false)} outline>
              Cancel
            </Button>
          </div>
        </Form>
      </Sidebar>
    </Fragment>
  );
};

export default AddCard;
