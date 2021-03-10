import Routes from "./router";
import { Provider } from "react-redux";

import Tab from "@/common/component/tab";
import Header from "@/common/component/header";

const App = () => {
  return (
    <Provider className="App">
      <Header />
      <Tab />
      <Routes />
    </Provider>
  );
};

export default App;
