import { InsightsType } from '../utils/Insights';

const nonBetaEnvironments = [
    'ci',
    'qa',
    'stage',
    'prod'
] as const;

const betaEnvironments = nonBetaEnvironments.map(v => `${v}-beta` as const);
const environments = [ ...nonBetaEnvironments, ...betaEnvironments ] as const;

const prodEnvironments = [ 'prod', 'prod-beta' ] as const;
const nonProdEnvironments = environments.filter(v => !v.startsWith('prod' as const));

export type NonBetaEnvironment = typeof nonBetaEnvironments[number];
export type BetaEnvironment = typeof betaEnvironments[number];

export type Environment = NonBetaEnvironment | BetaEnvironment;

type Environments = Record<'all' | 'beta' | 'nonBeta' | 'prod' | 'nonProd', ReadonlyArray<Environment>>;
export const Environments: Environments = {
    all: environments,
    beta: betaEnvironments,
    nonBeta: nonBetaEnvironments,
    prod: prodEnvironments,
    nonProd: nonProdEnvironments
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
