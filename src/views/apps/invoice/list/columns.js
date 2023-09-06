// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { deleteInvoice } from '../store'

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.avatar.length) {
    return <Avatar className='me-50' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color} className='me-50' content={row.client ? row.client.name : 'John Doe'} initials />
  }
}

// ** Table columns
export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: '_id',
    minWidth: '107px',
    // selector: row => row.id,
    cell: row => <Link to={`/apps/estimate/preview/${row.id}`}>{`#${row.refNo}`}</Link>
  },
  // {
  //   sortable: true,
  //   minWidth: '102px',
  //   sortField: 'estimateStatus',
  //   name: <TrendingUp size={14} />,
  //   // selector: row => row.estimateStatus,
  //   cell: row => {
  //     const color = estimateStatusObj[row.estimateStatus] ? estimateStatusObj[row.estimateStatus].color : 'primary',
  //       Icon = estimateStatusObj[row.estimateStatus] ? estimateStatusObj[row.estimateStatus].icon : Edit
  //     return (
  //       <Fragment>
  //         <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
  //         <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
  //           <span className='fw-bold'>{row.estimateStatus}</span>
  //           <br />
  //           <span className='fw-bold'>Balance:</span> {row.balance}
  //           <br />
  //           <span className='fw-bold'>Due Date:</span> {row.dueDate}
  //         </UncontrolledTooltip>
  //       </Fragment>
  //     )
  //   }
  // },
  {
    name: 'Client',
    sortable: false,
    minWidth: '350px',
    // selector: row => row.client.name,
    cell: row => <span>{row.customer || 0}</span>
  },
  {
    name: 'Total',
    sortable: true,
    minWidth: '150px',
    sortField: 'total',
    // selector: row => row.total,
    cell: row => <span>₹ {row.totalAmount || 0}</span>
  },
  {
    name: 'Due',
    sortable: true,
    minWidth: '150px',
    sortField: 'total',
    // selector: row => row.total,
    cell: row => <span>₹ {row.dueAmount || 0}</span>
  },
  {
    sortable: true,
    minWidth: '200px',
    name: 'Issued Date',
    sortField: 'dueDate',
    cell: row => row.date
    // selector: row => row.dueDate
  },
  // {
  //   sortable: true,
  //   minWidth: '200px',
  //   name: 'Expiry Date',
  //   sortField: 'dueDate',
  //   cell: row => row.expiryDate
  //   // selector: row => row.dueDate
  // },
  // {
  //   sortable: true,
  //   name: 'Balance',
  //   minWidth: '164px',
  //   sortField: 'balance',
  //   // selector: row => row.balance,
  //   cell: row => {
  //     return row.balance !== 0 ? (
  //       <span>{row.balance}</span>
  //     ) : (
  //       <Badge color='light-success' pill>
  //         Paid
  //       </Badge>
  //     )
  //   }
  // },
  {
    name: 'Action',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Send className='cursor-pointer' size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>
        <Link to={`/apps/estimate/edit/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Edit size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Estimate
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Download size={14} className='me-50' />
              <span className='align-middle'>Download</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/apps/estimate/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteEstimate(row.id))
              }}
            >
              <Trash size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Copy size={14} className='me-50' />
              <span className='align-middle'>Duplicate</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]

