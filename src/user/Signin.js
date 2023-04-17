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
         <div className='container_sup'>
        <div className='inside'>
        <h1 id='Title'>Sign In</h1>

            <Container>
                <Form.Group>
                    <Form.Label ><span className='lable'>Email Address</span></Form.Label>
                    <Form.Control name='emailAddress' type='emailAddress' onChange={ChangeHandler}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> <span className='lable'>Password</span></Form.Label>
                    <Form.Control name='password' type='password' onChange={ChangeHandler}/>
                </Form.Group>

                <Button variant="dark" id="square" onClick={logInHandler}> Log In </Button>
            </Container>
        </div>
        </div>
    </div>
  )
}
