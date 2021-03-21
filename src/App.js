import Routes from "./router";
import { Provider } from "react-redux";

import Tab from "@/common/component/tab";
import Header from "@/common/component/header";
import Player from "@/pages/player";

import store from './store/index';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Tab />
        <Routes />
        <Player/>
      </div>
    </Provider>
  );
};

export default App;
