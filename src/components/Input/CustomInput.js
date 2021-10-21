import styled from 'styled-components';

const theme = {
  primary: {
    background: '#F4F4F4',
    activeBorder: '#4b9ce2',
    activeBackground: '#F0F8FF',
    color: '#99A0A7',
    activeColor: '#3E3E3E',
    placeholderTextColor: '#99A0A7',
  },
  warning: {
    background: '#FFF2F2 ',
    activeBorder: '#F77474',
    activeBackground: '#FFF2F2',
    color: '#F77474',
    activeColor: '#F77474',
    placeholderTextColor: '#F77474',
  },
};
const CustomInput = styled.input`
  background-color: ${(props) => theme[props.theme].background};
  color: ${(props) => theme[props.theme].color};
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => theme[props.theme].placeholderTextColor};
  }

  &:hover {
    border: 1px solid ${(props) => theme[props.theme].activeBorder};
    background-color: ${(props) => theme[props.theme].activeBackground};
    color: ${(props) => theme[props.theme].activeColor};
  }
  &:focus {
    border: 1px solid ${(props) => theme[props.theme].activeBorder};
    background-color: ${(props) => theme[props.theme].activeBackground};
    color: ${(props) => theme[props.theme].activeColor};
  }
`;
CustomInput.defaultProps = {
  theme: 'primary',
};

export default CustomInput;
