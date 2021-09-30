import React from 'react';
import { useForm } from 'react-hook-form';
import { Line } from 'react-chartjs-2';

const frequencies = [
  '500 Hz',
  '1000 Hz',
  '2000 Hz',
  '3000 Hz',
  '4000 Hz',
  '8000 Hz',
];

const data = {
  labels: frequencies,
  datasets: [
    {
      label: 'left',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'right',
      data: [5, 2, 3, 12, 19, 3],
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
          beginAtZero: true,
        },
      },
    ],
  },
};

const initialData = [
  { frequency: '500 Hz', decibelLeft: '0', decibelRight: '0' },
  { frequency: '1000 Hz', decibelLeft: '0', decibelRight: '0' },
  { frequency: '2000 Hz', decibelLeft: '0', decibelRight: '0' },
  { frequency: '3000 Hz', decibelLeft: '0', decibelRight: '0' },
  { frequency: '4000 Hz', decibelLeft: '0', decibelRight: '0' },
  { frequency: '8000 Hz', decibelLeft: '0', decibelRight: '0' },
];

const inputGroup = [
  { label: '左: ', key: 'left' },
  { label: '右: ', key: 'right' },
];

export const ChartsJS = () => {
  const [data, setData] = React.useState(initialData);
  const { register, handleSubmit, setValue } = useForm();

  /* グラフをクリップボードへコピー */
  const handleClick = async () => {
    const canvas = document.getElementById('chart');
    // const image = canvas.toDataURL('image/png');
    if (!canvas || !navigator) return;
    canvas.toBlob((blob) => {
      // eslint-disable-next-line no-undef
      const image = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([image]);
    });
  };

  const handleChange = (event, index, key) => {
    const { value } = event.target;
    const newData = data.map((d, i) => {
      if (index === i) return { ...d, [key]: value };
      return d;
    });
    setData(newData);
  };

  return (
    <div>
      <h2>ChartsJS</h2>
      <h3>Interface</h3>
      <div>
        {inputGroup.map((item) => (
          <div>
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
        <Line id="chart" data={data} options={options} />
      </div>
      <button onClick={handleClick}>COPY📋</button>
      <style jsx>{`
        input {
          width: 32px;
        }
      `}</style>
    </div>
  );
};
