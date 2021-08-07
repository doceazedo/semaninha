import { Fragment, useState } from 'react';
import Title from './components/Title';
import Button from './components/Button';
import Input from './components/Input';
import Themes from './components/Themes';

function App() {
  const [step, setStep] = useState('userStep');

  const [username, setUsername] = useState('pxlucasf');
  const changeUsername = e => { setUsername(e.target.value); }

  const [theme, setTheme] = useState('classic');

  let stepComponent;

  switch (step) {
    case 'userStep':
      stepComponent = (
        <Fragment>
          <Input
            label="Primeiro, qual o seu usuário do last.fm?"
            value={username}
            onChangeValue={changeUsername}
            />
          <Button disabled={username.length === 0} setStep={() => setStep('themeStep')}>Continuar</Button>
        </Fragment>
      );
      break;

    case 'themeStep':
      stepComponent = (
        <Fragment>
          <Themes theme={theme} setTheme={setTheme} />
          <Button disabled={!theme} setStep={() => setStep('userStep')}>Baixar imagem</Button>
        </Fragment>
      );
      break;
  }

  return (
    <Fragment>
      <Title/>

      {stepComponent}

    </Fragment>
  );
}

export default App;
