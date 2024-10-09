import React from "react";

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>;

export default function Form({ onSubmit, children, ...rest }: FormProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      event.key === "Enter" &&
      (event.target as HTMLElement).tagName === "INPUT"
    ) {
      event.preventDefault();
    }
  };

  return (
    <form onSubmit={onSubmit} onKeyDown={handleKeyDown} {...rest}>
      {children}
    </form>
  );
}
