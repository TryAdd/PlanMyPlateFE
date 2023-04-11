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
    <div>
        <h1>Sign Up</h1>

        <Container>
            <Form.Group>
                <Form.Label>UserName</Form.Label>
                <Form.Control name='UserName' onChange={ChangeHandler}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name='emailAddress' type='emailAddress' onChange={ChangeHandler}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type='password' onChange={ChangeHandler}/>
            </Form.Group>

            <Button variant='primary' onClick={registerHandler}> Register </Button>
        </Container>
    </div>
  )
}
