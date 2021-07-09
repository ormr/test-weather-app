import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  variant,
  disabled,
}) => {
  return (
    <BootstrapButton
      className={className}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
    >
      {children}
    </BootstrapButton>
  );
};
