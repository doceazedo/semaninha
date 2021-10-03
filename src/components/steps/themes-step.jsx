import { Themes, Button } from '../common';

const ThemesStep = ({themes, theme, setTheme, generate}) => (
  <>
    <Themes themes={themes} theme={theme} setTheme={setTheme} />
    <Button setStep={generate}>Baixar imagem</Button>
  </>
);

export default ThemesStep;