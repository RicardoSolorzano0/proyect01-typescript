import { Button, Empty, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';

export const NotFound = () => {
    const { pathname } = useLocation();

    return (
        <div className='flex h-screen items-center justify-center'>
            <Empty
                className=' '
                description={ (
                    <Typography.Text>
            La página {pathname} no existe.Regresar a un lugar seguro
                    </Typography.Text>
                ) }
            >
                <Button type='primary'>
                    <Link to='/'>Regresar</Link>
                </Button>
            </Empty>
        </div>
    );
};
