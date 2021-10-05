import styled from 'styled-components';
import { CharacterInput } from './CharacterInput';

const initialState = [];
for (let i = 0; i < 20; i++) {
  initialState.push(true);
}

export const FormItem = ({ className, side, data, changeHandlers }) => {
  /* 割合の計算と文字列の出力 */
  const calculations = {
    fraction: (characters) => {
      const values = Object.values(characters);
      return `${values.filter((value) => !value).length} / ${values.length}`;
    },
    percentage: (characters) => {
      const values = Object.values(characters);
      return `${
        (values.filter((value) => !value).length / values.length) * 100
      } %`;
    },
  };

  return (
    <StyledFormItem className={`${className}`}>
      <div>{side === 'left' ? '左:' : '右:'}</div>
      {data.map((group, groupIndex) => {
        // console.log(group);
        // console.log(group.labels[groupIndex])
        return (
          <div key={groupIndex} className="characters_input">
            <div className="decibel_input">
              <input
                type="number"
                value={group.decibel}
                onChange={(e) => changeHandlers.labels(e, side, groupIndex)}
              />
              <span>dB</span>
            </div>
            {Object.keys(group.characters).map((character, charIndex) => (
              <CharacterInput
                key={charIndex}
                character={character}
                inputValue={group.characters[`${character}`]}
                onClickToggle={() =>
                  changeHandlers.charactersToggle(side, groupIndex, character)
                }
                onChange={(e) =>
                  changeHandlers.characters(e, side, groupIndex, character)
                }
              />
            ))}
            <div>
              <div>{calculations.fraction(group.characters)}</div>
              <div>{calculations.percentage(group.characters)}</div>
            </div>
          </div>
        );
      })}
    </StyledFormItem>
  );
};

const StyledFormItem = styled.div`
  > .characters_input {
    display: flex;
    align-items: center;
    > .decibel_input {
      > input {
        width: 32px;
        height: 20px;
        font-size: 18px;
        text-align: right;
      }
      > input[type='number']::-webkit-inner-spin-button {
        appearance: none;
      }
    }
  }
`;
