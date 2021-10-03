import { Result } from '../common';

const ResultStep = ({imageSrc, setStep}) => (
  <Result src={imageSrc} setStep={() => setStep('lastfm')}/>
);

export default ResultStep;