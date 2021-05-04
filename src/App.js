import "./App.scss";
import "./mycss.scss";
import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import i18next from "i18next";
import axios from "axios";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import HomePage from "./containers/HomePage/index";
import HomePageInnerDashboard from "./containers/HomePageInnerDashboard";
import PageNotFound from "./component/PageNotFound/pageNotFound";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
// import configureStore from "./configureStore";
import sideNav from "./component/sideNav/sideNav";
// import history from "./utils/history";
import "./i18n";
//import english from ""
// import locale_en from "./translations/en.json";
// import locale_de from "./translations/ko.json";

import NotificationDialog from "./component/NotificationDialog/notificationDialog";
// const initialState = {};
// const store = configureStore(initialState, history);

let show = false;
function App(props) {
  const [showDialog, setShowDialog] = useState(false);

  function setShowModal() {
    show = false;
    setShowDialog(true);
  }
  // const languageDefault = localStorage.getItem("lang");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );
  const [engLang, setEngLang] = useState({});
  const [jaLang, setJaLang] = useState({});
  const [chaLang, setChaLang] = useState({});
  const [koLang, setKoLang] = useState({});
  // console.log(languageDefault)
  // console.log(props.language)
  // console.log('props langage',lang)
  localStorage.setItem("lang", lang);
  // useEffect(() => {
  //   axios.defaults.headers.common["Accept-Language"] = lang;
  //   i18next.changeLanguage(lang);
  //   setLanguage(lang); // language without region code
  // }, []);
  // console.log('Props language :', props.language)

  useEffect(() => {
    fetch("https://demsrmn8x8iiu.cloudfront.net/lang/xanalia/en.json")
      .then((response) => response.json())
      .then((res) => setEngLang(res.common))
      .catch((err) => {
        //console.log("err", err)
      });

    fetch("https://demsrmn8x8iiu.cloudfront.net/lang/xanalia/ko.json")
      .then((response) => response.json())
      .then((res) => setKoLang(res.common));

    fetch("https://demsrmn8x8iiu.cloudfront.net/lang/xanalia/ja.json")
      .then((response) => response.json())
      .then((res) => setJaLang(res.common));

    fetch("https://demsrmn8x8iiu.cloudfront.net/lang/xanalia/zh-hans.json")
      .then((response) => response.json())
      .then((res) => setChaLang(res.common))
      .catch((err) => {
        //console.log("err", err)
      });
    axios.defaults.headers.common["Accept-Language"] = lang;
    i18next.changeLanguage(lang);
    setLanguage(props.language);
    setLang(props.language);
  }, [props.language]);

  const messages = {
    en: engLang,
    ko: koLang,
    "zh-hans": chaLang,
    ja: jaLang,
  };
  // let currentDateTime =
  //   new Date().getTime() - localStorage.getItem("lastVisit");
  // let difference = currentDateTime / (1000 * 60 * 60);
  // let difference = currentDateTime / (1000 * 0 * 0);
  // console.log(difference);
  // if (!showDialog && difference >= 1.0) {
  //   show = true;
  // }

  return (
    <div className="App">
      <ReactNotification />
      <IntlProvider locale={language} messages={messages[language]}>
        {show ? (
          <NotificationDialog setShowDialog={setShowModal}></NotificationDialog>
        ) : (
          <BrowserRouter>
            {/* <HashRouter> */}
              <Switch>
                <Route exact path="/sideNav" component={sideNav} />
                <Route exact path="/landing_page" component={HomePage} />
                <Route path="/" component={HomePageInnerDashboard} />
                <Route path="*" component={PageNotFound} />
              </Switch>
            {/* </HashRouter> */}
          </BrowserRouter>
        )}
      </IntlProvider>
    </div>
  );
}
const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  return {
    language: state.metaMaskReducer.language,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
