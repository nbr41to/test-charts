import { useState } from 'react';
import { ChartsJS } from './ChartsJS';
import { Recharts } from './Recharts';
import { SpeechDiscrimination } from './SpeechDiscrimination';

function App() {
  const [chart, setChart] = useState('ChartsJS');

  return (
    <div>
      <h1>React Charts Test</h1>
      <button onClick={() => setChart('ChartsJS')}>chartsjs</button>
      <button onClick={() => setChart('Recharts')}>recharts</button>
      <button onClick={() => setChart('speech-discrimination')}>
        語音弁別能
      </button>
      {chart === 'ChartsJS' && <ChartsJS />}
      {chart === 'Recharts' && <Recharts />}
      {chart === 'speech-discrimination' && <SpeechDiscrimination />}
    </div>
  );
}

export default App;
