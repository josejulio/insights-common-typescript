import { InsightsType } from '../utils/Insights';

const nonBetaEnvironments = [
    'ci',
    'qa',
    'stage',
    'prod',
    'fedrampprod',
    'fedrampstage'
] as const;

const betaEnvironments = nonBetaEnvironments.map(v => `${v}-beta` as const);
const environments = [ ...nonBetaEnvironments, ...betaEnvironments ] as const;

const prodEnvironments = [ 'prod', 'prod-beta' ] as const;
const nonProdEnvironments = environments.filter(v => !v.startsWith('prod' as const));

const ciEnvironments: ReadonlyArray<Environment> = [ 'ci', 'ci-beta' ];
const qaEnvironments: ReadonlyArray<Environment> = [ 'qa', 'qa-beta' ];
const stageEnvironments: ReadonlyArray<Environment> = [ 'stage', 'stage-beta' ];

const fedrampProdEnvironments: ReadonlyArray<Environment> = [ 'fedrampprod', 'fedrampprod-beta' ];
const fedrampStageEnvironments: ReadonlyArray<Environment> = [ 'fedrampstage', 'fedrampstage-beta' ];

export type NonBetaEnvironment = typeof nonBetaEnvironments[number];
export type BetaEnvironment = typeof betaEnvironments[number];

export type Environment = NonBetaEnvironment | BetaEnvironment;

type Environments = Record<
    'all' | 'beta' | 'nonBeta' | 'prod' | 'nonProd' | 'ci' | 'qa' | 'stage' | 'fedrampprod' | 'fedrampstage',
    ReadonlyArray<Environment>
>;
export const Environments: Environments = {
    all: environments,
    beta: betaEnvironments,
    nonBeta: nonBetaEnvironments,
    prod: prodEnvironments,
    nonProd: nonProdEnvironments,
    ci: ciEnvironments,
    qa: qaEnvironments,
    stage: stageEnvironments,
    fedrampprod: fedrampProdEnvironments,
    fedrampstage: fedrampStageEnvironments
};

export const getInsightsEnvironment = (insights: InsightsType): Environment => {
    const isBeta = insights.chrome.isBeta();
    const env: NonBetaEnvironment = insights.chrome.getEnvironment();
    if (isBeta) {
        return `${env}-beta` as BetaEnvironment;
    } else {
        return env;
    }
};
