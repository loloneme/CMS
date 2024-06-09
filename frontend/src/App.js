import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './utils/UserContext';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        {/* <AuthCheck> */}
        <AppRouter />

        {/* </AuthCheck> */}
      </BrowserRouter>
    </UserProvider>

  );
};

export default App;
