/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: React.FC<RouteComponentProps>;
  privateRoute?: string;
  isPrivate?: boolean;
  infoUser?: string[];
  condition?: Array<string[]>;
  Equal?: boolean[];
}

const RouteComponent: React.FC<PrivateRouteProps> = ({
  component: Component,
  privateRoute = '/',
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(rest: RouteComponentProps) => {
        if (props?.isPrivate)
          return props.isPrivate ? (
            <Component {...rest} />
          ) : (
            <>
              <Redirect
                to={{
                  pathname: privateRoute,
                  state: { from: rest.location },
                }}
              />
              {/*         {notification.error({message:'Você não possui autorização para acessar essa area.'})} */}
              {console.log(rest.location)}
            </>
          );
        return <Component {...rest} />;
      }}
    />
  );
};

export default RouteComponent;
