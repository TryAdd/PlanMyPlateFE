import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
export default function Signin(props) {

    const [newUser, setNewUser] = useState({})

    const ChangeHandler = (e) =>{
        const user = {...newUser}
        user[e.target.name] = e.target.value
        setNewUser(user)
    }

    const logInHandler = () => {
        props.login(newUser)
    }

  return (
    <div>
        <h1>Sign In</h1>

        <Container>
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name='emailAddress' type='emailAddress' onChange={ChangeHandler}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type='password' onChange={ChangeHandler}/>
            </Form.Group>

            <Button variant='primary' onClick={logInHandler}> Log In </Button>
        </Container>
    </div>
  )
}
