import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import './LoadingButton.scss';

const LoadingButton = ({
  type = 'button',
  variant = '',
  className = '',
  buttonClick = null,
  name = '',
  children = null,
  isLoading,
}) => {
  return (
    <Button
      type={type}
      name={name}
      variant={variant}
      className={`${className} loading-button`}
      disabled={isLoading}
      onClick={buttonClick}
    >
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
    </Button>
  );
}

export default LoadingButton;