import React, {useEffect, useState} from 'react';
import './App.css';
import SimpleAppBar from './Appbar';
import MainDisplay from './MainDisplay';
import ExpansionPanel from './ExpansionPanel';
import styled from 'styled-components';

import instance from '../services/service';
import convertKelvinToC from '../utils/util';

function App() {

  const [weatherState, setWeatherState] = useState({
    country : 'Loading',
    today: {
      date: 'Loading',
      temperature: 'Loading',
      weatherConditions: 'Loading'
    },
    forecast: []
  })

  useEffect(()=> {
    const apiKey = 'db6b97310d9a1b1173695fa2fcf4b04b';
    const locationID = 1880251;

    instance.get(`/data/2.5/forecast?id=${locationID}&appid=${apiKey}`).then(res=> {
      setWeatherState({
        country: res.data.city.name,
        today: {
          date: res.headers.date,
          temperature: convertKelvinToC(res.data.list[0].main.temp),
          weatherConditions: res.data.list[0].weather[0].description
        },
        forecast: res.data.list
      })
    })
  }, [])

  return (
    <div className="App">
      <SimpleAppBar country={weatherState.country} />
      <Section>
        <MainDisplay today={weatherState.today} />
      </Section>
      <Section>
        <ExpansionPanel forecast={weatherState.forecast} />
      </Section>
    </div>
  );
}

const Section = styled.section`
  padding: 0 20px;
`

export default App;
