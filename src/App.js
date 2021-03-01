import Routes from './router';
import Tab from "@/common/component/tab";
import Header from "@/common/component/header";


const App=()=> {
  return (
    <div className="App">
      <Header />
      <Tab />
      <Routes />
    </div>
  );
}

export default App;


