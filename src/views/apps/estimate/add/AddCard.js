// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";
import Repeater from "@components/repeater";
import AddActions from "./AddActions";

// ** Third Party Components
import axios from "axios";
import Flatpickr from "react-flatpickr";
import { SlideDown } from "react-slidedown";
import { X, Plus, Hash } from "react-feather";
import Select, { components } from "react-select";

import { getAllCustomers, getEstimateRef, fetchCompany, getAllProducts } from "../../../../utility/api";

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
  const [count, setCount] = useState(1)
  const [value, setValue] = useState({})
  const [customer, setCustomer] = useState(null)
  const [open, setOpen] = useState(false)
  const [clients, setClients] = useState(null)
  const [selected, setSelected] = useState(null)
  const [picker, setPicker] = useState(new Date())
  const [invoiceNumber, setInvoiceNumber] = useState(false)
  const [company, setCompany] = useState(false)
  const [dueDatepicker, setDueDatePicker] = useState(new Date())
  const [products, setProducts] = useState(null)
  const [total, setTotal] = useState(0);
  const [note, setNote] = useState("It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!");
  const [itemDetails, setItemDetails] = useState([
    {
      selectedProduct: "",
      cost: 0,
    },
  ]);
  const [options, setOptions] = useState([
    {
      value: "add-new",
      label: "Add New Customer",
      type: "button",
      color: "flat-success"
    }
  ]);

  

  useEffect(() => {

    getAllProducts().then((response) => {
      // console.log(response.data)
      setProducts(response.data)
    }, []);

    getAllCustomers().then((response) => {

      const arr = options;
      response.data.map((item) =>
        arr.push({ value: item.name, label: item.name, _id: item._id })
      );
      setOptions([...arr]);
      setClients(response.data);
    });

    fetchCompany().then((response) => {
      setCompany(response.data)
    }, [])


    getEstimateRef()
      .then((response) => {
        setInvoiceNumber(response.data);
      });
  }, []);

  const changeNote = (note) => {
    setNote(note)
  }

  //gather data for save 

  const gatherDataForSave = () => {
    const cleanedItemDetails = itemDetails.map(({ selectedProduct, quantity, discountPercentage,price }) => ({
      product: selectedProduct,
      quantity,
      discount: discountPercentage,
      rate: price
    }));
    const dataToSave = {
      refNo: invoiceNumber,
      customer: customer,
      date: picker,
      expiryDate: dueDatepicker,
      items: cleanedItemDetails,
      note
    };

    return dataToSave;
  };

  // ** Deletes form
  const deleteForm = (itemIndex) => {
    const updatedItemDetails = [...itemDetails];
    updatedItemDetails.splice(itemIndex, 1);
    setItemDetails(updatedItemDetails);
    const newTotal = updatedItemDetails.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);

    // Remove the corresponding repeater element
    setCount(count - 1); // Decrement the count to remove the last element
  };

  const calculateCost = (selectedProduct) => {
    const product = products.find((p) => p._id === selectedProduct);
    return product ? product.price : 0;
  };
  const calculateRate = (selectedProduct) => {
    const product = products.find((p) => p._id === selectedProduct);
    return product ? product.rate : 0;
  }
  const calculateTax = (selectedProduct) => {
    const product = products.find((p) => p._id === selectedProduct);
    return product ? product.tax : 0;
  }

  const handleProductSelect = (e, itemIndex) => {
    const selectedProduct = e.target.value;
    const updatedItemDetails = [...itemDetails];
    const discountPercentage = itemDetails[itemIndex]?.discount || 0;
    const quantity = itemDetails[itemIndex]?.quantity || 1;
    const cost = calculateCost(selectedProduct)
    const tax = calculateTax(selectedProduct)
    const pretax = (cost * quantity * (100 - discountPercentage)) / 100;
    const price = pretax + ((pretax / 100) * tax);
    const rate = calculateRate(selectedProduct);
    updatedItemDetails[itemIndex] = {
      ...updatedItemDetails[itemIndex],
      selectedProduct,
      cost,
      discountPercentage,
      quantity,
      price,
      tax, rate
    };
    setItemDetails(updatedItemDetails);
    const newTotal = updatedItemDetails.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
  };

  const handleDiscountChange = (e, itemIndex) => {
    const updatedItemDetails = [...itemDetails];
    const selectedProduct = itemDetails[itemIndex]?.selectedProduct || '';
    const cost = itemDetails[itemIndex]?.cost || 0;
    const quantity = itemDetails[itemIndex]?.quantity || 1;
    const discountPercentage = parseFloat(e.target.value) || 0; // Parse the input value as a float

    // Calculate the price based on cost, discount percentage, and quantity
    const pretax = (cost * quantity * (100 - discountPercentage)) / 100;
    const tax = calculateTax(selectedProduct);
    const price = pretax + ((pretax / 100) * tax);
    const rate = calculateRate(selectedProduct);

    updatedItemDetails[itemIndex] = {
      ...updatedItemDetails[itemIndex],
      selectedProduct,
      cost,
      discountPercentage,
      quantity,
      price,
      tax,
      rate,
    };

    setItemDetails(updatedItemDetails);
    const newTotal = updatedItemDetails.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
  };

  const handleQuantityChange = (e, itemIndex) => {
    const updatedItemDetails = [...itemDetails];
    const selectedProduct = itemDetails[itemIndex]?.selectedProduct || '';
    const cost = itemDetails[itemIndex]?.cost || 0;
    const quantity = parseInt(e.target.value) || 1; // Parse the input value as an integer
    const discountPercentage = itemDetails[itemIndex]?.discountPercentage || 0;

    // Calculate the price based on cost, discount percentage, and quantity
    const pretax = (cost * quantity * (100 - discountPercentage)) / 100;
    const tax = calculateTax(selectedProduct);
    const price = pretax + ((pretax / 100) * tax);
    const rate = calculateRate(selectedProduct);

    updatedItemDetails[itemIndex] = {
      ...updatedItemDetails[itemIndex],
      selectedProduct,
      cost,
      discountPercentage,
      quantity,
      price,
      tax,
      rate,
    };

    setItemDetails(updatedItemDetails);
    const newTotal = updatedItemDetails.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
  };


  // ** Function to toggle sidebar
  const toggleSidebar = () => setOpen(!open);

  // ** Vars
  const countryOptions = [
    { value: "australia", label: "Australia" },
    { value: "canada", label: "Canada" },
    { value: "russia", label: "Russia" },
    { value: "saudi-arabia", label: "Saudi Arabia" },
    { value: "singapore", label: "Singapore" },
    { value: "sweden", label: "Sweden" },
    { value: "switzerland", label: "Switzerland" },
    { value: "united-kingdom", label: "United Kingdom" },
    { value: "united-arab-emirates", label: "United Arab Emirates" },
    { value: "united-states-of-america", label: "United States of America" },
  ];

  // ** Custom Options Component
  const OptionComponent = ({ data, ...props }) => {
    if (data.type === "button") {
      return (
        <Button
          className="text-start rounded-0 px-50"
          color={data.color}
          block
          onClick={() => setOpen(true)}
        >
          <Plus className="font-medium-1 me-50" />
          <span className="align-middle">{data.label}</span>
        </Button>
      );
    } else {
      return <components.Option {...props}> {data.label} </components.Option>;
    }
  };

  // ** Invoice To OnChange
  const handleInvoiceToChange = (data) => {
    const selectedCustomer = clients.find((client) => client.name === data.value);

    
    setValue(data);
    setCustomer(selectedCustomer ? selectedCustomer._id : null);
  };



  return (
    <Row className='invoice-add'>
      <Col xl={9} md={8} sm={12}>
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
                          value={value}
                          options={options}
                          theme={selectThemeColors}
                          components={{
                            Option: OptionComponent,
                          }}
                          onChange={handleInvoiceToChange}
                        />
                        {selected !== null ? (
                          <div className="customer-details mt-1">
                            <p className="mb-25">{selected.name}</p>
                            <p className="mb-25">{selected.email}</p>
                            <p className="mb-25">{selected.invoicingAddress}</p>
                            <p className="mb-25">{selected.gstNo}</p>
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
                  const itemDetail = itemDetails[i] || { selectedProduct: "", cost: 0 };
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
                              <Input type="select" className="item-details" onChange={(e) => handleProductSelect(e, i)}
                                value={itemDetail.selectedProduct}>
                                <option>Select Product</option>
                                {products !== null &&
                                  products.map((product) => (
                                    <option key={product._id} value={product._id}>
                                      {product.name}
                                    </option>
                                  ))}
                              </Input>
                            </Col>
                            <Col className="my-lg-0 my-2" lg="2" sm="12">
                              <CardText className="col-title mb-md-2 mb-0">
                                Cost
                              </CardText>
                              <CardText className="mb-0">
                                ₹ {itemDetail.cost}
                                <br></br>
                                <small>TAX: {itemDetail.tax} %</small>
                                <br></br>
                                <small>RATE: ₹ {itemDetail.rate}</small>

                              </CardText>
                              {/* to be  calculated in setPrice function  */}
                            </Col>
                            <Col className="my-lg-0 my-2" lg="2" sm="12">
                              <CardText className="col-title mb-md-2 mb-0">
                                Discount %
                              </CardText>
                              <Input
                                type="number"
                                defaultValue={itemDetail.discountPercentage}
                                onChange={(e) => handleDiscountChange(e, i)}
                              />
                            </Col>
                            <Col className="my-lg-0 my-2" lg="2" sm="12">
                              <CardText className="col-title mb-md-2 mb-0">
                                Qty
                              </CardText>
                              <Input
                                type="number"
                                defaultValue={itemDetail.quantity}
                                onChange={(e) => handleQuantityChange(e, i)}
                              />
                            </Col>
                            <Col className="my-lg-0 mt-2" lg="2" sm="12">
                              <CardText className="col-title mb-md-50 mb-0">
                                Price
                              </CardText>
                              <CardText className="mb-0">₹ {itemDetail.price}</CardText>
                              {/* to be  calculated in setPrice function  */}
                            </Col>
                          </Row>
                          <div className="d-flex justify-content-center border-start invoice-product-actions py-50 px-25">
                            <X
                              size={18}
                              className="cursor-pointer"
                              onClick={deleteForm}
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
                    onClick={() => setCount(count + 1)}
                  >
                    <Plus size={14} className="me-25"></Plus>{" "}
                    <span className="align-middle">Add Item</span>
                  </Button>
                </Col>
              </Row>
            </CardBody>



            {/* Invoice Total */}
            <CardBody className="invoice-padding">
              <Row className="invoice-sales-total-wrapper">
                <Col
                  className="mt-md-0 mt-3"
                  md={{ size: "6", order: 1 }}
                  xs={{ size: 12, order: 2 }}
                >

                </Col>
                <Col
                  className="d-flex justify-content-end"
                  md={{ size: "6", order: 2 }}
                  xs={{ size: 12, order: 1 }}
                >
                  <div className="invoice-total-wrapper">


                    <div className="invoice-total-item">
                      <p className="invoice-total-title">Total:</p>
                      <p className="invoice-total-amount">₹ {total}</p>
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
                    <Input type="textarea" rows="2" id="note" value={note} onChange={(e) => changeNote(e.target.value)} />
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
      </Col>
      <Col xl={3} md={4} sm={12}>
        <AddActions onSave={gatherDataForSave} />
      </Col>
    </Row>

  );
};

export default AddCard;
