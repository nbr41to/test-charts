import React, { useState } from 'react';
import styled from 'styled-components';
import { Chart } from './Chart';
import { characterGroups } from '../data2';
import { FormGroup } from './FormGroup';

export const SpeechDiscrimination = () => {
  /* 全てのデータ */
  const [leftData, setLeftData] = useState(characterGroups); // 左のデータ
  const [rightData, setRightData] = useState(characterGroups); // 右のデータ

  const extractLabels = () => {
    /* 右と左のdecibelのlabelを合わせて重複を取り除く */
    const lefts = leftData.map((item) => item.decibel + 'dB');
    const rights = rightData.map((item) => item.decibel + 'dB');
    const labels = [...new Set([...lefts, ...rights])];
    return labels;
  };
  const extractDatasetsData = (data) =>
    /* paramsに関するデータからchartsに使用するdatasetのdataを抽出する */
    data.map((item) => {
      const boolData = Object.values(item.characters).map((charValue) => {
        return !!!charValue;
      });
      return boolData.filter((value) => value === true) / boolData.length;
    });

  /* onChanges */
  const changeHandlers = {
    labels: (event, side, characterGroupIndex) => {
      /* labelを変更する */
      const newData = side === 'left' ? [...leftData] : [...rightData];
      newData[characterGroupIndex].decibel = event.target.value;
      if (side === 'left') {
        setLeftData(newData);
      } else {
        setRightData(newData);
      }
    },
    characters: (event, side, characterGroupIndex, character) => {
      /* charactersへのテキスト入力*/
      const newData = side === 'left' ? [...leftData] : [...rightData];
      newData[characterGroupIndex].characters[`${character}`] =
        event.target.value;

      if (side === 'left') {
        setLeftData(newData);
      } else {
        setRightData(newData);
      }
    },
    charactersToggle: (side, characterGroupIndex, character) => {
      /* charactersの正誤を切り替える */
      const newData = side === 'left' ? [...leftData] : [...rightData];
      if (!newData[characterGroupIndex].characters[`${character}`]) {
        newData[characterGroupIndex].characters[`${character}`] = '✕';
      }
      if (newData[characterGroupIndex].characters[`${character}`] === '✕') {
        newData[characterGroupIndex].characters[`${character}`] = '';
      }

      if (side === 'left') {
        setLeftData(newData);
      } else {
        setRightData(newData);
      }
    },
  };

  return (
    <StyledSpeechDiscrimination>
      <h2>語音弁別能</h2>
      <FormGroup
        leftData={leftData}
        rightData={rightData}
        changeHandlers={changeHandlers}
      />
      <Chart
        data={{
          labels: extractLabels(),
          datasets: [
            {
              label: 'left',
              data: extractDatasetsData(leftData),
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgb(255, 99, 132)',
            },
            {
              label: 'right',
              data: extractDatasetsData(rightData),
              fill: false,
              borderColor: 'rgb(125, 210, 131)',
              backgroundColor: 'rgb(125, 210, 131)',
            },
          ],
        }}
      />
    </StyledSpeechDiscrimination>
  );
};

const StyledSpeechDiscrimination = styled.div``;
