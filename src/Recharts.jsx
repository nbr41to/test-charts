import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import html2canvas from 'html2canvas';
import { useForm } from 'react-hook-form';

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

export const Recharts = () => {
  const [data, setData] = React.useState(initialData);
  const { register, handleSubmit, setValue } = useForm();

  /* データを反映 */
  const onSubmit = (value) => {
    console.log(value);
    setData(value.data);
  };

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

  return (
    <div>
      <h2>Recharts</h2>
      <h3>Interface</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label>左:</label>
            {frequencies.map((frequency, index) => {
              setValue(`data.${index}.frequency`, frequency);
              return (
                <input
                  key={index}
                  defaultValue="0"
                  type="number"
                  {...register(`data.${index}.decibelLeft`)}
                />
              );
            })}
          </div>
          <div>
            <label>右:</label>
            {frequencies.map((frequency, index) => {
              setValue(`data.${index}.frequency`, frequency);
              return (
                <input
                  key={index}
                  defaultValue="0"
                  type="number"
                  {...register(`data.${index}.decibelRight`)}
                />
              );
            })}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
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
      <style jsx>{`
        input {
          width: 32px;
        }
      `}</style>
    </div>
  );
};
