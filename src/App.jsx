import { useState } from 'react';
import { ChartsJS } from './ChartsJS';
import { ChartsJS2 } from './ChartsJS2';
import { Recharts } from './Recharts';

function App() {
  const [chart, setChart] = useState('ChartsJS');

  return (
    <div>
      <h1>React Charts Test</h1>
      <button onClick={() => setChart('ChartsJS')}>chartsjs</button>
      <button onClick={() => setChart('Recharts')}>recharts</button>
      <button onClick={() => setChart('ChartsJS2')}>語音弁別能</button>
      {chart === 'ChartsJS' && <ChartsJS />}
      {chart === 'Recharts' && <Recharts />}
      {chart === 'ChartsJS2' && <ChartsJS2 />}
    </div>
  );
}

export default App;
