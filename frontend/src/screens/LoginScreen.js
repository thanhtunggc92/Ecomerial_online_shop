import React,{useState,useEffect} from 'react'
import { Link, useNavigate,useLocation} from 'react-router-dom'
import { Form,Row,Col,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
function LoginScreen() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {search} = useLocation()
    const history = useNavigate()
    const redirect = search ? search.split("=")[1]:'/'
    console.log(redirect)
    const dispatch  = useDispatch() 
    const userLogin = useSelector(state => state.userLogin)
    const {error,loading, userInfo} = userLogin

    useEffect(()=>{
        if (userInfo){
            history(redirect)
          
        }
    },[history,redirect,userInfo])
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email,password))
    }

  return (
    <FormContainer>
            <h1>Sign In</h1>    
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}>

                    </Form.Control>

                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
                </Col>
            </Row>
        
    </FormContainer>
  )
}

export default LoginScreen