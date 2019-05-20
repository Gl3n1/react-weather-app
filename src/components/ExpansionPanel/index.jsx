import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import convertKelvinToC from '../../utils/util';

const styles = theme => ({
  root: {
    width: '100%',
    textAlign: 'left'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 800,
  },
  heading2: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  heading3: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    opacity: 0.6
  }
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      {
        props.forecast.map((item,index,array) => {
          if(item !== array[0]) {
            if(item.dt_txt.split(' ')[0] !== array[index -1].dt_txt.split(' ')[0])
            return (
              <ExpansionPanel key={index}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div style={{display: 'flexbox', flexDirection: 'row'}}>
                  <Typography className={classes.heading}>{item.dt_txt.split(' ')[0]}</Typography>
                  <Typography className={classes.heading2}>{convertKelvinToC(item.main.temp_min)} - {convertKelvinToC(item.main.temp_max)}</Typography>
                  <Typography className={classes.heading3}>{item.weather[0].description}</Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                grnd_level : {item.main.grnd_level}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            )
          }
          
      })
      }
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
