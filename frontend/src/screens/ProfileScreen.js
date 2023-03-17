import React,{useState,useEffect} from 'react'
import { Link, useNavigate,} from 'react-router-dom'
import { Form,Row,Col,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails} from '../actions/userActions'



function ProfileScreen() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [message,setMessage] = useState("")

    const history = useNavigate()

    const dispatch  = useDispatch() 

    const userDetails = useSelector(state => state.userDetails)
    const {error,loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    useEffect(()=>{
        if (!userInfo){
            history('/login') 
        }else{
            if (!user || !user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,history,userInfo,user])
    const submitHandler = (e) =>{
        e.preventDefault();
        if (password !== confirmPassword){
            setMessage('Password does not match')
        }else{
            console.log('updating...')
        }
        
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
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
            <Form.Control  type='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}>

            </Form.Control>

        </Form.Group>
        
        <Form.Group controlId='passwordConfirm'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control    type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}>

            </Form.Control>

        </Form.Group>
        <Button type='submit' variant='primary'>Update</Button>
    </Form>
        </Col>

        <Col md={9}>
            <h2>My Order</h2>
        </Col>
        
    </Row>
  )
}

export default ProfileScreen