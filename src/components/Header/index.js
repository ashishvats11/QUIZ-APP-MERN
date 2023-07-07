import React, { useState } from 'react';
import { Menu, Button, Modal, Form } from 'semantic-ui-react';
import axios from '../../api/axios';
const LOGIN_URL = '/user/login';
const REG_URL = '/user/register';

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  let isAppInstalled = false;

  if (window.matchMedia('(display-mode: standalone)').matches || appAccepted) {
    isAppInstalled = true;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    setPromptEvent(e);
  });

  const installApp = () => {
    promptEvent.prompt();
    promptEvent.userChoice.then((result) => {
      if (result.outcome === 'accepted') {
        setAppAccepted(true);
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    });
  };

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
      // eslint-disable-next-line
      const token = response?.data?.token;
      setLoginEmail('')
      setLoginPassword('')
      console.log('Login Successful');
    } catch (err) {
      if (!err?.response) {
        console.log('Login not successful / No server response.');
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
      // eslint-disable-next-line
      const token = response?.data?.token;
    } catch (err) {
      if (!err?.response) {
        console.log('Sign Up not successful / No server response.');
      }
    }
  };

  return (
    <Menu stackable inverted size="massive">
      <Menu.Item header>
        <h1 style={{ color: '#2185D0' }}>QuizWhiz</h1>
      </Menu.Item>
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
        </Modal>
      </Menu.Item>
      {promptEvent && !isAppInstalled && (
        <Menu.Item position="right">
          <Button
            color="teal"
            icon="cloud download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
          />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
