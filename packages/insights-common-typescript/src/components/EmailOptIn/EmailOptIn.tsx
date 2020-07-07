import * as React from 'react';
import { Alert, AlertVariant, Text, TextContent } from '@patternfly/react-core';

import { Messages } from '../../properties/Messages';
import { Config } from '../../config';
import {getInsights, InsightsType} from '../../utils';

interface EmailOptInProps {
    content: string;
    isBeta: boolean;
}

export const EmailOptIn: React.FunctionComponent<EmailOptInProps> = (props) => {
    const emailUrl = React.useMemo(() => Config.pages.emailPreferences(props.isBeta), [ props.isBeta ]);

    return (
        <Alert
            title={ Messages.components.emailOptIn.title }
            variant={ AlertVariant.warning }
            isInline={ true }
        >
            <TextContent>
                <Text>{ props.content }</Text>
                <Text>
                    <a href={ emailUrl } target='_blank' rel='noopener noreferrer' >{ Messages.components.emailOptIn.link }</a>
                </Text>
            </TextContent>
        </Alert>
    );
};

interface InsightsEmailOptInProps extends Omit<EmailOptInProps, 'isBeta'> {
    insights: InsightsType;
}

export const InsightsEmailOptIn: React.FunctionComponent<InsightsEmailOptInProps> = (props) =>
    <EmailOptIn { ...props } isBeta={ props.insights.chrome.isBeta() }/>;
