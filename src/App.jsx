import React from "react";
import "./App.css";
import Forecast from "./forecast.jsx";

const SearchBar = ({ query, q, change }) => {
  return (
    <div id="current" className="wrapper">
      <nav className=" navbar-fixed-top">
        <div className="container margin-left">
          <form
            className="card my-6"
            onSubmit={(e) => {
              e.preventDefault();
              query();
            }}
          >
            <div className="card-body row no-gutters align-items-center">
              <div className="col">
                <input
                  className="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Search ..."
                  value={q}
                  onChange={(e) => change(e)}
                />
              </div>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

const BottonPage = () => {
  return (
    <footer className="footer">
      <p>
        Weather Data from{" "}
        <a href="https://openweathermap.org" target="_blank">
          Openweathermap.org
        </a>
      </p>
    </footer>
  );
};
export default class App extends React.Component {
  constructor(procs) {
    super(procs);
    this.state = {
      baseURL: "https://api.openweathermap.org/data/2.5/weather?",
      APIkey: "cc23e56623cb52091c6e510b61e9c8e5",
      query: "Benin",
      forecast: {},
    };
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
    console.log(e.target.value);
  };

  componentDidMount() {
    this.query()
  }

  query = () => {
    let url =
      this.state.baseURL +
      "q=" +
      this.state.query +
      "&appid=" +
      this.state.APIkey;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          console.log("success");
          return response.json();
        }
      })
      .then((data) => {
        let weather = data.weather[0];
        let city = data.name
        let description = weather.description;
        let icon = weather.icon;

        let main = data.main;
        let temp = main.temp;

        let sys = data.sys;
        let countryCode = sys.country.toLowerCase();

        let forecast = {
          temp: temp,
          description: description,
          icon: icon,
          code: countryCode,
          city: city
        };

        this.setState({
          forecast: forecast,
          query: ''
        });
        console.log(forecast);
      });

  };

  render() {
    return (
      <div>
        <SearchBar
          query={this.query}
          q={this.state.query}
          change={this.handleChange}
        />
        <Forecast forecast={this.state.forecast}/>
        <BottonPage />
      </div>
    );
  }
}
