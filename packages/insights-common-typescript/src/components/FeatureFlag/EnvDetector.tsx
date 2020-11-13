import * as React from 'react';
import { RenderIf } from './RenderIf';
import { InsightsType } from '../../utils';

const nonBetaEnvironments = [
    'ci',
    'qa',
    'staging',
    'prod'
] as const;

const betaEnvironments = nonBetaEnvironments.map(v => `${v}-beta` as const);
const environments = [ ...nonBetaEnvironments, ...betaEnvironments ] as const;

const prodEnvironments = [ 'prod', 'prod-beta' ] as const;
const nonProdEnvironments = environments.filter(v => !v.startsWith('prod' as const));

type NonBetaEnvironment = typeof nonBetaEnvironments[number];
type BetaEnvironment = typeof betaEnvironments[number];

type Environment = NonBetaEnvironment | BetaEnvironment;

type Environments = Record<'all' | 'beta' | 'nonBeta' | 'prod' | 'nonProd', ReadonlyArray<Environment>>;
export const Environments: Environments = {
    all: environments,
    beta: betaEnvironments,
    nonBeta: nonBetaEnvironments,
    prod: prodEnvironments,
    nonProd: nonProdEnvironments
};

interface EnvDetectorProps {
    onEnvironment: ReadonlyArray<Environment> | Environment;
    currentEnvironment: Environment;
}

export const EnvDetector: React.FunctionComponent<EnvDetectorProps> = (props) => {
    const environment = React.useMemo(
        () => Array.isArray(props.onEnvironment) ? props.onEnvironment : [ props.onEnvironment ],
        [ props.onEnvironment ]
    );

    const renderIf = React.useCallback(
        () => environment.includes(props.currentEnvironment),
        [ props.currentEnvironment, environment ]
    );

    return <RenderIf renderIf={ renderIf }>
        { props.children }
    </RenderIf>;
};

interface InsightsBetaDetectorProps extends Omit<EnvDetectorProps, 'currentEnvironment'> {
    insights: InsightsType;
}

export const InsightsEnvDetector: React.FunctionComponent<InsightsBetaDetectorProps> = (props) => {
    const currentEnvironment: Environment = React.useMemo(() => {
        const isBeta = props.insights.chrome.isBeta();
        const env: NonBetaEnvironment = props.insights.chrome.getEnvironment();
        if (isBeta) {
            return `${env}-beta` as BetaEnvironment;
        } else {
            return env;
        }
    }, [ props.insights ]);

    return <EnvDetector onEnvironment={ props.onEnvironment } currentEnvironment={ currentEnvironment }>{ props.children }</EnvDetector>;
};
