import Routes from "./router";
import { Provider } from "react-redux";

import Tab from "@/common/component/tab";
import Header from "@/common/component/header";

import store from './store/index';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Tab />
        <Routes />
      </div>
    </Provider>
  );
};

export default App;
