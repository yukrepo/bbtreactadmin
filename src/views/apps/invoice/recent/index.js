// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from "reactstrap";

// ** Store & Actions
import { getData } from "../store";
import { useDispatch, useSelector } from "react-redux";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const InvoiceFive = () => {
  // ** Store vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.invoice);

  // ** States
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(
      getData({
        q: value,
      })
    );
  }, [dispatch, store.data.length]);

  const dataToRender = () => {
    const filters = {
      q: value,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      // Get the last 5 invoices from the data array
      const lastFiveInvoices = store.data.slice(-5);
      return lastFiveInvoices;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, 5);
    }
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable  
            noHeader    
            columns={columns}
            responsive={true}
            data={dataToRender()}
            className="react-dataTable"
            
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceFive;
