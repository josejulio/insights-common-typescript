import * as React from 'react';
import { InsightsType } from '../../utils';
import { RenderIfFalse, RenderIfTrue } from '../FeatureFlag/RenderIf';
import { EnvDetector, Environments, InsightsEnvDetector } from '../FeatureFlag/EnvDetector';

/**
 * @Deprecated Use RenderIfTrue instead.
 */
export const BetaIf = RenderIfTrue;

/**
 * @Deprecated Use RenderIfFalse instead.
 */
export const BetaIfNot = RenderIfFalse;

type BetaDetectorProps = {
    children: React.ReactNode;
    isBeta: boolean;
}

/**
 * @Deprecated Use EnvDetector with onEnvironment={ Environments.beta } and one of the current environments.
 */
export const BetaDetector: React.FunctionComponent<BetaDetectorProps> = (props) =>
    <EnvDetector
        onEnvironment={ Environments.beta }
        currentEnvironment={ props.isBeta ? Environments.beta[0] : Environments.nonBeta[0] }
    >
        { props.children }
    </EnvDetector>;

interface InsightsBetaDetectorProps extends Omit<BetaDetectorProps, 'isBeta'> {
    insights: InsightsType;
}

/**
 * @Deprecated Use InsightsEnvDetector with onEnvironment={ Environments.beta }
 */
export const InsightsBetaDetector: React.FunctionComponent<InsightsBetaDetectorProps> = (props) =>
    <InsightsEnvDetector
        insights={ props.insights }
        onEnvironment={ Environments.beta }
    >
        { props.children }
    </InsightsEnvDetector>;
