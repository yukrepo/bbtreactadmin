import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { Row, Col, Card, CardBody, Button } from 'reactstrap'
import { Fragment } from 'react'
import { getInvoiceById, getStaticFileUrl } from '../../../../utility/api';
import { Table } from 'reactstrap';



const EstimatePreview = () => {
    const { id } = useParams();
    const [estimate, setEstimate] = useState({})
    const [customer, setCustomer] = useState({})
    const [items, setItems] = useState()
    const [pdf, setPdf] = useState()
    useEffect(() => {

        getInvoiceById(id).then((response) => {            
            setEstimate(response.data.task)
            setCustomer(response.data.customer)
            const apdf = getStaticFileUrl(response.data.task.pdf)
            setPdf(apdf)
            setItems(response.data.task.items)
        });

    }, []);
    const openPdfInNewTab = () => {
        if (pdf) {
            window.open(pdf, '_blank');
        }
    };


    return (
        <Row>
            <Col xl={9} md={8} sm={12}>
                <Row>
                    <Col xl={6} md={6} sm={12}>
                        <Card className='invoice-preview-card'>
                            <CardBody>
                                <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                                    <h4>Reference No. : {estimate.refNo}</h4>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Link to="#" className="btn btn-primary" onClick={openPdfInNewTab}>
                                    Download PDF
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl={6} md={6} sm={12}>
                        <Card className="invoice-preview-card">
                            {/* Header */}
                            <CardBody className="invoice-padding pb-0">
                                <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                                    <div>
                                        <h5>Customer Details</h5>
                                        <hr></hr>
                                        <p>{customer.name}<br></br>{customer.email}</p>
                                        {customer.invoicingAddress && (
                                            <p>Invoicing Address : {customer.invoicingAddress.toUpperCase()}</p>
                                        )}
                                        {customer.gstNo && (
                                            <p>GST : {customer.gstNo.toUpperCase()}</p>
                                        )}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl={12} md={12} sm={12}>
                        <Card className='invoice-preview-card'>
                            <CardBody>
                                <h4>Items</h4>
                                <hr></hr>
                                {items && items.length > 0 ? (
                                    <Table bordered={true}>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Discount</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.product}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.discount}</td>
                                                    <td>₹ {item.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>

                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td>Total: </td>
                                                <td>₹ {estimate.totalAmount}</td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                ) : (
                                    <p>No items available.</p>
                                )}

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col xl={3} md={4} sm={12}>
                <Card className='invoice-action-wrapper'>
                    <CardBody>
                        <Button color='primary' block className='mb-75' disabled>
                            Send
                        </Button>
                    </CardBody>
                </Card>
            </Col>

        </Row>
    );


}

export default EstimatePreview;