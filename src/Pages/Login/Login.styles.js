import styled, { css, createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
h1{
  color: #5E6C84;
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 28px;
  margin-top: 10px;
  margin-bottom: 25px;
  }
  a{text-decoration:none;color:#0052cc}
  i{
    vertical-align: -webkit-baseline-middle;
    cursor: pointer;
  }
  input::-ms-reveal,
  input::-ms-clear {
        display: none;
      }
  .login-method-separator{
    margin:15px 0px;
    }
  .password-container{
    display: flex;
    justify-content: space-around;
    border: 2px solid #dfe1e6;
    height: 44px;
    border-radius: 3px;
    background-color: #fafbfc;
    transition: background-color 0.2s ease-in-out 0s,
    border-color 0.2s ease-in-out 0s;
  }
  .password-container:focus-within{
    border: 2px solid black;
  }
  `;
const inputStyles = css`
  width: 100%;
  font-size: 14px;
  background-color: #fafbfc;
  border: 2px solid #dfe1e6;
  border-radius: 3px;
  height: 44px;
  transition: background-color 0.2s ease-in-out 0s,
    border-color 0.2s ease-in-out 0s;
  padding: 0.5em;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  margin: 0 auto;
  max-width: 400px;
  text-align: center;
  padding: 40px 0px;
  font-size: xxx-large;
  font-weight: 900;
`;
export const Background = styled.div`
  background-color: #f9fafc;
  min-width: 100vh;
  min-height: 100vh;
`;
export const AccountForm = styled.div`
  /* display: flex; */
`;
export const ErrorText = styled.div`
  font-size: 14px;
  color: red;
  margin: ${(props) => (props.show ? "10px 0" : "0 0")};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  display: ${(props) => (props.show ? "block" : "none")};
`;
export const CenterLayout = styled.div`
  margin: 0 auto;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 3px;
  padding: 25px 40px;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
`;
export const FormFieldEmail = styled.input`
  ${inputStyles}
`;
export const FormFieldPassword = styled.input`
  ${inputStyles}
  border: none;
  height: 40px;
  width: 90%;
  margin: 0;
  padding: 0;
  :focus {
    outline: none;
  }
`;
export const FormFieldButton = styled.input`
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 0.3em;
  border: 2px solid #dfe1e6;
  background-color: #5aac44;
  color: white;
  cursor: pointer;
  font-weight: bold;
`;

export const FormBottomLinks = styled.div`
  margin: 25px 0;
  text-align: center;
  padding: 5px 0 0 0;
`;
