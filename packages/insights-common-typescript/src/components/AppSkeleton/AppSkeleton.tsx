import * as React from 'react';

import {
    Main,
    PageHeader,
    PageHeaderTitle,
    Section,
    Skeleton,
    Spinner
} from '@redhat-cloud-services/frontend-components';
import { Bullseye } from '@patternfly/react-core';

import { OuiaComponentProps, getOuiaProps } from '../../utils/Ouia';

export const AppSkeleton: React.FunctionComponent<OuiaComponentProps> = (props) => {

    return (
        <div { ...getOuiaProps('AppSkeleton', props) }>
            <PageHeader>
                <div className="pf-c-content">
                    <PageHeaderTitle title={ <Skeleton size="sm"/> }/>
                </div>
            </PageHeader>
            <Main>
                <Section>
                    <Bullseye>
                        <Spinner centered/>
                    </Bullseye>
                </Section>
            </Main>
        </div>
    );
};
