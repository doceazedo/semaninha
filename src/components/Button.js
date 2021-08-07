import styled from 'styled-components';

const Wrapper = styled.button`
  border: none;
  margin: 0;
  background-color: #EB459E;
  padding: .75rem 1.5rem;
  border-radius: .5rem;
  transition: all .2s ease;

  &:disabled {
    opacity: .75;
    cursor: not-allowed;
  }
`;

function Button(props) {
  return (
    <Wrapper disabled={props.disabled} onClick={props.setStep}>{props.children}</Wrapper>
  );
}

export default Button;
