import React, {Fragment} from 'react';

function MainDisplay(props) {
    return(
        <Fragment>
            <h3>{props.today.date}</h3>
            <h1>{props.today.temperature}</h1>
            <h2>{props.today.weatherConditions}</h2>
        </Fragment>
    );
}

export default MainDisplay;