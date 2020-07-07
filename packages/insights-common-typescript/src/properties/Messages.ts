import { DeepReadonly } from 'ts-essentials';

//Capture some strings we reuse. Possibly use in i18n later?
const MutableMessages = {
    components: {
        emailOptIn: {
            title: 'Enable email alerts',
            link: 'Open email preferences'
        },
        errorPage: {
            showDetails: 'Show details'
        }
    }
};

export const Messages: DeepReadonly<typeof MutableMessages> = MutableMessages;
