import type { ButtonProps } from 'antd';
import { Button } from 'antd';


type colorTypes = 'accent' | 'danger' | 'default' | 'secondary' | 'success' | 'warning';

type colorsClasses = Record<colorTypes, string>;

export type CustomButtonProps = { readonly customColor?: colorTypes; } & Omit<ButtonProps, 'danger' | 'shape'>;

const extraClasses: colorsClasses = {
    accent: 'text-accent',
    danger: '',
    default: '',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning'
};

export const ActionButton = ({ className, customColor = 'default', icon, ...props }: CustomButtonProps) => (
    <Button
        className={ `border-none shadow ${className ?? ''} ${extraClasses[customColor]}` }
        danger={ customColor === 'danger' }
        shape='circle'
        { ...props }
    >
        {
            icon && (
                <div className='flex justify-center align-middle text-[24px]'>
                    {icon}
                </div>
            )
        }
    </Button>
);