import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const Title = styled.h1`
  margin-bottom: .5rem;
`;

const List = styled.ul`
  display: flex;
  margin-bottom: 1rem;
  
  li {
    width: 8rem;
    aspect-ratio: 9/16;
    background-color: #313638;
    border-radius: .5rem;
  }

  li:not(:last-child) {
    margin-right: 1rem;
  }
`;

function Themes(props) {
  const [themes, setThemes] = useState();

  useEffect(() => {
    api
      .get('/themes')
      .then(resp => {
        setThemes(resp.data.themes.map(theme => <li key={theme}>{theme}</li>));
      })
      .catch(err => {
        console.error(`Erro na API: ${err}`);
      });
  }, []);
  
  return (
    <Fragment>
      <Title>Agora escolha um tema:</Title>
      <List>
        {themes}
      </List>
    </Fragment>
  );
}

export default Themes;
