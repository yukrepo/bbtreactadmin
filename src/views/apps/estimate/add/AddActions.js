// ** React Imports
import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, X } from "react-feather";

// ** Reactstrap Imports
import { Card, CardBody, Button, Input } from 'reactstrap'
import { createEstimate } from '../../../../utility/api'
import toast from "react-hot-toast";

const AddActions = ({ onSave }) => {
  const navigate = useNavigate();
  const handleSaveClick = async () => {
    const dataToSave = await onSave();

    try {

      const response = await createEstimate(dataToSave);
      if (response.error) {
        throw new error(response);
      }
      toast((t) => (
        <ToastContent t={t} content="Estimate Created Successfully." />
      ));
      navigate('/apps/estimate/list');
      
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error creating Estimate:', error);
      toast(t => (
        <ToastContent t={t}  content="Failed to Add Estimate." />
      ))
    }
  };
  const ToastContent = ({ t, content }) => {
    return (
      <div className="d-flex">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            <X
              size={15}
              color="#FF0000"
              className="cursor-pointer"
              onClick={() => toast.dismiss(t.id)}
            />
          </div>
          <span className=" px-2 py-2">{content}</span>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <Card className='invoice-action-wrapper'>
        <CardBody>
          <Button color='primary' block className='mb-75' disabled>
            Send
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
