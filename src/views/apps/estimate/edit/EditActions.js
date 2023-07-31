// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button, Input } from 'reactstrap'

const EditActions = ({ id, setSendSidebarOpen, setAddPaymentOpen }) => {
  return (
    <Fragment>
      <Card className='invoice-action-wrapper'>
        <CardBody>
          <Button color='primary' block className='mb-75' >
            Send Estimate
          </Button>          
          <Button color='primary' block outline className='mb-75'>
            Save
          </Button>
          <Button color='success' block >
            Convert to Invoice
          </Button>
        </CardBody>
      </Card>      
    </Fragment>
  )
}

export default EditActions
