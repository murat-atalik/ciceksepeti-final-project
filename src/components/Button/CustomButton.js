import styled from 'styled-components';

const theme = {
  disabled: {
    btn: '#FFF0E2',
    font: '#FAAD60',
  },
  primary: {
    btn: '#4B9CE2',
    font: '#FFFFFF',
  },
  secondary: {
    btn: '#F0F8FF',
    font: '#4B9CE2',
  },
  warning: {
    btn: '#F77474',
    font: '#FFFFFF',
  },
};
const CustomButton = styled.button`
  background-color: ${(props) => theme[props.theme].btn};
  color: ${(props) => theme[props.theme].font};
  border: none;
  outline: none;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;
CustomButton.defaultProps = {
  theme: 'primary',
};

export default CustomButton;
