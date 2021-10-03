import { useEffect } from 'react';
import styled from 'styled-components';
import confetti from 'canvas-confetti';

const Result = ({ src, setStep }) => {

  const Image = styled.ul`
    display: flex;
    margin: 0 auto;
    margin-bottom: 4rem;

    li {
      height: 260px;
      width: 150px;
      border-radius: .5rem;
      background-image: url('${src}');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    li:first-child,
    li:last-child {
      filter: brightness(.5);
      opacity: .75;
      z-index: -1;
    }

    li:first-child {
      transform: rotate(-5deg) translate(50px, 10px) scale(.95);
    }

    li:last-child {
      transform: rotate(5deg) translate(-50px, 10px) scale(.95);
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      justify-content: center;

      li {
        flex-shrink: 0;
      }
    }
  `;

  const Buttons = styled.div`
    display: flex;
    justify-content: center;

    button {
      width: fit-content;
      margin: 0;
      padding: .75rem 1.5rem;
      background-color: #EB459E;
      border-radius: .5rem;
      border: none;
      transition: all .2s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    button:not(:last-child) {
      margin-right: .5rem;
    }

    button:nth-child(1) {
      background-image: linear-gradient(45deg, rgba(88,81,219,1) 0%, rgba(225,48,108,1) 50%, rgba(247,119,55,1) 100%);
    }

    button:nth-child(2) {
      background-color: #1da1f2;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;

      button {
        width: 75%;
      }

      button:not(:last-child) {
        margin-right: 0;
        margin-bottom: .5rem;
      }
    }
  `;

  useEffect(() => {
    var duration = 5000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }, []);

  return (
    <>
      <Image>
        <li></li>
        <li></li>
        <li></li>
      </Image>
      <Buttons>
        { /* FIXME: plain bad */ }
        <button onClick={() => { window.open('https://instagram.com') }}>Postar no Story</button>
        <button onClick={() => { window.open('https://twitter.com') }}>Postar no Twitter</button>
        <button onClick={setStep}>Voltar ao início</button>
      </Buttons>
    </>
  );
}

export default Result;
