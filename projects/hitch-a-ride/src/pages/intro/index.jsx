import React from "react";
import { FrameCorners , Button, Text } from "@arwes/core";
import { AnimatorGeneralProvider } from '@arwes/animation'
import { useHistory } from "react-router-dom";

import "./style.css";

const animatorGeneral = { duration: { enter: 200, exit: 200 } };

export default function Intro() {
  const history = useHistory();

  return (
    <div className="intro">
      <AnimatorGeneralProvider animator={animatorGeneral}>
        <FrameCorners className="intro__heading-box" animator={{ activate: true }} hover>
          <h1 className="intro__heading">Hitch a Ride</h1>
          <Text>Across the galaxy</Text>
          <br />
          <Button
            className="intro__button"
            animator={{ activate: true }}
            onClick={event => history.push("/catalogue")}
          >
            <Text>Continue</Text>
          </Button>
        </FrameCorners>
      </AnimatorGeneralProvider>
    </div>
  );
}
