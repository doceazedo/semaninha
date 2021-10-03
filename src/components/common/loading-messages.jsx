import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Text = styled.p`
  text-align: center;
  margin-top: -3rem;
`;

const messagesArr = [
  'Gerando uma imagem bem bonita só pra você...',
  'Dando uma olhada no seu histórico (só de músicas, viu?) 🤭',
  'Não feche a página não, tá quase lá...',
  'Aguarde só mais alguns segundinhos...',
  'Aproveita e me segue no last.fm! @pxlucasf',
  'É... você vem sempre aqui? 😳👉👈',
  'Desenhando cada pixel individualmente...',
  'Era pra eu gerar uma imagem??? Vishe, peraí...',
  'Descobrindo suas músicas preferidas...',
  'Colocando lenha na fogueira...',
  'Girando a manivela...'
];

const getRandomMessage = () => messagesArr[Math.floor(Math.random() * messagesArr.length)];

const LoadingMessages = () => {
  const [ message, setMessage ] = useState(getRandomMessage());

  useEffect(() => {
    const messageInterval = setInterval(() => setMessage(getRandomMessage()), 3000); // onMount
    return () => clearInterval(messageInterval); // onDestroy
  }, []);

  return (
    <Text>{message}</Text>
  );
}

export default LoadingMessages;
