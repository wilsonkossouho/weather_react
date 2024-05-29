import React, {Component} from "react";

export default class Forecast extends Component{
    constructor(props){
        super(props)
        this.state = ({
            baseURL : 'https://openweathermap.org/img/wn/'
        })
    }

    format(){
        let option = {year: 'numeric', month: 'long', day: 'numeric'}
        return new Date().toLocaleDateString([], option)
    }

    render(){
        const children = this.props
        const forecast = children.forecast
        return(
            <div>
                <h1 className="location">
                {forecast.city}
                </h1>
                <h2 className="date">{this.format()}</h2>

                <div className="weatherIcon">
                    <div className="sunny"><img src={this.state.baseURL + forecast.icon +"@2x.png"}/></div>
                </div>

                <p className="temp">{(forecast.temp - 273.15).toFixed(0)}</p>
                <p className="condition">{forecast.description}</p>
            </div>
        )
    }
}