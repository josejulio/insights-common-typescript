import { createClient, RequestInterceptor } from 'react-fetching-library';
import { InsightsType } from './Insights';

const getRefreshAuthTokenInterceptor = (getInsights: () => InsightsType): RequestInterceptor => (_client) => (action) => {
    return getInsights().chrome.auth.getUser()
    .then(() => action);
};

export const createFetchingClient = (getInsights: () => InsightsType) => createClient({
    requestInterceptors: [
        getRefreshAuthTokenInterceptor(getInsights)
    ]
});
