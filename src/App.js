import { useState } from 'react';
import Lottie from 'react-lottie';
import Title from './components/Title';
import Button from './components/Button';
import Input from './components/Input';
import Themes from './components/Themes';
import LoadingMessages from './components/LoadingMessages';
import Result from './components/Result';
import api from './utils/api';
import guitar from './assets/lottie/guitar.json';

function App() {
  const [step, setStep] = useState('userStep');
  const [theme, setTheme] = useState('classic');
  const [imageSrc, setImageSrc] = useState('');
  const [username, setUsername] = useState('pxlucasf');
  const changeUsername = e => { setUsername(e.target.value); }


  let stepComponent;

  const generate = () => {
    setStep('loadingStep');
    api
      .get('/generate', { params: { username, theme }, responseType: 'arraybuffer' })
      .then(resp => {
        const image = btoa(new Uint8Array(resp.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        const base64 = `data:${resp.headers['content-type'].toLowerCase()};base64,${image}`;
        setImageSrc(base64);

        const a = document.createElement('a');
        a.href = base64;
        a.download = `musicwrap-${new Date().getTime()}.png`;
        a.click();
        a.remove();

        setStep('resultStep');
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
        <>
          <Input
            label="Primeiro, qual o seu usuário do last.fm?"
            value={username}
            onChangeValue={changeUsername}/>
          <Button disabled={username.length === 0} setStep={() => setStep('themeStep')}>Continuar</Button>
        </>
      );
      break;

    case 'themeStep':
      stepComponent = (
        <>
          <Themes theme={theme} setTheme={setTheme} />
          <Button setStep={generate}>Baixar imagem</Button>
        </>
      );
      break;

    case 'loadingStep':
      stepComponent = (
        <>
          <Lottie options={{ animationData: guitar,  }}
            height={300}
            width={300}
            isClickToPauseDisabled={true}/>
          <LoadingMessages/>
        </>
      );
      break;

    case 'resultStep':
      stepComponent = (
        <Result src={imageSrc} setStep={() => setStep('userStep')}/>
      );
      break;
  }

  return (
    <>
      <Title/>

      {stepComponent}

    </>
  );
}

export default App;
