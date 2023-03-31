import { useState } from 'react';
import './App.css';
import Listing from './components/Listing';



const App = (props) => {
  const [count, setCount] = useState(0);

  return (
    < Listing document={props.documents[0]}/>
  );
};

export default App;
