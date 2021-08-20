import styled from 'styled-components';

const Box = styled.button`
  width: fit-content;
  margin: 0;
  margin-top: 4rem;
  margin-left: auto;
  padding: .75rem 1.5rem;
  background-color: #EB459E;
  border-radius: .5rem;
  border: none;
  transition: all .2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: .75;
    cursor: not-allowed;
  }

  &:hover {
    transform: translateY(-.25rem);
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, .25);
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const createRipple = event => {
  const button = event.currentTarget;

  const btnRect = button.getBoundingClientRect();
  const circle = document.createElement('span');
  const diameter = Math.max(btnRect.width, btnRect.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (btnRect.left + radius)}px`;
  circle.style.top = `${event.clientY - (btnRect.top + radius)}px`;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) ripple.remove();

  button.appendChild(circle);
}

const handleClick = (event, props) => {
  props.setStep();
  createRipple(event);

  if (props.setIsLoading) props.setIsLoading(true);
}

function Button(props) {
  return (
    <Box disabled={props.disabled} onClick={(event) => handleClick(event, props)}>{props.children}</Box>
  );
}

export default Button;
