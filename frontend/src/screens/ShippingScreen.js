import React,{useState,useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions';



function ShippingScreen(){
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const history = useNavigate()
    const dispatch = useDispatch()
    const [address,setAddress] =useState(shippingAddress.address)
    const [city ,setCity] =useState(shippingAddress.city)
    const [postalCode,setPostalCode] =useState(shippingAddress.postalCode)
    const [country,setCountry] =useState(shippingAddress.country)
 

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history('/payment')
    }
    return(
        <FormContainer  >
            <CheckoutSteps  step1 step2 step3 step4/> 
            <h1>Shipping</h1>
            
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
                <Form.Control  required type='text' placeholder='Enter your address' 
                value={address ? address : ''} 
                onChange={(e)=> setAddress(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
                <Form.Control  required type='text' placeholder='Enter your city' 
                value={city ? city : ''} 
                onChange={(e)=> setCity(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
            <Form.Label>PostalCode</Form.Label>
                <Form.Control  required type='text' placeholder='Enter your postalcode' 
                value={postalCode ? postalCode : ''} 
                onChange={(e)=> setPostalCode(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
                <Form.Control  required type='text' placeholder='Enter your country' 
                value={country? country : ''} 
                onChange={(e)=> setCountry(e.target.value)}>

                </Form.Control>
            </Form.Group>

            <Button type='sunmit'variant='primary'>
                Continue
            </Button>


            </Form>
        </FormContainer>
    )
}

export default ShippingScreen