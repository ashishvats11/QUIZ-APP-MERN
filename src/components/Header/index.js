import React, { useState, useRef } from 'react';
import { Menu, Button, Modal, Form, Message } from 'semantic-ui-react';
// import axios from '../../axios';
const LOGIN_URL = '/user/login';
const REG_URL = '/user/register';

const Header = () => {
  const currUsername = useRef('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify(
          {
            email: loginEmail,
            password: loginPassword
          }
        ),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      // console.log(JSON.stringify(response?.data?.token));
      const token = response?.data?.token;
      localStorage.setItem('token', token);

      currUsername.current = response?.data?.username;
      setUserLoggedIn(true);

      setLoginEmail('');
      setLoginPassword('');

      console.log('Login Successful!');
    } catch (err) {
      console.log(err.response);
      if (!err?.response) {
        setError('Login not successful. Please try again.');
      } else if (err.response?.status === 404) {
        setError(err.response?.data?.message);
      } else if (err.response?.status === 401) {
        setError(err.response?.data?.message);
      } else if (err.response?.status === 500) {
        setError('Internal Server Error.');
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        REG_URL,
        JSON.stringify(
          {
            username: signupUsername,
            email: signupEmail,
            password: signupPassword
          }
        ),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      // console.log(JSON.stringify(response?.data?.token));
      const token = response?.data?.token;
      localStorage.setItem('token', token);

      currUsername.current = response?.data?.username;
      setUserLoggedIn(true);

      console.log('Sign Up Successful!');
      // console.log(currUsername.current);
    } catch (err) {
      if (!err?.response) {
        setError('Sign Up not successful. Please try again.');
      } else if (err.response?.status === 409) {
        setError(err.response?.data?.message);
      } else if (err.response?.status === 500) {
        setError('Internal Server Error.')
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserLoggedIn(false);
    currUsername.current = '';
    setLoginModalOpen(false);
    setSignupModalOpen(false);
  };

  return (
    <Menu stackable inverted size="massive">
      <Menu.Item header>
        <h1 style={{ color: '#2185D0' }}>QuizWhiz</h1>
      </Menu.Item>
      {isUserLoggedIn ?
        (<React.Fragment>
          <Menu.Item position='right'>
            <button class="ui active button">
              <i class="user circle icon"></i>
              {currUsername.current}
            </button>
          </Menu.Item>
          <Menu.Item>
            <button class="ui active button" onClick={handleLogout}>
              Log Out
            </button>
          </Menu.Item>
        </React.Fragment>)
        :
        (<React.Fragment>
          <Menu.Item position="right">
            <Button color="teal" content="Login" onClick={() => setLoginModalOpen(true)} />
            <Modal
              open={loginModalOpen}
              onClose={() => setLoginModalOpen(false)}
              size="mini"
              centered={false}
            >
              <Modal.Header>Login</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button content="Cancel" onClick={() => setLoginModalOpen(false)} />
                <Button
                  color="teal"
                  content="Login"
                  onClick={handleLogin}
                  disabled={!loginEmail || !loginPassword}
                />
              </Modal.Actions>
              {
                error &&
                <Message negative>
                  <Message.Header>Error!</Message.Header>
                  <p>{error}</p>
                </Message>
              }
            </Modal>
          </Menu.Item>
          <Menu.Item>
            <Button color="blue" content="Sign up" onClick={() => setSignupModalOpen(true)} />
            <Modal
              open={signupModalOpen}
              onClose={() => setSignupModalOpen(false)}
              size="mini"
              centered={false}
            >
              <Modal.Header>Sign up</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder="Username"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button content="Cancel" onClick={() => setSignupModalOpen(false)} />
                <Button
                  color="blue"
                  content="Sign up"
                  onClick={handleSignup}
                  disabled={!signupUsername || !signupEmail || !signupPassword}
                />
              </Modal.Actions>
              {
                error &&
                <Message negative>
                  <Message.Header>Error!</Message.Header>
                  <p>{error}</p>
                </Message>
              }
            </Modal>
          </Menu.Item>
        </React.Fragment>)}
    </Menu>
  );
};

export default Header;