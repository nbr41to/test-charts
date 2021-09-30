import { useState } from 'react';
import { ChartsJS } from './ChartsJS';
import { Recharts } from './Recharts';

function App() {
  const [chart, setChart] = useState('ChartsJS');

  return (
    <div>
      <h1>React Charts Test</h1>
      <button onClick={() => setChart('ChartsJS')}>chartsjs</button>
      <button onClick={() => setChart('Recharts')}>recharts</button>
      {chart === 'ChartsJS' && <ChartsJS />}
      {chart === 'Recharts' && <Recharts />}
    </div>
  );
}

export default App;
