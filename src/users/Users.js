import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Support from '../tickets/Support';


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
  const tokenExpireDefault = new Date(new Date().getTime() + 1000 * 60 * 60); // 1 hour


  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenExpired = queryParams.get('tokenExpired');
    if (tokenExpired === 'true') {
      setErrorMessage('Your session has expired. Please log in again.');
    }
    // Check if user state variable is empty
    if (user == null) {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
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
        body: JSON.stringify({ email, password })
      });
      // if the response is not ok setErrorMessage
      if (!response.ok) {
        setErrorMessage('Invalid email or password');
      } else {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('tokenExpireDate', tokenExpireDefault);
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
    localStorage.removeItem('tokenExpireDate');
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
        body: JSON.stringify({ email, username, password })
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
        <div className="mt-2 text-end">
              <button className="btn border-purple text-purple bg-blu" onClick={handleSignOff}>Sign off</button>
            </div>
          <div className="text-center mb-3 mt-3">
            <Support />
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
