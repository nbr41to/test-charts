import styled from 'styled-components';

export const CharacterInput = ({
  className,
  character,
  inputValue,
  onClickToggle,
  onChange,
}) => {
  return (
    <StyledCharacterInput className={`${className}`}>
      <div className="label" onClick={onClickToggle}>
        {character}
      </div>
      <input type="text" value={inputValue} onChange={(e) => onChange(e)} />
    </StyledCharacterInput>
  );
};

const StyledCharacterInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 4px;

  > .label {
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  > input {
    width: 32px;
    height: 20px;
    font-size: 18px;
    text-align: center;
  }
`;
