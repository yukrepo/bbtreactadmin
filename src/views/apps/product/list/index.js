// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// ** Table Columns
import { columns } from "./columns";

import Sidebar from "@components/sidebar";
import { selectThemeColors } from "@utils";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

import Select, { components } from "react-select";

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card, Form, Label } from "reactstrap";

// ** Store & Actions
import { getData } from "../store";
import { useDispatch, useSelector } from "react-redux";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CustomerList = () => {
  // ** Store vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.product);

  // ** States
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("desc");
  const [open, setOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const toggleSidebar = () => setOpen(!open);

  const CustomHeader = ({
    handleFilter,
    value,
    handleStatusValue,
    statusValue,
    handlePerPage,
    rowsPerPage,
  }) => {
    return (
      <div className="invoice-list-table-header w-100 py-2">
        <Row>
          <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
            <div className="d-flex align-items-center me-2">
              <label htmlFor="rows-per-page">Show</label>
              <Input
                type="select"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handlePerPage}
                className="form-control ms-50 pe-3"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
            </div>
            <Button onClick={toggleSidebar} color="primary">
              Add Product
            </Button>
          </Col>
          <Col
            lg="6"
            className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
          >
            <div className="d-flex align-items-center">
              <label htmlFor="search-invoice">Search</label>
              <Input
                id="search-invoice"
                className="ms-50 me-2 w-100"
                type="text"
                value={value}
                onChange={(e) => handleFilter(e.target.value)}
                placeholder="Search Product"
              />
            </div>
          </Col>
        </Row>
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
    );
  }, [dispatch, store.data.length]);

  const handleFilter = (val) => {
    setValue(val);
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
      })
    );
  };

  const handlePerPage = (e) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: parseInt(e.target.value),
      })
    );
    setRowsPerPage(parseInt(e.target.value));
  };

  const handlePagination = (page) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
        page: page.selected + 1,
      })
    );
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0));

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={"page-item"}
        breakLinkClassName="page-link"
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousLinkClassName={"page-link"}
        previousClassName={"page-item prev"}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    );
  };

  const dataToRender = () => {
    const filters = {
      q: value,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        perPage: rowsPerPage,
        sortColumn: column.sortField,
      })
    );
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
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
            className="react-dataTable"
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
        title="Add Product"
        headerClassName="mb-1"
        contentClassName="p-0"
        toggleSidebar={toggleSidebar}
      >
        <Form>
  <div className="mb-2">
    <Label for="product-name" className="form-label">
      Product Name
    </Label>
    <Input
      type="text"
      id="product-name"
      placeholder="Enter product name"
    />
  </div>
  <div className="mb-2">
    <Label for="description" className="form-label">
      Description
    </Label>
    <Input
      type="textarea"
      rows="3"
      id="description"
      placeholder="Enter product description"
    />
  </div>
  <div className="mb-2">
    <Label for="price" className="form-label">
      Price
    </Label>
    <Input
      type="number"
      step="0.01"
      id="price"
      placeholder="Enter product price"
    />
  </div>
  <div className="mb-2">
    <Label for="tax-code" className="form-label">
      Tax Code
    </Label>
    <Input
      type="text"
      id="tax-code"
      placeholder="Enter tax code"
    />
  </div>
  <div className="mb-2">
    <Label for="tax" className="form-label">
      Tax
    </Label>
    <Input
      type="number"
      step="0.01"
      id="tax"
      placeholder="Enter tax amount"
    />
  </div>
  <div className="d-flex flex-wrap my-2">
    <Button
      className="me-1"
      color="primary"
      onClick={() => setOpen(false)}
    >
      Add Product
    </Button>
    <Button color="secondary" onClick={() => setOpen(false)} outline>
      Cancel
    </Button>
  </div>
</Form>

      </Sidebar>
    </div>
  );
};

export default CustomerList;
