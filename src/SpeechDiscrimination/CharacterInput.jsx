import styled from 'styled-components';

export const CharacterInput = ({
  className,
  character,
  inputValue,
  onChange,
}) => {
  return (
    <StyledCharacterInput className={`${className}`} onClick={() => {}}>
      <div>{character}</div>
      <input type="text" value={inputValue} onChange={(e) => onChange(e)} />
    </StyledCharacterInput>
  );
};

const StyledCharacterInput = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 4px;
  > input {
    width: 32px;
    height: 20px;
    font-size: 18px;
    text-align: center;
  }
`;
