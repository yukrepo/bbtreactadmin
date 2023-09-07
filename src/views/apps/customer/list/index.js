// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import toast from "react-hot-toast";

// ** Table Columns
import { columns } from './columns'
import Sidebar from "@components/sidebar";
import { selectThemeColors } from "@utils";

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, X } from 'react-feather'
import DataTable from 'react-data-table-component'

import Select, { components } from "react-select";

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card, Form, Label } from 'reactstrap'

// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer, fetchPaymentTerms } from '../../../../utility/api';

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


const payments = await fetchPaymentTerms();
const paymentTerms = payments.data.map(item => ({
  value: item._id,
  label: "Name: " + item.name + ", Days: " + item.days,
}));

const CustomerList = () => {
  // ** Store vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.customer)

  // ** States
  const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [open, setOpen] = useState(false)
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)


  // ** Function to toggle sidebar
  const toggleSidebar = () => setOpen(!open);

  const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
    return (
      <div className='invoice-list-table-header w-100 py-2'>
        <Row>
          <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
            <div className='d-flex align-items-center me-2'>
              <label htmlFor='rows-per-page'>Show</label>
              <Input
                type='select'
                id='rows-per-page'
                value={rowsPerPage}
                onChange={handlePerPage}
                className='form-control ms-50 pe-3'
              >
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
              </Input>
            </div>
            <Button onClick={toggleSidebar} color='primary'>
              Add Customer
            </Button>
          </Col>
          <Col
            lg='6'
            className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
          >
            <div className='d-flex align-items-center'>
              <label htmlFor='search-invoice'>Search</label>
              <Input
                id='search-invoice'
                className='ms-50 me-2 w-100'
                type='text'
                value={value}
                onChange={e => handleFilter(e.target.value)}
                placeholder='Search Customer'
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  const ToastContent = ({ t, content }) => {
    return (
      <div className="d-flex">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            <X
              size={15}
              color="#FF0000"
              className="cursor-pointer"
              onClick={() => toast.dismiss(t.id)}
            />
          </div>
          <span className=" px-2 py-2">{content}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
      })
    )
  }, [dispatch, store.data.length])

  const handleFilter = val => {
    setValue(val)
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue
      })
    )
  }

  const handlePerPage = e => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        status: statusValue,
        perPage: parseInt(e.target.value)
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

  const dataToRender = () => {
    const filters = {
      q: value,
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the values from the form inputs
    const name = event.target.querySelector("#name").value;
    const email = event.target.querySelector("#customer-email").value;
    const invoicingAddress = parseFloat(event.target.querySelector("#customer-address").value);
    const paymentTerm = event.target.querySelector("#payment-terms").value;

    // Call the addProduct API function to add the new product
    try {
      const newCustomer = {
        name,
        email,
        invoicingAddress,
        paymentTerm
      };

      const response = await addCustomer(newCustomer);
      if (response.error) {
        throw new error(response);
      }
      toast((t) => (
        <ToastContent t={t} content="Added Customer Successfully." />
      ));
      toggleSidebar();
    } catch (error) {

      toast(t => (
        <ToastContent t={t} content="Failed to Add Customer." />
      ))
      console.log(error)
      toggleSidebar();
    }
  };

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
      <Sidebar
        size="lg"
        open={open}
        title="Add Customer"
        headerClassName="mb-1"
        contentClassName="p-0"
        toggleSidebar={toggleSidebar}
      >
        <Form onSubmit={handleSubmit}>
          <div className="mb-2">
            <Label for="name" className="form-label">
              Customer Name
            </Label>
            <Input id="name" placeholder="John Doe" />
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
            <Label for="payment-terms" className="form-label">
              Payment Terms
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              id="payment-terms"
              options={paymentTerms}
              isClearable={false}
            />
          </div>

          <div className="d-flex flex-wrap my-2">
            <Button className="me-1" color="primary" type="submit">
              Add Customer
            </Button>
            <Button color="secondary" onClick={() => setOpen(false)} outline>
              Cancel
            </Button>
          </div>
        </Form>
      </Sidebar>
    </div>
  )
}

export default CustomerList
