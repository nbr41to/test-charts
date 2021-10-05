import React, { useState } from 'react';
import styled from 'styled-components';
import { Chart } from './Chart';
import { characterGroups, sampleSpeechDiscriminationData1 } from '../data';
import { FormGroup } from './FormGroup';

export const SpeechDiscrimination = () => {
  /* 全てのデータ */
  const [leftData, setLeftData] = useState(
    JSON.parse(JSON.stringify(characterGroups))
  ); // 左のデータ
  const [rightData, setRightData] = useState(
    JSON.parse(JSON.stringify(characterGroups))
  ); // 右のデータ
  const [addedData, setAddedData] = useState([sampleSpeechDiscriminationData1]); // その他追加されたデータ

  /* Charts.jsに使用するlabelsを抽出する */
  const extractLabels = () => {
    /* 右と左のdecibelのlabelを合わせて重複を取り除く */
    const lefts = leftData.map((item) => item.decibel + 'dB');
    const rights = rightData.map((item) => item.decibel + 'dB');

    /* 追加されたデータに関するlabels */
    const addeds = addedData
      .reduce((prev, current) => {
        prev.push(...current);
        return prev;
      }, [])
      .map((item) => item.decibel + 'dB');

    const labels = [...new Set([...lefts, ...rights, ...addeds])];
    return labels.sort();
  };

  /* Charts.jsに使用するdatasetsを抽出する（右左のみ） */
  const extractDatasetsData = (data) =>
    /* paramsに関するデータからchartsに使用するdatasetのdataを抽出する */
    data.map((item) => {
      const boolData = Object.values(item.characters).map(
        (charValue) => !charValue
      );
      return {
        x: item.decibel + 'dB',
        y:
          (boolData.filter((value) => value === true).length /
            boolData.length) *
          100,
      };
    });

  /* 追加データのdatasetを構築 */
  const others = () => {
    /* Charts.jsの型にあったdatasetsが配列で返ってくる */
    const othersDatasets = addedData.map((dataItem, index) => {
      const data = dataItem.map((item) => {
        const boolData = Object.values(item.characters).map(
          (charValue) => !charValue
        );
        return {
          x: item.decibel + 'dB',
          y:
            (boolData.filter((value) => value === true).length /
              boolData.length) *
            100,
        };
      });
      /* ランダムな色を生成 */
      const color =
        '#' + ('000000' + Math.floor(Math.random() * 1000000)).slice(-6);

      return {
        label: `other${index + 1}`,
        data,
        fill: false,
        borderColor: color,
        backgroundColor: color,
      };
    });
    console.log(othersDatasets);
    return othersDatasets;
  };

  /* 左右に関するデータの変更用のonChangeたち */
  const changeHandlers = {
    /* 各Groupのdecibelを変更 */
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

    /* charactersへのテキスト入力*/
    characters: (event, side, characterGroupIndex, character) => {
      const newData = side === 'left' ? [...leftData] : [...rightData];

      newData[characterGroupIndex].characters[`${character}`] =
        event.target.value;

      if (side === 'left') {
        setLeftData(newData);
      } else {
        setRightData(newData);
      }
    },

    /* charactersの正誤を切り替える */
    charactersToggle: (side, characterGroupIndex, character) => {
      const newData = side === 'left' ? [...leftData] : [...rightData];

      const currentValue =
        newData[characterGroupIndex].characters[`${character}`];
      if (!currentValue) {
        newData[characterGroupIndex].characters[`${character}`] = '✕';
      }
      if (currentValue === '✕') {
        newData[characterGroupIndex].characters[`${character}`] = '';
      }
      console.log(side);
      if (side === 'left') {
        console.log('aaaal');
        setLeftData(newData);
      } else {
        console.log('aaaar');
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
            ...others(),
          ],
        }}
      />
    </StyledSpeechDiscrimination>
  );
};

const StyledSpeechDiscrimination = styled.div``;
