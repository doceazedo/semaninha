import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const Title = styled.h1`
  margin-bottom: .5rem;
`;

const List = styled.ul`
  display: flex;
  
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, .75);
    width: 8rem;
    aspect-ratio: 9/16;
    background-color: #313638;
    border-radius: .5rem;
    transition: all .2s ease;
    cursor: pointer;
  }

  li:not(:last-child) {
    margin-right: 1rem;
  }

  li.active {
    box-shadow: 0 0 0 2px #EB459E;
  }
`;

function Themes(props) {
  const [themes, setThemes] = useState([]);

  const renderThemeItem = (item, index) => (
    <li 
      key={index}
      className={props.theme === item ? 'active' : ''}
      onClick={() => props.setTheme(item)}
    >
      {item}
    </li>
  );

  useEffect(() => {
    api
      .get('/themes')
      .then(resp => {
        setThemes(resp.data.themes);
      })
      .catch(err => {
        console.error(`Erro na API: ${err}`);
      });
  }, []);
  
  return (
    <Fragment>
      <Title>Agora escolha um tema:</Title>
      <List>
        {themes.map((item, index) => renderThemeItem(item, index))}
      </List>
    </Fragment>
  );
}

export default Themes;
