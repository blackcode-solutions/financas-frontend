import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import styles from './styles.module.scss';

interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isDisable?: boolean;
  datatestid?: string;
  isReturn?:boolean;
}

function ButtonComponent(
  {
    children,
    isDisable,
    datatestid,
    isReturn,
    ...props
  }: ButtonComponentProps,
  ref: React.Ref<HTMLButtonElement>
) {
  if(isReturn){
    return <button
    data-testid={datatestid}
    ref={ref}
    className={`${
      isDisable ? styles.buttonDisabledReturn : styles.buttonComponentReturn
    } `}
    disabled={isDisable ? true : false}

    {...props}
  >
    {children}
  </button>

  }
  return (
   <button
        data-testid={datatestid}
        ref={ref}
        className={`${
          isDisable ? styles.buttonDisabled : styles.buttonComponent
        } `}
        disabled={isDisable ? true : false}
        style={{ background: `${isReturn ? '#c62828 !important' : ''}` }}
        {...props}
      >
        {children}
      </button>
  );
}

export default forwardRef(ButtonComponent);