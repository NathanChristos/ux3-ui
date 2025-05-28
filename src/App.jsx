import './App.css';
import { ContextProvider } from './context/context';
import { MyEvents } from './pages/my-events';
import { Home } from './pages/home';
import { Navigation } from './shared/navigation';
import { FindEvents } from './pages/find-events';
import { UserProfile } from './pages/user-profile';

function App() {  
  return (
    <div className="App">
      <ContextProvider>
        <Navigation>
          <Home />
          <MyEvents />
          <FindEvents />
          <UserProfile />
        </Navigation>
      </ContextProvider>
    </div>
  );
}

export default App;
