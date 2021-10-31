import { Input, Button } from '../common';

const LastfmStep = ({username, changeUsername, setStep}) => (
  <>
    <Input
      label="Primeiro, qual o seu usuário do last.fm?"
      value={username}
      onChangeValue={changeUsername}
      placeholder="doceazedo911"/>
    <Button disabled={username.length === 0} setStep={() => setStep('theme')}>Continuar</Button>
  </>
);

export default LastfmStep;