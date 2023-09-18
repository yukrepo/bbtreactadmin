// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button, Input } from 'reactstrap'

const AddActions = ({ onSave }) => {
  const handleSaveClick = async () => {    
    const dataToSave = onSave();

    try {
      // Make an HTTP POST request to your predefined API
     
      console.log(dataToSave)
      // Handle the response from the API as needed
      console.log('Data saved successfully:');
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error saving data:', error);
    }
  };
  return (
    <Fragment>
      <Card className='invoice-action-wrapper'>
        <CardBody>
          <Button color='primary' block className='mb-75' disabled>
            Send Invoice
          </Button>
          <Button color='primary' block outline onClick={handleSaveClick}>
            Create Estimate
          </Button>
        </CardBody>
      </Card>
      <div className='mt-2'>
        
       
      </div>
    </Fragment>
  )
}

export default AddActions
