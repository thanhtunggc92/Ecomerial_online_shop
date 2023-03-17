import React,{useState,useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Form,Button ,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod  } from '../actions/cartActions';




function PaymentScreen (){
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()
    const history = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    if (!shippingAddress.address){
        history('login/shipping')
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod)) 
        history('/placeorder')
    }
    return(
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
                <Form onSubmit={submitHandler}>
                        <Form.Label as='legend' >
                            Select Method 
                        </Form.Label>
                        <Col>
                            <Form.Check type='radio' label= 'Paypal or Credit Card' id ='Paypal'
                            name='paymentMethod' checked 
                            onChange={(e)=> setPaymentMethod(e.target.value)}>

                            </Form.Check>
                        </Col>
                        <Button type='submit' variant='primary'>
                            Continue
                        </Button>
                </Form>
          
        </FormContainer>
    )
}

export default PaymentScreen