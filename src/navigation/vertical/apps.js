// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Users, Briefcase, Shield } from 'react-feather'

export default [
  // invoice
  {
    id: 'invoiceApp',
    title: 'Invoice',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'invoiceAdd',
        title: 'Add',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/add'
      },
      {
        id: 'invoiceList',
        title: 'List',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/list'
      },
      {
        id: 'invoiceDrafts',
        title: 'Drafts',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/drafts'
      }
      
    ]
  },
  //estimate
  {
    id: 'estimateApp',
    title: 'Estimate',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'estimateList',
        title: 'List',
        icon: <Circle size={12} />,
        navLink: '/apps/estimate/list'
      },
      {
        id: 'estimateAdd',
        title: 'Add',
        icon: <Circle size={12} />,
        navLink: '/apps/estimate/add'
      }
    ]
  },
  //customer
  {
    id: 'customerApp',
    title: 'Customers',
    icon: <Users size={20} />,
    navLink: '/apps/customer/list'
  },
  // product
  {
    id: 'productApp',
    title: 'Products',
    icon: <Briefcase size={20} />,
    navLink: '/apps/product/list'
  },
  //Profile
  {
    id: 'profile',
    title: 'Profile',
    icon: <User size={20} />,
    children: [
      {
        id: 'details',
        title: 'Details',
        icon: <Circle size={12} />,
        navLink: '/pages/profile'
      },
      {
        id: 'company',
        title: 'Company',
        icon: <Circle size={12} />,
        navLink: '/apps/user/view'
      }
    ]
  }
]
