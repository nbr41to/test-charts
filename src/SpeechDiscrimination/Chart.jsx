import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

/* chartOptions */
const options = {
  scales: {
    y: {
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        callback: function (tick) {
          return tick.toString() + '%';
        },
      },
    },
  },
};

export const Chart = ({ className, data }) => {
  /* グラフをクリップボードへコピー */
  const handleClick = async () => {
    try {
      const canvas = document.getElementById('chart');
      if (!canvas || !navigator) return;
      await canvas.toBlob((blob) => {
        // eslint-disable-next-line no-undef
        const image = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([image]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledChart className={`${className}`}>
      <Line id="chart" data={data} options={options} width={600} height={360} />
      <button onClick={handleClick}>グラフの画像をコピー</button>
    </StyledChart>
  );
};

const StyledChart = styled.div`
  display: flex;
  flex-direction: column;
  width: min-content;
`;
