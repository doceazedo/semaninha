import Lottie from 'react-lottie';
import { LoadingMessages } from '../common';
import guitar from '../../assets/lottie/guitar.json';

const GeneratingStep = () => (
  <>
    <Lottie options={{ animationData: guitar }}
      height={300}
      width={300}
      isClickToPauseDisabled={true}/>
    <LoadingMessages/>
  </>
);

export default GeneratingStep;