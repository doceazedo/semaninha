import { Fragment, useState } from 'react';
import Title from './components/Title';
import Button from './components/Button';
import Input from './components/Input';
import Themes from './components/Themes';
import api from './utils/api';

function App() {
  const [step, setStep] = useState('userStep');

  const [username, setUsername] = useState('pxlucasf');
  const changeUsername = e => { setUsername(e.target.value); }

  const [theme, setTheme] = useState('classic');
  const [isLoading, setIsLoading] = useState(false);

  let stepComponent;

  const generate = () => {
    console.log(username, theme);
    api
      .get('/generate', { params: { username, theme }, responseType: 'arraybuffer' })
      .then(resp => {
        const image = btoa(new Uint8Array(resp.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        const base64 = `data:${resp.headers['content-type'].toLowerCase()};base64,${image}`;

        const a = document.createElement('a');
        a.href = base64;
        a.download = `musicwrap-${new Date().getTime()}.png`;
        a.click();
        a.remove();

        setIsLoading(false);
        setStep('userStep');
      })
      .catch(err => {
        console.error(`Erro na API: ${err}`);
        console.log(err);
      });
  }

  switch (step) {
    case 'userStep':
    default:
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
          <Button disabled={!theme || isLoading} setStep={generate} setIsLoading={setIsLoading}>{isLoading ? 'Gerando imagem...' : 'Baixar imagem'}</Button>
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
