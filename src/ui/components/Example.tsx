import { useState } from "react";
import { Switch, Typography } from "antd";

const { Paragraph, Text } = Typography;

export const Example = () => {
    const [ellipsis, setEllipsis] = useState(true);

    return (
        <>
            <Switch
                checked={ellipsis}
                onChange={() => {
                    setEllipsis(!ellipsis);
                }}
            />

            <Paragraph ellipsis={ellipsis}>
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
                    ellipsis ? { rows: 3, expandable: true, symbol: "más" } : false
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
                style={ellipsis ? { width: 200 } : undefined}
                ellipsis={ellipsis ? { tooltip: "I am ellipsis now!" } : false}
            >
                Ant Design, a design language for background applications, is refined by
                Ant UED Team.
            </Text>

            <Text
                code
                style={ellipsis ? { width: 200 } : undefined}
                ellipsis={ellipsis ? { tooltip: "I am ellipsis now!" } : false}
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
