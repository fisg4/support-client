import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default function Users(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Update initial value to an empty object
  const [errorMessage, setErrorMessage] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updateErrorMessage, setUpdateErrorMessage] = useState('');

  useEffect(() => {
    // Check if user state variable is empty
    if (user == null) {
      const accessToken = localStorage.getItem('token');
      if (accessToken){
        setProfile();
      }
    }
  }, [user]);

  const setProfile = async () => {
    if (user == null) {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        const response = await fetch('/api/v1/users/profile', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const user = await response.json();
        // store in local storage
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsLoggedIn(true);
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });
      // if the response is not ok setErrorMessage
      if (!response.ok) {
        setErrorMessage('Invalid email or password');
      }else{
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        setProfile();
        setIsLoggedIn(true);
        setErrorMessage('');
        // reload page
        window.location.reload();
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  }

  const showForm = () => {
    setShowUpdateForm(!showUpdateForm);
    setEmail(user.email);
    setUsername(user.username);
  }

  const handleSignOff = () => {
    setUser(null); // Clear user data
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // reload page
    window.location.reload();
  }
  
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      fetch('/api/v1/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({email, username, password})
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setUpdateErrorMessage(data.message);
          } else {
            setUpdateErrorMessage('');
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            window.location.reload();
          }
        });
    }
  }
  return (
    <div>
      {isLoggedIn ? (
        <>
        <div className="text-center mb-3">
          <h1>Login successful</h1>
          <Link to={`/support`}>
            <div className="btn border-purple text-purple bg-blue btn-lg">
              Go to support
            </div>
          </Link>
        </div>
        <div className="text-center">
          <Card className="mx-auto" style={{ width: '20rem' }}>
            <CardBody>
              <CardTitle>Usuario: {user.username}</CardTitle>
              <CardSubtitle>Email: {user.email}</CardSubtitle>
            </CardBody>
          </Card>
          <div className="mt-2">
            <Button onClick={handleSignOff}>Sign off</Button>
          </div>
          {showUpdateForm ? (
            <div className="mt-2">
              <Card className='d-flex justify-content-center w-50 mx-auto'>
                <CardBody>
                  <CardTitle className='display-4 text-center'>Edit your info</CardTitle>
        {errorMessage && <p className='text-center text-danger'>{errorMessage}</p>}
        <Form onSubmit={handleUpdate}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Edit
          </Button>
        </Form>
      </CardBody>
    </Card>
            </div>
          ) : null}
        </div>

        </>
        
      ) : (
        <Card className="mx-auto" style={{ width: '20rem' }}>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input type="text" name="email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" placeholder="Password" />
              </FormGroup>
              <Button className="text-center" type="submit">Log in</Button>
              {errorMessage && <div className="text-center mt-3 text-danger">{errorMessage}</div>}
            </Form>
          </CardBody>
        </Card>
      )}
    </div>
  );
}  