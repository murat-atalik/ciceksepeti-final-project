import PropTypes from 'prop-types';

import CustomButton from './CustomButton';

const Button = ({ children, ...rest }) => (
  <CustomButton {...rest}> {children} </CustomButton>
);
Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default Button;
