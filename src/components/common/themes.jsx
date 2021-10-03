import styled from 'styled-components';

const Title = styled.h1`
  margin-bottom: .5rem;
`;

const List = styled.ul`
  display: flex;
  
  li {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 8rem;
    aspect-ratio: 9/16;
    background-color: #313638;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: .5rem;
    cursor: pointer;
    overflow: hidden;
    transition: all .2s ease;
  }

  li h1 {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 4rem;
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .75));
    transition: all .3s ease;
  }

  li:not(:hover) h1 {
    opacity: 0;
    transform: translateY(.5rem);
  }

  li:not(:last-child) {
    margin-right: 1rem;
  }

  li.active {
    box-shadow: 0 0 0 2px #EB459E;
  }

  @media screen and (max-width: 768px) {
    li {
      flex-shrink: 0;
    }
  }
`;

const ComingSoon = styled.ul`
  position: relative;
  display: flex;
  opacity: .5;
  pointer-events: none;

  h1 {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  li:nth-child(3) {
    opacity: .5;
  }

  li:nth-child(4) {
    opacity: .25;
  }

  @media screen and (max-width: 768px) {
    flex-grow: 1;
    overflow: hidden;
  }
`;

const importAllImages = r => {
  const images = {};
  r.keys().forEach(item => images[item.replace('./', '')] = r(item).default);
  return images;
};
const images = importAllImages(require.context('../../assets/img', false, /\.webp$/));

const Themes = ({ themes, theme, setTheme }) => {
  const renderThemeItem = (item, index) => (
    <li 
      key={index}
      className={theme === item ? 'active' : ''}
      onClick={() => setTheme(item)}
      style={{ backgroundImage: `url('${images[`theme-${item}.webp`]}')` }}
    >
      <h1>{item}</h1>
    </li>
  );
  
  return (
    <>
      <Title>Agora escolha um tema:</Title>
      <List>
        {themes.map((item, index) => renderThemeItem(item, index))}
        <ComingSoon>
          <h1>Mais temas em breve...</h1>
          <li></li>
          <li></li>
          <li></li>
        </ComingSoon>
      </List>
    </>
  );
}

export default Themes;
