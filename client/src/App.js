import './App.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Characters from './components/marvelcharacters';
import Home from './components/Home';
import Character from './components/character'
import Collectors from './components/collectors';



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link className='showlink' to='/'>Home</Link>
          <Link className='showlink' to={`/Characters/page/${1}`}>Characters</Link>
          <Link className='showlink' to={`/collectors`}>Collectors</Link>
        </header>
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Characters/page/:page' element={<Characters/>} />
            <Route path='/character/:id' element={<Character/>} />
            <Route path='/collectors' element={<Collectors/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
