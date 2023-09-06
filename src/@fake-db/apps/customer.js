import mock from "../mock";

// ** Utils
import { paginateArray } from "../utils";

const data = {
  customers: [
    {
      id: 3456,
      name: "Aman",
      email: "aman@aman.com",
      address: "B12, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3457,
      name: "Ankit",
      email: "ankit@aman.com",
      address: "B22, Sector 2 Noida",
      paymentTerms: "PAY60",
    },
    {
      id: 3458,
      name: "Mishra",
      email: "mishra@aman.com",
      address: "B32, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3459,
      name: "Aman",
      email: "aman@aman.com",
      address: "B12, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3460,
      name: "Ankit",
      email: "ankit@aman.com",
      address: "B22, Sector 2 Noida",
      paymentTerms: "PAY60",
    },
    {
      id: 3461,
      name: "Mishra",
      email: "mishra@aman.com",
      address: "B32, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3462,
      name: "Aman",
      email: "aman@aman.com",
      address: "B12, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3463,
      name: "Ankit",
      email: "ankit@aman.com",
      address: "B22, Sector 2 Noida",
      paymentTerms: "PAY60",
    },
    {
      id: 3464,
      name: "Mishra",
      email: "mishra@aman.com",
      address: "B32, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3465,
      name: "Aman",
      email: "aman@aman.com",
      address: "B12, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3466,
      name: "Ankit",
      email: "ankit@aman.com",
      address: "B22, Sector 2 Noida",
      paymentTerms: "PAY60",
    },
    {
      id: 3467,
      name: "Mishra",
      email: "mishra@aman.com",
      address: "B32, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3468,
      name: "Aman",
      email: "aman@aman.com",
      address: "B12, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3469,
      name: "Ankit",
      email: "ankit@aman.com",
      address: "B22, Sector 2 Noida",
      paymentTerms: "PAY60",
    },
    {
      id: 3470,
      name: "Mishra",
      email: "mishra@aman.com",
      address: "B32, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3471,
      name: "Aman",
      email: "aman@aman.com",
      address: "B12, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
    {
      id: 3472,
      name: "Ankit",
      email: "ankit@aman.com",
      address: "B22, Sector 2 Noida",
      paymentTerms: "PAY60",
    },
    {
      id: 3473,
      name: "Mishra",
      email: "mishra@aman.com",
      address: "B32, Sector 2 Noida",
      paymentTerms: "PAY30",
    },
  ],
};

// Mock API endpoint for getting customers
mock.onGet("/apps/customer/customers").reply((config) => {
  const { q = "", perPage = 10, page = 1, sort, sortColumn } = config;

  // Sorting the customers based on the specified sortColumn
  const dataAsc = data.customers.sort((a, b) => {
    if (a[sortColumn]) {
      return a[sortColumn] < b[sortColumn] ? -1 : 1;
    } else {
      const splitColumn = sortColumn.split(".");
      const columnA = a[splitColumn[0]][splitColumn[1]];
      const columnB = b[splitColumn[0]][splitColumn[1]];
      return columnA < columnB ? -1 : 1;
    }
  });

  const dataToFilter = sort === "asc" ? dataAsc : dataAsc.reverse();

  const queryLowered = q.toLowerCase();

  // Filtering and paginating the customers
  const filteredData = dataToFilter.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(queryLowered) ||
      customer.email.toLowerCase().includes(queryLowered) ||
      customer.address.toLowerCase().includes(queryLowered) ||
      customer.paymentTerms.toLowerCase().includes(queryLowered)
    );
  });

  const total = filteredData.length;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return [
    200,
    {
      allData: data.customers,
      total,
      customers: paginatedData,
    },
  ];
});
