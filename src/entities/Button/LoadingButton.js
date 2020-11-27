import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import './LoadingButton.scss';

const LoadingButton = ({
  type,
  variant,
  className,
  children,
  isLoading,
}) => {

  return (
    <Button
      type="submit"
      variant=""
      className="base-button auth-containter--submit"
      disabled={isLoading}
    >
      <div className="loading-button">
        { isLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span>&nbsp;로딩중</span>
          </>
        ) : children}
      </div>
    </Button>
  );
}

export default LoadingButton;