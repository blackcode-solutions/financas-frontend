import {  InputHTMLAttributes, forwardRef } from 'react';
import styles from './styles.module.scss';

interface InputDateTimeComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  isDisable?: boolean;
  datatestid?: string;
}

function InputDateTimeComponent(
  {
    isDisable,
    datatestid,
    ...props
  }: InputDateTimeComponentProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input
      type="datetime-local"
      className={`${isDisable ? styles.inputDisable : styles.inputComponent}`}
      disabled={isDisable}
      max="2500-06-07T00:00"
      min="1900-06-14T00:00"
      ref={ref}
      {...props}
    />
  );
}

export default forwardRef(InputDateTimeComponent);

