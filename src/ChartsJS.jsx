import React from 'react';
import { Line } from 'react-chartjs-2';

const frequencies = [
  '500 Hz',
  '1000 Hz',
  '2000 Hz',
  '3000 Hz',
  '4000 Hz',
  '8000 Hz',
];

const initialData = {
  labels: frequencies,
  datasets: [
    {
      label: 'left',
      data: ['0', '0', '0', '0', '0', '0'],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'right',
      data: ['0', '0', '0', '0', '0', '0'],
      fill: false,
      backgroundColor: 'rgb(125, 210, 131)',
      borderColor: 'rgba(99, 255, 117, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
        },
      },
    ],
  },
};

const inputGroup = [
  { label: '左: ', key: 'left' },
  { label: '右: ', key: 'right' },
];

export const ChartsJS = () => {
  const [data, setData] = React.useState(initialData);

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

  const handleChange = (event, index, key) => {
    const { value } = event.target;
    const targetIndex = data.datasets.findIndex((d) => d.label === key);
    const newData = { ...data };
    newData.datasets[targetIndex].data[index] = value;
    setData(newData);
  };

  return (
    <div>
      <h2>ChartsJS</h2>
      <a
        href="https://github.com/nbr41to/test-charts/blob/main/src/ChartsJS.jsx"
        target="_blank"
        rel="noopener noreferrer"
      >
        source:
        https://github.com/nbr41to/test-charts/blob/main/src/ChartsJS.jsx
      </a>
      <h3>Interface</h3>
      <div>
        {inputGroup.map((item) => (
          <div key={item.key}>
            <label>{item.label}</label>
            {frequencies.map((_, index) => {
              return (
                <input
                  key={index}
                  defaultValue="0"
                  type="number"
                  onChange={(e) => handleChange(e, index, item.key)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <h3>Chart</h3>
      <div className="chart" style={{ width: 'min-content', padding: '20px' }}>
        <Line
          id="chart"
          data={data}
          options={options}
          width={600}
          height={360}
        />
      </div>
      <button onClick={handleClick}>COPY📋</button>
      <div>
        <h3>Date type</h3>
        <pre>
          <code>{JSON.stringify(data, null, 4)}</code>
        </pre>
      </div>
    </div>
  );
};
