import { Switch, Typography } from 'antd';
import { useState } from 'react';

const { Paragraph, Text } = Typography;

export const Example = () => {
    const [ellipsis, setEllipsis] = useState(true);

    return (
        <>
            <Switch
                checked={ ellipsis }
                onChange={ () => {
                    setEllipsis(!ellipsis);
                } }
            />

            <Paragraph ellipsis={ ellipsis }>
                Ant Design, a design language for background applications, is refined by
                Ant UED Team. Ant Design, a design language for background applications,
                is refined by Ant UED Team. Ant Design, a design language for background
                applications, is refined by Ant UED Team. Ant Design, a design language
                for background applications, is refined by Ant UED Team. Ant Design, a
                design language for background applications, is refined by Ant UED Team.
                Ant Design, a design language for background applications, is refined by
                Ant UED Team.
            </Paragraph>

            <Paragraph
                ellipsis={
                    ellipsis ? { expandable: true, rows: 3, symbol: 'más' } : false
                }
            >
                Ant Design, a design language for background applications, is refined by
                Ant UED Team. Ant Design, a design language for background applications,
                is refined by Ant UED Team. Ant Design, a design language for background
                applications, is refined by Ant UED Team. Ant Design, a design language
                for background applications, is refined by Ant UED Team. Ant Design, a
                design language for background applications, is refined by Ant UED Team.
                Ant Design, a design language for background applications, is refined by
                Ant UED Team.
            </Paragraph>

            <Text
                ellipsis={ ellipsis ? { tooltip: 'I am ellipsis now!' } : false }
                style={ ellipsis ? { width: 200 } : undefined }
            >
                Ant Design, a design language for background applications, is refined by
                Ant UED Team.
            </Text>

            <Text
                code
                ellipsis={ ellipsis ? { tooltip: 'I am ellipsis now!' } : false }
                style={ ellipsis ? { width: 200 } : undefined }
            >
                Ant Design, a design language for background applications, is refined by
                Ant UED Team.
                Ant Design, a design language for background applications, is refined by
                Ant UED Team.

                Ant Design, a design language for background applications, is refined by
                Ant UED Team.
            </Text>
        </>
    );
};
