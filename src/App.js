import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import LOGIN from './auth/login/login';
import HOME from './home/home';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LOGIN />} />
          <Route path='/home' element={<HOME />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
