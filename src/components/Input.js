import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: .5rem;
`;

const TextInput = styled.input`
  border: none;
  background-color: #313638;
  padding: .75rem 1.5rem;
  outline: none;
  border-radius: .5rem;
  margin-bottom: 1rem;
`;

function Input(props) {
  return (
    <Wrapper>
      <Label>{props.label}</Label>
      <TextInput value={props.value} onChange={props.onChangeValue}/>
    </Wrapper>
  );
}

export default Input;
