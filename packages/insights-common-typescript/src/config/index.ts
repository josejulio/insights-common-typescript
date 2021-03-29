import { DeepReadonly } from 'ts-essentials';

export const localUrl = (path: string, isBeta: boolean): string => {
    if (isBeta) {
        return `/beta${path}`;
    }

    return path;
};

const InternalConfig = {
    pages: {
        emailPreferences: (isBeta: boolean, bundle: string): string => localUrl(`/user-preferences/notification/${bundle}`, isBeta)
    }
};

export const Config: DeepReadonly<typeof InternalConfig> = InternalConfig;
