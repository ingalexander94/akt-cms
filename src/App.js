import './App.css';
import pageList from './pages.json';

function App() {
  return (
 <>
    <header />
        <nav>
            <img src='https://www.aktmotos.com/sites/default/files/logo-akt-enero-2021.png' alt='logo' />
            <ul>
                {
                    pageList.map(({name}) =>  <li>{name} <i class='fa fa-caret-down'></i></li>)
                }
            </ul>
        </nav>
 </>
  );
}

export default App;
