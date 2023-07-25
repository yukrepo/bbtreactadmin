import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'


const data = {
  products: [
    {
        id: 3456,
        name: 'Product 1',
        description: 'Description of Product 1',
        price: '500',
        taxCode: 'xde34',
        tax: '18'
    },
    {
        id: 3457,
        name: 'Product 2',
        description: 'Description of Product 2',
        price: '600',
        taxCode: 'xde34',
        tax: '18'
    },
    {
        id: 3458,
        name: 'Product 3',
        description: 'Description of Product 3',
        price: '700',
        taxCode: 'xde34',
        tax: '18'
    },
  ]
}


// Mock API endpoint for getting customers
mock.onGet('/apps/product/products').reply(config => {
    const { q = '', perPage = 10, page = 1, sort, sortColumn } = config;
  
    // Sorting the customers based on the specified sortColumn
    const dataAsc = data.products.sort((a, b) => {
      if (a[sortColumn]) {
        return a[sortColumn] < b[sortColumn] ? -1 : 1;
      } else {
        const splitColumn = sortColumn.split('.');
        const columnA = a[splitColumn[0]][splitColumn[1]];
        const columnB = b[splitColumn[0]][splitColumn[1]];
        return columnA < columnB ? -1 : 1;
      }
    });
  
    const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse();
  
    const queryLowered = q.toLowerCase();
  
    // Filtering and paginating the customers
    const filteredData = dataToFilter.filter(product => {
      return (
        product.name.toLowerCase().includes(queryLowered) ||
        product.price.toLowerCase().includes(queryLowered) ||
        product.tax.toLowerCase().includes(queryLowered)
      );
    });
  
    const total = filteredData.length;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
  
    return [
      200,
      {
        allData: data.products,
        total,
        products: paginatedData,
      }
    ];
  });
  