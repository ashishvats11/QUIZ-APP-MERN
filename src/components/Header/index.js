import React, { useState } from 'react';
import { Menu, Button, Modal, Form, Message } from 'semantic-ui-react';

const App = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [needsSignup, setNeedsSignup] = useState(false);

  const handleLogin = () => {
    // Perform login logic here
    const isSignedUp = true; // Replace with your logic to check if the user is signed up

    if (isSignedUp) {
      setLoginSuccess(true);
      // Reset form
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setNeedsSignup(true);
    }
  };

  const handleSignup = () => {
    // Perform signup logic here
    setSignupSuccess(true);
    // Reset form
    setSignupUsername('');
    setSignupEmail('');
    setSignupPassword('');
  };

  const renderLoginSuccessMessage = () => {
    if (loginSuccess) {
      return (
        <Message positive>
          <Message.Header>Login Successful</Message.Header>
          <p>You have logged in successfully.</p>
        </Message>
      );
    }
    return null;
  };

  const renderSignupSuccessMessage = () => {
    if (signupSuccess) {
      return (
        <Message positive>
          <Message.Header>Signup Successful</Message.Header>
          <p>You have signed up successfully.</p>
        </Message>
      );
    }
    return null;
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
            {renderLoginSuccessMessage()}
            {needsSignup && (
              <Message>
                <Message.Header>Sign Up Required</Message.Header>
                <p>Please sign up to proceed.</p>
              </Message>
            )}
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
            {!needsSignup && (
              <Button
                color="teal"
                content="Login"
                onClick={handleLogin}
                disabled={!loginEmail || !loginPassword}
              />
            )}
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
            {renderSignupSuccessMessage()}
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
    </Menu>
  );
};

export default App;
