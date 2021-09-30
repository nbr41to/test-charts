import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import html2canvas from 'html2canvas';

/* データの形式 */
const initialData = [
  { frequency: '500 Hz', decibelLeft: '0', decibelRight: '0' },
  { frequency: '1000 Hz', decibelLeft: '0', decibelRight: '0' },
  { frequency: '2000 Hz', decibelLeft: '0', decibelRight: '0' },
  { frequency: '3000 Hz', decibelLeft: '0', decibelRight: '0' },
  { frequency: '4000 Hz', decibelLeft: '0', decibelRight: '0' },
  { frequency: '8000 Hz', decibelLeft: '0', decibelRight: '0' },
];

const frequencies = [
  '500 Hz',
  '1000 Hz',
  '2000 Hz',
  '3000 Hz',
  '4000 Hz',
  '8000 Hz',
];

const inputGroup = [
  { label: '左: ', key: 'decibelLeft' },
  { label: '右: ', key: 'decibelRight' },
];

export const Recharts = () => {
  const [data, setData] = React.useState(initialData);

  /* グラフをクリップボードへコピー */
  const handleClick = async () => {
    const canvas = await html2canvas(document.querySelector('.chart'));
    // console.log(canvas);
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
      <h2>Recharts</h2>
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
        <LineChart width={600} height={300} data={data}>
          <Line
            type="linear"
            dataKey="decibelLeft"
            stroke="tomato"
            strokeWidth={2}
          />
          <Line
            type="linear"
            dataKey="decibelRight"
            stroke="limegreen"
            strokeWidth={2}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="frequency" />
          <YAxis />
        </LineChart>
      </div>
      <button onClick={handleClick}>COPY📋</button>
      <div>
        <h3>Date type</h3>
        <pre>
          <code>{JSON.stringify(data, null, 4)}</code>
        </pre>
      </div>
      <style jsx>{`
        input {
          width: 32px;
        }
      `}</style>
    </div>
  );
};
