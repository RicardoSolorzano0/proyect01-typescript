import type { MenuProps } from 'antd';
import { Button, Dropdown, Tooltip } from 'antd';
import { useState } from 'react';
import { Globe } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { FeatherIcon } from './FeatherIcon';


type OptionType = {
    label: string;
    value: string;
};

const generateOptions = (engLabel: string, espLabel: string): OptionType[] => [
    {
        label: engLabel,
        value: 'en'
    },
    {
        label: espLabel,
        value: 'es'
    }
];

export const LanguageSelector = () => {
    const { i18n, t } = useTranslation('common');
    const [options, setOptions] = useState<OptionType[]>(generateOptions(t('english'), t('spanish')));
    const handleLanguageChange: MenuProps['onClick'] = ({ key }): void => {
        void i18n.changeLanguage(key).then(() => {
            setOptions(generateOptions(t('common:english'), t('common:spanish')));
        });
    };

    const items: MenuProps['items'] = options.map(({ label, value }) => ({
        disabled: i18n.language === value,
        key: value,
        label: <span>{label}</span>
    }));

    return (
        <Tooltip placement='left' title={t('changeLanguage')}>
            <Dropdown menu={{ items, onClick: handleLanguageChange }} placement='bottom' trigger={['click']}>
                <Button className='flex items-center justify-center' shape='circle'>
                    <FeatherIcon icon={Globe} />
                </Button>
            </Dropdown>
        </Tooltip>
    );
};