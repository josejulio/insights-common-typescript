import { useCallback, useMemo } from 'react';
import { useUrlState } from './useUrlState';

type Unpacked<T> = T extends (infer U)[]  ? U : T;

export const useUrlStateExclusiveOptions = <T extends string, AT extends Array<T>>(name: string, options?: AT, defaultValue?: Unpacked<AT>) => {
    const lowerCaseOptions = useMemo(() => options?.map(o => o.trim().toLowerCase()), [ options ]);

    const serializer = useCallback((val: Unpacked<AT> | undefined) => {
        const value = val?.trim().toLowerCase();
        if (value) {
            if (lowerCaseOptions && options) {
                const index = lowerCaseOptions.indexOf(value);
                if (index !== -1) {
                    return options[index];
                }
            } else {
                return val;
            }
        }

        return undefined;
    }, [ lowerCaseOptions, options ]);

    const deserializer = useCallback((val: string | undefined) => {
        const value = val?.trim();
        if (value) {
            if (options && lowerCaseOptions) {
                const index = lowerCaseOptions.indexOf(value.toLowerCase());
                if (index !== -1) {
                    return options[index] as Unpacked<AT>;
                }
            } else {
                return value as Unpacked<AT>;
            }
        }

        return undefined;
    }, [ lowerCaseOptions, options ]);

    return useUrlState<Unpacked<AT>>(name, serializer, deserializer, defaultValue);
};
