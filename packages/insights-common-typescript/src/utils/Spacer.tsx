import {
    global_spacer_xs,
    global_spacer_sm,
    global_spacer_md,
    global_spacer_lg,
    global_spacer_xl,
    global_spacer_2xl,
    global_spacer_3xl,
    global_spacer_form_element
} from '@patternfly/react-tokens';

type Keys = 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'XL_2' | 'XL_3' | 'FORM_ELEMENT';

type RawSpacerTemplate<T> = {
    [key in Keys]: T
};

/**
 * @deprecated Sizes, use @patternfly/react-token.
 */
const RawSpacer: RawSpacerTemplate<string> = {
    XS: global_spacer_xs.value,
    SM: global_spacer_sm.value,
    MD: global_spacer_md.value,
    LG: global_spacer_lg.value,
    XL: global_spacer_xl.value,
    XL_2: global_spacer_2xl.value,
    XL_3: global_spacer_3xl.value,
    FORM_ELEMENT: global_spacer_form_element.value
};

export const Spacer: Readonly<typeof RawSpacer> = RawSpacer;
