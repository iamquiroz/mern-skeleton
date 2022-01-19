import { Menu } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";

const MainRouter = () => {
  return (
    <div>
          <Menu/> 
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users}/>
      </Switch>
    </div>
  );
};

export default MainRouter;
