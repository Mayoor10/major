import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

// Import images
import emailIcon from "../../public/images/email.png";
import passwordIcon from "../../public/images/password.png";

// Styled components
const Container = styled.div`
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & img {
    width: 120px;
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 14px 24px;
  text-decoration: none;
  border-radius: 24px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }

  @media (max-width: 300px) {
    font-size: 12px;
    padding: 7px 12px;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 14px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;

  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }

  @media (max-width: 300px) {
    font-size: 12px;
    padding: 7px 12px;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 24px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;

  @media (max-width: 1000px) {
    justify-content: center;
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    padding-bottom: 0;
    width: 50%;
    font-size: 53px;
    color: #2977c9;
    font-weight: 100;
    margin-bottom: 24px;

    @media (max-width: 1000px) {
      font-size: 32px;
      width: 100%;
    }
  }

  img {
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: 25px;
    right: -125px;

    @media (max-width: 1000px) {
      top: 230px;
      width: 300px;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  height:400px;
  // background-color:red;
  // margin-top: 10px;
  width: 500px;
  display:flex;
  flex-direction:column;
  justify-content:center;

  @media (max-width: 1000px) {
    margin-top: 20px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
  gap:10px;
  align-items: center;

`;


const Icons = styled.div`
  width:5%
  margin:15px
  background-color:red;
`;


const SubmitButton = styled.div`
text-align: center;
  margin-top: 16px;
  width:75%;
  background-color: #0a66c2;
  color: #fff;
  padding: 12px 24px;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
  align-self: center;

  &:hover {
    background-color: #004080;
  }
`;



const AccountText = styled.div`
  margin-top: 16px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);

  a {
    color: #0a66c2;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Input = styled.input`
width: 90%; 
border: none;
outline: none;
padding: 12px;
border: 1px solid #ccc;
border-radius: 10px;
font-size: 16px;
`;

const GoogleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 45px;
  width: 85%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.75);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
  align-self: center;
  margin:10px;

  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
  }

  img {
    margin: 0 5px;
  }
`;

// React component
const Login = (props) => {
  return (
    <Container>
      {props.user && <Navigate to="/home" />}
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="" />
        </a>
        <div>
          <Join>Join now</Join>
          <SignIn>Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src="/images/login-hero.svg" alt="" />
        </Hero>
        <Form>
          <InputContainer>
            <Icons>
              <img src={emailIcon} alt="" />
            </Icons>
            <Input type="email" placeholder='Email' />

          </InputContainer>
          <InputContainer>
            <Icons>
              <img src={passwordIcon} alt="" />
            </Icons>
            <Input type="password" placeholder='Password' />
          </InputContainer>

          <SubmitButton>Sign In</SubmitButton>


          <AccountText>Not a member? <a href="/SignUp">Sign Up</a></AccountText>
          <GoogleButton onClick={() => props.signIn()}>
            <img src="/images/google.svg" alt="" />
            Continue with Google
          </GoogleButton>
        </Form>
      </Section>
    </Container>
  );
};

Login.propTypes = {
  user: PropTypes.shape({
    // Define the structure of the 'user' prop, e.g., photoURL, displayName, etc.
  }),
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);