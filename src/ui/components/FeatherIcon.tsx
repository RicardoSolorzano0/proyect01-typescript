import Icon from '@ant-design/icons';
import type { ComponentProps, ComponentType, SVGProps } from 'react';


type Props = {
    readonly icon: ComponentType<SVGProps<SVGSVGElement>>;
} & ComponentProps<typeof Icon>;

export const FeatherIcon = ({ icon, ...props }: Props) => (
    <Icon
        component={ icon }
        { ...props }
        className={ `${props.className} feather-icon` }
    />
);