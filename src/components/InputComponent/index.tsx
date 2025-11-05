import {  InputHTMLAttributes, forwardRef } from 'react';
import styles from './styles.module.scss';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  isDisable?: boolean;
  datatestid?: string;
}

function InputComponent(
  {
    isDisable,
    datatestid,
    ...props
  }: InputComponentProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input
        data-testid={datatestid}
        ref={ref}
        className={`${
          isDisable ? styles.inputDisable : styles.inputComponent
        } `}
        disabled={isDisable ? true : false}
        {...props}
      >
      </input>
  );
}

export default forwardRef(InputComponent);

