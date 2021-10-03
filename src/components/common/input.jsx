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
`;

const Input = ({ label, value, onChangeValue, placeholder }) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <TextInput value={value} onChange={onChangeValue} placeholder={placeholder}/>
    </Wrapper>
  );
}

export default Input;
