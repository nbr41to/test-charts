import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

/* chartOptions */
const options = {
  scales: {
    y: {
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {},
    },
  },
};

export const Chart = ({ className, data }) => {
  /* グラフをクリップボードへコピー */
  const handleClick = async () => {
    const canvas = document.getElementById('chart');
    if (!canvas || !navigator) return;
    canvas.toBlob((blob) => {
      // eslint-disable-next-line no-undef
      const image = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([image]);
    });
    alert('グラフをクリップボードにコピーしました。');
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
`;
