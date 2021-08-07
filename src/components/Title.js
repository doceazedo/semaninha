import { Fragment } from 'react';
import styled from 'styled-components';

const Logo = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: .25rem;

  span {
    color: rgba(255, 255, 255, .75);
  }
`;

const Slogan = styled.h2`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, .75);
  margin-bottom: 4rem;
`;

function Title() {
  return (
    <Fragment>
      <Logo>musicwrap<span>.xyz</span></Logo>
      <Slogan>Compartilhe o que você tem ouvida na semana!</Slogan>
    </Fragment>
  );
}

export default Title;
