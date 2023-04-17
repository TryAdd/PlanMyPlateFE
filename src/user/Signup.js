import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

console.log('hi')
export default function Signup(props) {
    const [newUser, setNewUser] = useState({})

    const ChangeHandler = (e) =>{
        const user = {...newUser}
        user[e.target.name] = e.target.value
        setNewUser(user)
    }

    const registerHandler = () => {
        props.register(newUser)
    }

  return (
    <div className='container_sup'>
        <div className='inside'>
        <h1 id='Title'>Sign Up</h1>
        <div className='div'>
            <Container className='container_up'>
                <Form.Group className='container'>
                    <Form.Label><span className='lable'>UserName</span></Form.Label>
                    <Form.Control name='UserName' onChange={ChangeHandler}/>
                </Form.Group>
                <Form.Group className='container'>
                    <Form.Label><span className='lable'>Email Address</span></Form.Label>
                    <Form.Control name='emailAddress' type='emailAddress' onChange={ChangeHandler}/>
                </Form.Group>
                <Form.Group className='container'>
                    <Form.Label><span className='lable'>Password</span></Form.Label>
                    <Form.Control name='password' type='password' onChange={ChangeHandler}/>
                </Form.Group>

                <Button variant="dark" id="square" onClick={registerHandler}> Register </Button>
            </Container>
        </div>
        </div>
    </div>
  )
}
