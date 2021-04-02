import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '../components/Dashboard/Container';
import dash from '../routes/dash'
import RouteComponent from '../routes/RouteComponent'

function Application() {


  return (
      <Container>
          <Switch>
            {dash.map((route, i) => (
              <RouteComponent key={i} {...route} />
            ))}
          </Switch>
      </Container>

  );
}

export default Application;
