import React, { useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './LoadSpinner.scss';

const LoadSpinner = ({ isLoadded }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={!isLoadded}
      timeout={500}
      classNames='loading'
      mountOnEnter
      unmountOnExit
    >
      <div ref={nodeRef} className="body__dimming">
        <div className="dimming__contain">
          <Spinner
            className="dimming--spinner"
            animation="border"
            variant="light"
          />
        </div>
      </div>
    </CSSTransition>
  );
}

export default LoadSpinner;
