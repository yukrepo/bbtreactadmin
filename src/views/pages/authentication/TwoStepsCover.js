// ** React Imports
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Button, Form, Input, Label } from 'reactstrap'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/two-steps-verification-illustration.svg'
import illustrationsDark from '@src/assets/images/pages/two-steps-verification-illustration-dark.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const TwoStepsCover = ({fromForgot}) => {
  // ** Hooks
  const { skin } = useSkin()

  const initialFormData = {
    email: fromForgot.email,
    code:'',
    newPassword:''
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const response = await forgotPassword(formData)
    // if (response.status === 200) {      
    //   navigate('/two-step', { state: formData })
    // }

    console.log(formData)

  }


  const source = skin === 'dark' ? illustrationsDark : illustrationsLight
  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          
          <h2 className='brand-text text-primary ms-1'>E-Invoicing</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bolder mb-1'>
              Two Step Verification 💬
            </CardTitle>
            <CardText className='mb-75'>
              We sent a verification code to your email. Enter the code from the email in the field below.
            </CardText>
            <CardText className='fw-bolder mb-2'>{formData.email}</CardText>
            <Form className='mt-2' onSubmit={handleSubmit}>
              <h6>Type your 6 digit security code</h6>
              <div className='mb-1'>
                  <Label className='form-label' for='code'>
                    Security Code
                  </Label>
                  <Input type='text' id='code' value={formData.code}
                    onChange={(e) => handleInputChange('email', e.target.value)} autoFocus />
                </div>
                <div className='mb-1'>
                  <Label className='form-label' for='pass'>
                    New Password
                  </Label>
                  <Input type='password' id='pass' value={formData.pass}
                    onChange={(e) => handleInputChange('email', e.target.value)} autoFocus />
                </div>
              <Button color='primary' block>
                  Change Password
                </Button>
            </Form>
            
          </Col>
        </Col>
      </Row>

    </div>
  )
}

export default TwoStepsCover
