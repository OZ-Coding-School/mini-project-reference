import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";

const AccountContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 7.2rem;
`;

const AuthBox = styled.div`
  display: flex;
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 9.6rem;
  font-size: 1.4rem;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  padding-right: 2rem;
  padding-left: 2rem;
  margin-right: auto;
  margin-left: auto;
  max-width: 48rem;

  @media (max-width: 576px) {
    padding-right: 1rem;
    padding-left: 1rem;
    max-width: 100%;
  }
`;

const AuthBoard = styled.div`
  color: #c5c5c5;
  animation: fade-in 0.3s ease-in-out forwards;
`;

const AuthBoardHead = styled.header`
  margin-bottom: 4.8rem;
  text-align: center;

  h2 {
    font-size: 2.4rem;
    color: #333;
  }
`;

const InputTrigger = styled.fieldset`
  border: 0;

  &:nth-child(2) {
    margin-top: 1.3rem;
  }
`;

const LoginBtn = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 4.8rem;
  padding: 0.6rem 1.2rem;
  font-weight: 700;
  font-size: 1.6rem;
  margin-top: 1.6rem;
  border-radius: 0.5rem;
  border-color: #6c6c6c;
  background-color: #6c6c6c;
  color: #fff;
`;

const LoginCaption = styled.p`
  display: inline-block;
  width: 100%;
  margin-top: 1.6rem;
  font-size: 1.4rem;
  text-align: center;
  color: #333;

  a {
    font-size: 1.4rem;
    color: #333;
    text-decoration: underline;
    padding-left: 0.5rem;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 4.4rem;
  padding: 1.1rem 1.6rem 1.3rem 1.1rem;
  border: 0.1rem solid #e0e0e0;
  border-radius: 0.5rem;
  background-color: #fff;
  outline: none;
  font-size: 1.4rem;
  color: #4d4d4d;
`;

const PopupDialog = styled.section`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  animation: fade-in 0.2s ease-in-out forwards;
`;

const PopupBox = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.6rem;
  margin-left: 1.6rem;
`;

const ErrorPopup = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 34.3rem;
  max-width: 34.3rem;
  padding: 1.6rem;
  border-radius: 1rem;
  background-color: #252525;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.5);
  font-size: 1.6rem;
  color: #fff;
  text-align: center;
`;

const ErrorTitle = styled.h4``;

const ErrorText = styled.p`
  margin-top: 3.4rem;
  font-size: 1.4rem;
`;

const ErrorBtn = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 18rem;
  height: 4.8rem;
  padding: 0.6rem 1.2rem;
  border: 0.1rem solid #ed2040;
  border-radius: 0.5rem;
  background-color: #ed2040;
  font-weight: 700;
  font-size: 1.6rem;
  color: #fff;
  text-align: center;
  line-height: 1.3;
  transition: filter 0.2s;
  margin-top: 1.6rem;
  font-size: 1.4rem;

  &:hover {
    background-color: #cf1c38;
  }
`;

const ErrorMessage = styled.p`
  flex-basis: 100%;
  font-size: 1.2rem;
  margin-top: 0.8rem;
  color: #ed2040;
  animation: fade-in 0.3s ease-in-out forwards;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue === "") {
      setEmailError("");
    } else if (!validateEmail(emailValue)) {
      setEmailError("올바른 이메일 양식으로 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue === "") {
      setPasswordError("");
    } else if (passwordValue.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("올바른 이메일 양식으로 입력해주세요.");
      return;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError("회원정보와 일치하지 않습니다.");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setError(null);
  };

  return (
    <AccountContent>
      <AuthBox>
        <AuthBoard>
          <AuthBoardHead>
            <h2>로그인</h2>
          </AuthBoardHead>

          <form onSubmit={handleLogin}>
            <InputTrigger>
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
            </InputTrigger>
            <InputTrigger>
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
            </InputTrigger>
            <LoginBtn type="submit">로그인</LoginBtn>
            <LoginCaption>
              오즈무비가 처음이신가요?
              <a href="/signup">간편 가입</a>
            </LoginCaption>
          </form>
          {error && showPopup && (
            <PopupDialog>
              <PopupBox>
                <ErrorPopup>
                  <ErrorTitle>인증에러</ErrorTitle>
                  <ErrorText>{error}</ErrorText>
                  <ErrorBtn onClick={closePopup}>확인</ErrorBtn>
                </ErrorPopup>
              </PopupBox>
            </PopupDialog>
          )}
        </AuthBoard>
      </AuthBox>
    </AccountContent>
  );
};

export default Login;
