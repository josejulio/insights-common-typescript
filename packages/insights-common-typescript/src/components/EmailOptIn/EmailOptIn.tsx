import * as React from 'react';
import { Alert, AlertVariant, Text, TextContent } from '@patternfly/react-core';

import { Messages } from '../../properties/Messages';
import { Config } from '../../config';
import { InsightsType, OuiaComponentProps } from '../../utils';
import { getOuiaProps } from '../../utils/Ouia';

interface EmailOptInProps extends OuiaComponentProps {
    content: string;
    isBeta: boolean;
    bundle: string;
}

export const EmailOptIn: React.FunctionComponent<EmailOptInProps> = (props) => {
    const emailUrl = React.useMemo(() => Config.pages.emailPreferences(props.isBeta, props.bundle), [ props.bundle, props.isBeta ]);

    return (
        <div { ...getOuiaProps('EmailOptin', props) }>
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
        </div>
    );
};

interface InsightsEmailOptInProps extends Omit<EmailOptInProps, 'isBeta' | 'bundle'> {
    insights: InsightsType;
}

export const InsightsEmailOptIn: React.FunctionComponent<InsightsEmailOptInProps> = (props) =>
    <EmailOptIn { ...props } isBeta={ props.insights.chrome.isBeta() } bundle={ props.insights.chrome.getBundle() } />;
