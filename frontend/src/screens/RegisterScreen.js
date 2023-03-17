import React,{useState,useEffect} from 'react'
import { Link, useNavigate,useLocation} from 'react-router-dom'
import { Form,Row,Col,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register} from '../actions/userActions'



function RegisterScreen() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [message,setMessage] = useState("")
    const {search} = useLocation()
    const history = useNavigate()
    const redirect = search ? search.split("=")[1]:'/'
    console.log(redirect)
    const dispatch  = useDispatch() 
    const userRegister = useSelector(state => state.userRegister)
    const {error,loading, userInfo} = userRegister

    useEffect(()=>{
        if (userInfo){
            history(redirect)
          
        }
    },[history,redirect,userInfo])
    const submitHandler = (e) =>{
        e.preventDefault();
        if (password !== confirmPassword){
            setMessage('Password does not match')
        }else{
            dispatch(register(name,email,password))
        }
        
    }

  return (
    <FormContainer>
    <h1>Register</h1>   
    {message && <Message variant='danger'>{message}</Message>} 
    {error && <Message variant='danger'>{error}</Message>}
    {loading && <Loader />}
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control  required type='name' placeholder='Enter your name' value={name} onChange={(e)=> setName(e.target.value)}>

            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control   required type='email' placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)}>

            </Form.Control>
        </Form.Group>


        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control  required type='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}>

            </Form.Control>

        </Form.Group>
        
        <Form.Group controlId='passwordConfirm'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control  required  type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}>

            </Form.Control>

        </Form.Group>
        <Button type='submit' variant='primary'>Register</Button>
    </Form>
    <Row className='py-3'>
        <Col>
            Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Sign In</Link>
        </Col>
    </Row>

</FormContainer>
)
}


export default RegisterScreen