import styled from 'styled-components';

const Logo = styled.h1`
  font-size: 4rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: .25rem;

  span {
    color: rgba(255, 255, 255, .75);
  }

  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Slogan = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  color: rgba(255, 255, 255, .75);
  margin-bottom: 4rem;

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Title = () => {
  return (
    <>
      <Logo>musicwrap<span>.xyz</span></Logo>
      <Slogan>Compartilhe o que você mais ouviu nessa semana!</Slogan>
    </>
  );
}

export default Title;
