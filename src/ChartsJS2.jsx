import React from 'react';
import { Line } from 'react-chartjs-2';
import { characterGroups } from './data';

const initialData = {
  labels: Object.values(characterGroups).map((group) => group.decibel),
  datasets: [
    {
      label: 'left',
      data: ['100', '100', '100'],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'right',
      data: ['100', '100', '100'],
      fill: false,
      borderColor: 'rgb(125, 210, 131)',
      backgroundColor: 'rgb(125, 210, 131)',
    },
  ],
};

const options = {
  scales: {
    y: {
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {},
    },
  },
};

const inputGroup = [
  { label: '左: ', key: 'left' },
  { label: '右: ', key: 'right' },
];

export const ChartsJS2 = () => {
  const [chartData, setChartData] = React.useState(initialData);

  const useDate = () => {
    const initialState = [];
    for (let i = 0; i < 20; i++) {
      initialState.push(true);
    }
    const [state, setState] = React.useState(initialState);
    return [state, setState];
  };
  /* left */
  const [group1Data, setGroup1Data] = useDate();
  const [group2Data, setGroup2Data] = useDate();
  const [group3Data, setGroup3Data] = useDate();
  /* right */
  const [group4Data, setGroup4Data] = useDate();
  const [group5Data, setGroup5Data] = useDate();
  const [group6Data, setGroup6Data] = useDate();

  /* グラフをクリップボードへコピー */
  const handleClick = async () => {
    const canvas = document.getElementById('chart');
    if (!canvas || !navigator) return;
    canvas.toBlob((blob) => {
      // eslint-disable-next-line no-undef
      const image = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([image]);
    });
  };

  /* 項目のチェックリストの変更 */
  const handleChange = (
    data,
    setDate,
    charIndex,
    charGroupIndex,
    inputGroupIndex
  ) => {
    const newData = data.map((value, i) => {
      if (i === charIndex) return !value;
      return value;
    });
    setDate(newData);
    const percent =
      (newData.filter((value) => value).length / newData.length) * 100;
    const newChartData = { ...chartData };
    newChartData.datasets[inputGroupIndex].data[charGroupIndex] = percent;
    setChartData(newChartData);
  };

  const handleDecibelChange = (e, index) => {
    const { value } = e.target;
    const newChartData = { ...chartData };
    newChartData.labels[index] = value;
    setChartData(newChartData);
  };

  return (
    <div>
      <h2>語音弁別能</h2>
      <a
        href="https://github.com/nbr41to/test-charts/blob/main/src/ChartsJS2.jsx"
        target="_blank"
        rel="noopener noreferrer"
      >
        source:
        https://github.com/nbr41to/test-charts/blob/main/src/ChartsJS2.jsx
      </a>
      <h3>Interface</h3>
      <div>
        {inputGroup.map((group, inputGroupIndex) => (
          <>
            <div>{group.label}</div>
            {Object.values(characterGroups).map((group, charGroupIndex) => {
              const state = () => {
                if (group.name === 'group1') {
                  if (inputGroupIndex === 0) return [group1Data, setGroup1Data];
                  if (inputGroupIndex === 1) return [group4Data, setGroup4Data];
                }
                if (group.name === 'group2') {
                  if (inputGroupIndex === 0) return [group2Data, setGroup2Data];
                  if (inputGroupIndex === 1) return [group5Data, setGroup5Data];
                }
                if (group.name === 'group3') {
                  if (inputGroupIndex === 0) return [group3Data, setGroup3Data];
                  if (inputGroupIndex === 1) return [group6Data, setGroup6Data];
                }
              };
              const [data, setData] = state();
              const percent =
                (data.filter((value) => value).length / data.length) * 100;
              const frac = `${data.filter((b) => b).length}/${data.length}`;

              return (
                <div>
                  <input
                    type="number"
                    value={chartData.labels[charGroupIndex]}
                    onChange={(e) => handleDecibelChange(e, charGroupIndex)}
                  />
                  <span>dB</span>
                  {group.characters.map((character, charIndex) => (
                    <button
                      key={character}
                      onClick={() =>
                        handleChange(
                          data,
                          setData,
                          charIndex,
                          charGroupIndex,
                          inputGroupIndex
                        )
                      }
                    >
                      <div>{character}</div>
                      <input type="checkbox" checked={data[charIndex]} />
                    </button>
                  ))}
                  <span>
                    {percent}%（{frac}）
                  </span>
                  <br />
                </div>
              );
            })}
          </>
        ))}
      </div>
      <h3>Chart</h3>
      <div className="chart" style={{ width: 'min-content', padding: '20px' }}>
        <Line
          id="chart"
          data={chartData}
          options={options}
          width={600}
          height={360}
        />
      </div>
      <button onClick={handleClick}>COPY📋</button>
      <div>
        <h3>Date type</h3>
        <pre>
          <code>{JSON.stringify(chartData, null, 4)}</code>
        </pre>
      </div>
    </div>
  );
};
