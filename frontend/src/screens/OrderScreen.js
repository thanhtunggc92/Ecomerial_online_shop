import React,{useEffect, useState} from 'react'
import { Link,useParams} from 'react-router-dom'
import { Row,Col,Image,Card,ListGroup } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import {getOrderDetails,payOrder} from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ORDER_PAY_RESET } from '../constants/orderConstants'



function OrderScreen(){
    const {id} = useParams()
    
    const orderDetails = useSelector(state => state.orderDetails)
    const {order,error,loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay , success:successPay} = orderPay

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()

    if (!loading && !error){
        order.itemsPrice = (order.orderItems.reduce((acc , item) => acc + item.price * item.qty,0)).toFixed(2)
   
    }
    const addPaypalScript = () =>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://www.paypal.com/sdk/js?client-id=AVSk0YQqfKjfT_RxKgCht8XKNUriuqtlg590In8Ry52tmNMWn6NSQ7P1PGs8izb5brk5vnUC1_WRTKf3"
        script.async = true
        script.onload = () =>{
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
   
    useEffect(()=>{
        if(!order || successPay||order._id !== Number(id)){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(id))
        } else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }
  
    },[dispatch,order,id,successPay])

    const successPaymentHandler =(paymentResult)=>{
        dispatch(payOrder(id,paymentResult))
    }


    return loading ? (
        <Loader /> ) : 
        error ? ( <Message variant='danger' >{error}</Message>):
        (
        <div>
            <h1>Order: {order._id}</h1>

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                    <p><strong>Name: </strong> {order.user.name}</p>
                                    <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                    <p>
                                        <strong>Shipping: </strong>
                                        {order.shippingAddress.address},  {order.shippingAddress.city}  {order.shippingAddress.postalCode},  {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivery ? (<Message variant='success'>Delivery on {order.deliveryAt}</Message>):
                            (<Message variant='warning'>Not Delivery</Message>)}
                            </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (<Message variant='success'>Paid on {order.paidAt}</Message>):
                            (<Message variant='warning'>Order not pay</Message>)}
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'> 
                                Your order is empty
                            </Message>:(
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item,index) =>(
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}> {item.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                       
                                        </ListGroup>
                            )
                            }
                      
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Col>


                <Col md={4}>
                    <Card>
                        <ListGroup>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>Order Summary</ListGroup.Item>
                        </ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup>
                                    {loadingPay && <Loader />  }
                                    {!sdkReady ?(
                                        <Loader />
                                    ):(
                                        <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )   }  
                                </ListGroup>
                            )}

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    

)}
export default OrderScreen

