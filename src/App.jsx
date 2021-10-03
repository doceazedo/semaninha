import { useState, useEffect } from 'react';
import { Title, GithubCorner } from './components/common';
import { LastfmStep, ThemesStep, GeneratingStep, ResultStep } from './components/steps';
import { api, b64toBlob } from './utils';

const App = () => {
  const [step, setStep] = useState('lastfm');
  const [themes, setThemes] = useState([]);
  const [theme, setTheme] = useState('classic');
  const [imageSrc, setImageSrc] = useState('');
  const [username, setUsername] = useState('');
  const changeUsername = e => setUsername(e.target.value);

  const generate = async () => {
    setStep('generating');

    const resp = await api.get('/generate', { params: { username, theme }, responseType: 'arraybuffer' });
    const image = btoa(new Uint8Array(resp.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    const base64 = `data:${resp.headers['content-type'].toLowerCase()};base64,${image}`;
    const blob = b64toBlob(image, resp.headers['content-type'].toLowerCase());
    setImageSrc(URL.createObjectURL(blob));

    const a = document.createElement('a');
    a.href = base64;
    a.download = `musicwrap-${username}-${new Date().getTime()}.png`;
    a.click();
    a.remove();

    setStep('result');
  }

  const steps = {
    lastfm: <LastfmStep username={username} changeUsername={changeUsername} setStep={setStep} />,
    theme: <ThemesStep themes={themes} theme={theme} setTheme={setTheme} generate={generate} />,
    generating: <GeneratingStep />,
    result: <ResultStep imageSrc={imageSrc} setStep={setStep} />
  };

  useEffect(() => {
    (async () => {
      const resp = await api.get('/themes');
      setThemes(resp.data.themes);
    })();
  }, []);

  return (
    <>
      <GithubCorner />
      <Title/>
      {steps[step]}
    </>
  );
}

export default App;
