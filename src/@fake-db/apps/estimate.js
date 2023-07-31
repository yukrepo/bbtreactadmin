import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

// Avatar Import
import avatar1 from '@src/assets/images/avatars/1-small.png'
import avatar2 from '@src/assets/images/avatars/2-small.png'
import avatar3 from '@src/assets/images/avatars/3-small.png'
import avatar4 from '@src/assets/images/avatars/4-small.png'
import avatar5 from '@src/assets/images/avatars/5-small.png'
import avatar6 from '@src/assets/images/avatars/6-small.png'
import avatar7 from '@src/assets/images/avatars/7-small.png'
import avatar8 from '@src/assets/images/avatars/8-small.png'
import avatar9 from '@src/assets/images/avatars/9-small.png'
import avatar10 from '@src/assets/images/avatars/10-small.png'

const data = {
  estimates: [
    {
      id: 4987,
      issuedDate: '13 Dec 2019',
      expiryDate: '15 Dec 2019',
      client: {
        address: '7777 Mendez Plains',
        company: 'Hall-Robbins PLC',
        companyEmail: 'don85@johnson.com',
        country: 'USA',
        contact: '(616) 865-4180',
        name: 'Jordan Stevenson'
      },
      service: 'Software Development',
      total: 3428,
      avatar: '',
      estimateStatus: 'Paid',
      balance: '$724',
      dueDate: '23 Apr 2019'
    },
    {
        id: 4988,
        issuedDate: '13 Dec 2019',
        expiryDate: '15 Dec 2019',
        client: {
          address: '7777 Mendez Plains',
          company: 'Hall-Robbins PLC',
          companyEmail: 'don85@johnson.com',
          country: 'USA',
          contact: '(616) 865-4180',
          name: 'Jordan Stevenson'
        },
        service: 'Software Development',
        total: 3428,
        avatar: '',
        estimateStatus: 'Paid',
        dueDate: '23 Apr 2019'
      },
      {
        id: 4989,
        issuedDate: '18 Dec 2019',
        expiryDate: '20 Dec 2019',
        client: {
          address: '1234 Elm Street',
          company: 'Smith & Co.',
          companyEmail: 'smith@example.com',
          country: 'Canada',
          contact: '(123) 456-7890',
          name: 'Emily Smith'
        },
        service: 'Web Design',
        total: 2500,
        avatar: '',
        estimateStatus: 'Paid',
        balance: '$0',
        dueDate: '28 Feb 2020'
      },
      {
        id: 4990,
        issuedDate: '22 Dec 2019',
        expiryDate: '25 Dec 2019',
        client: {
          address: '4567 Oak Avenue',
          company: 'Johnson Enterprises',
          companyEmail: 'info@johnsonent.com',
          country: 'UK',
          contact: '(987) 654-3210',
          name: 'Michael Johnson'
        },
        service: 'Mobile App Development',
        total: 5000,
        avatar: '',
        estimateStatus: 'Pending',
        dueDate: '15 Mar 2020'
      },
  ]
}

// ------------------------------------------------
// GET: Return Invoice List
// ------------------------------------------------
mock.onGet('/apps/estimate/estimates').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, status = null, sort, sortColumn } = config
  /* eslint-enable */

  const dataAsc = data.estimates.sort((a, b) => {
    if (a[sortColumn]) {
      return a[sortColumn] < b[sortColumn] ? -1 : 1
    } else {
      const splitColumn = sortColumn.split('.')
      const columnA = a[splitColumn[0]][splitColumn[1]]
      const columnB = b[splitColumn[0]][splitColumn[1]]
      return columnA < columnB ? -1 : 1
    }
  })

  const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

  const queryLowered = q.toLowerCase()

  const filteredData = dataToFilter.filter(estimate => {
    if (queryLowered.length && String('paid').includes(queryLowered) && estimate.balance === 0) {
      return estimate.balance === 0
    } else {
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      return (
        (estimate.client.companyEmail.toLowerCase().includes(queryLowered) ||
          estimate.client.name.toLowerCase().includes(queryLowered) ||
          String(estimate.id).toLowerCase().includes(queryLowered) ||
          String(estimate.total).toLowerCase().includes(queryLowered) ||
          String(estimate.balance).toLowerCase().includes(queryLowered) ||
          estimate.dueDate.toLowerCase().includes(queryLowered)) &&
        estimate.estimateStatus.toLowerCase() === (status.toLowerCase() || estimate.estimateStatus.toLowerCase())
      )
    }
  })
  /* eslint-enable  */

  return [
    200,
    {
      allData: data.estimates,
      total: filteredData.length,
      estimates: filteredData.length <= perPage ? filteredData : paginateArray(filteredData, perPage, page)
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Estimate
// ------------------------------------------------
mock.onGet(/\/api\/estimate\/estimates\/\d+/).reply(config => {
  // // Get event id from URL
  const estimateId = Number(config.url.substring(config.url.lastIndexOf('/') + 1))

  const estimateIndex = data.estimates.findIndex(e => e.id === estimateId)
  const responseData = {
    estimate: data.estimates[estimateIndex],
    paymentDetails: {
      totalDue: '$12,110.55',
      bankName: 'American Bank',
      country: 'United States',
      iban: 'ETD95476213874685',
      swiftCode: 'BR91905'
    }
  }
  return [200, responseData]
})

// ------------------------------------------------
// DELETE: Deletes Invoice
// ------------------------------------------------
mock.onDelete('/apps/estimate/delete').reply(config => {
  // Get estimate id from URL
  let estimateId = config.id

  // Convert Id to number
  estimateId = Number(estimateId)

  const estimateIndex = data.estimates.findIndex(t => t.id === estimateId)
  data.estimates.splice(estimateIndex, 1)

  return [200]
})

// ------------------------------------------------
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/api/estimate/clients').reply(() => {
  const clients = data.estimates.map(estimate => estimate.client)
  return [200, clients.slice(0, 5)]
})
