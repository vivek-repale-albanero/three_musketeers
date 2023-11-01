import styled from 'styled-components';

const GradientButton = styled.button`
  background: linear-gradient(45deg, #009688, #1976d2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #1976d2, #009688);
  }
`;


// Example usage:
const CustomButton = ({children, onClick}) => {
  return (
    <div>
      <GradientButton onClick={onClick}>
        {children}
      </GradientButton>
    </div>
  );
};

export default CustomButton;
