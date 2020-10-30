import { useCallback, useMemo, useState } from 'react';
import { useUrlState } from './useUrlState';

export const useUrlStateMultipleOptions = <T extends string>(name: string, initialOptions: Array<T>, defaultValue?: Array<T>) => {
    const [ options ] = useState(initialOptions);
    const lowerCaseOptions = useMemo(() => options.map(o => o.trim().toLowerCase()), [ options ]);

    const serializer = useCallback((val: Array<T> | undefined) => {
        const value = val?.map(v => v.toLowerCase());
        if (value) {
            return value.map(v => lowerCaseOptions.indexOf(v))
            .filter(i => i !== -1)
            .map(i => options[i])
            .join(',');
        }

        return undefined;
    }, [ lowerCaseOptions, options ]);

    const deserializer = useCallback((val: string | undefined) => {
        const value = val?.trim().toLowerCase().split(',');
        if (value) {
            return value
            .map(v => lowerCaseOptions.indexOf(v))
            .filter(i => i !== -1)
            .map(i => options[i]);
        }

        return [];
    }, [ lowerCaseOptions, options ]);

    return useUrlState<Array<T>>(
        name,
        serializer,
        deserializer,
        defaultValue
    );
};
