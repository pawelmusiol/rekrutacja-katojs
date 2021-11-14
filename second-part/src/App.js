import { useState, useEffect } from 'react'
import axios from "axios"

const useWeather = () => {
    const [City, setCity] = useState(false)
    const [Weather, setWeather] = useState([])
    useEffect(() => {
        let interval = () => { }
        if (City) {
            axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://samples.openweathermap.org/data/2.5/forecast?q=${City}&appid=b6907d289e10d714a6e88b30761fae22`)}`).then((response) => {
                setWeather(JSON.parse(response.data.contents).list)
            })
            interval = setInterval(() => {
                axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://samples.openweathermap.org/data/2.5/forecast?q=${City}&appid=b6907d289e10d714a6e88b30761fae22`)}`).then((response) => {
                    setWeather(JSON.parse(response.data.contents).list)
                })
            }, 10000)
        }
        return () => clearInterval(interval)
    }, [City])


    return [Weather, setCity]
}

function App() {
    const [Weather, setCity] = useWeather()

    return (
        <div>
            <div style={{maxWidth:"400px"}}>
                <select className="form-select" onChange={e => setCity(e.target.value)}>
                    <option value={false}>Select city</option>
                    <option value="Munich,de">Munchen</option>
                    <option value="London,gb">London</option>
                </select>
            </div>

            <div className="d-flex justify-content-center">
                <table className="table table-striped" style={{maxWidth: '1000px'}}>
                    <thead className="thead-light">
                        <th>Date</th>
                        <th>Humidity</th>
                        <th>Temperature</th>
                    </thead>
                    <tbody>
                        {Weather.map(row => <tr><td>{row.dt_txt}</td><td>{row.main.humidity}</td><td>{row.main.temp}</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
