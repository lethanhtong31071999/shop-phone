import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import CartFeature from "./features/Cart";
import HistoryFeature from "./features/History";
import PhonePage from "./features/Products/Phone";
import LandingFeature from "features/Products/Landing/index";
import PhoneDetail from "features/Products/Phone/pages/PhoneDetail/index";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnSearch = (filterSearch) => {
    setSearchTerm(filterSearch);
  };

  return (
    <div className="App">
      <AppBar onSearchSubmit={handleOnSearch} />
      <Switch>
        <Redirect path="/home" to="/" />

        <Route exact path="/" component={LandingFeature} />
        <Route path="/cart" component={CartFeature} />
        <Route path="/history" component={HistoryFeature} />
        <Route exact path="/phones">
          <PhonePage searchTerm={searchTerm} />
        </Route>
        <Route path="/products/:id" component={PhoneDetail} />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
