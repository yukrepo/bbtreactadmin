// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'

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
    cell: row => <Link to={`/apps/customer/edit/${row._id}`}>{`#${row._id}`}</Link>
  },
  {
    sortable: true,
    minWidth: '102px',
    sortField: 'name',
    name: 'Name',
    // selector: row => row.invoiceStatus,
    cell: row => <Link to={`/apps/customer/edit/${row.id}`}>{`${row.name}`}</Link>
  },
  {
    sortable: true,
    minWidth: '102px',
    sortField: 'email',
    name: 'Email',
    // selector: row => row.invoiceStatus,
    cell: row => <Link to={`/apps/customer/edit/${row.id}`}>{`${row.email}`}</Link>
  },
  {
    name: 'Address',
    sortable: false,
    minWidth: '350px',
    // selector: row => row.client.name,
    cell: row => <Link to={`/apps/customer/edit/${row.id}`}>{`${row.invoicingAddress}`}</Link>
  },
  {
    name: 'Payment Terms',
    sortable: false,
    minWidth: '150px',
    // selector: row => row.total,
    cell: row => <span>{row.paymentTerm}</span>
  }
]
