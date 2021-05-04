import "./App.scss";
import "./mycss.scss";
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage/index";
import HomePageInnerDashboard from "./containers/HomePageInnerDashboard";
import { Provider } from "react-redux";

import PageNotFound from "./component/PageNotFound/pageNotFound";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import configureStore from "./configureStore";
import sideNav from "./component/sideNav/sideNav";
import history from "./utils/history";

import {
  setMetaMask,
  setContract,
  deleteContract,
  deleteMetaMask,
  setApprovalForAlia,
  setApprovalForLp,
  deleteApprovalForAlia,
  deleteApprovalForLp,
  setDecimalsForAlia,
  setDecimalsForLp,
  deleteDecimalsForAlia,
  deleteDecimalsForLp,
} from "./_actions/metaMaskActions";
import { connect } from "react-redux";

import "./i18n";
import i18next from "i18next";
import axios from "axios";
import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";

import locale_en from "./translations/en.json";
import locale_de from "./translations/ko.json";

const messages = {
  en: locale_en,
  ko: locale_de,
};

function App(props) {
  // const [lang, setLang] = useState("en");
  // const [language, setLanguage] = useState("en");

  // useEffect(() => {
  //   axios.defaults.headers.common["Accept-Language"] = lang;
  //   i18next.changeLanguage(lang);
  //   setLanguage(lang); // language without region code
  // }, []);

  // useEffect(() => {
  //   axios.defaults.headers.common["Accept-Language"] = lang;
  //   i18next.changeLanguage(lang);
  //   setLanguage(props.language);
  //   setLang(props.language);
  // }, [props.language]);

  return (
    <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/sideNav" component={sideNav} />
            <Route exact path="/landing_page" component={HomePage} />
            <Route path="/" component={HomePageInnerDashboard} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </HashRouter>
    </div>
  );
}

const mapDispatchToProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    language: state.metaMaskReducer.language,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
