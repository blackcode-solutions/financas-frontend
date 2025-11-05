import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './switchcomponent.module.scss';

interface SwitchComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  fontSize?: string;
  isDisabled?: boolean;
  font?:string
}

 function SwitchComponent({
  font,
  name,
  label,
  fontSize,
  isDisabled,
  ...props
}: SwitchComponentProps, ref: React.Ref<HTMLInputElement>) {
  return (
    <>
      <label
        style={{
          fontFamily: 'Roboto, sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: '.25rem',
          fontSize: fontSize ? fontSize : '.85rem',
          letterSpacing: '.1px',
          opacity: `${isDisabled ? '0.6' : '1'}`,
          cursor: `${isDisabled ? 'no-drop' : 'pointer'}`,
          color: '#333',
          fontWeight:`${font ? font : ''}`
        }}
      >
        <div className={styles.switch}>
          <input type="checkbox" ref={ref} name={name} {...props} disabled={isDisabled} />
          <span
            className={` ${styles['slider']} ${styles['round']}`}
            style={{
              opacity: `${isDisabled ? '0.6' : '1'}`,
              cursor: `${isDisabled ? 'no-drop' : ''}`,
              // backgroundColor:`${isDisabled ? 'gray' : ''}`
            }}
          ></span>
        </div>
        <div className='label'>
        {label}
        </div>
      </label>
    </>
  );
}
export default forwardRef(SwitchComponent)
