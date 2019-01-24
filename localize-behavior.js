import '@polymer/polymer/polymer-legacy.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';
/* eslint-disable */
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.SequenceNavigator = window.D2L.PolymerBehaviors.SequenceNavigator || {};

/**
* THIS FILE IS GENERATED. RUN `npm run locales` TO REGENERATE.
* Localizes the d2l-sequence-navigator component.
* @polymerBehavior LocalizeBehavior
*/
const LocalizeBehaviorImpl = {
properties: {
/**
* Localization resources.
*/
resources: {
value: function () {
return {"ar":{},"de":{},"en":{"countStatus":"{completed}/{total}","completedMofN":"Completed {completed}/{total}","requirementsCompleted":"{completed} of {total} requirements completed","optional":"Optional","exempt":"Exempt","completed":"completed"},"es":{},"fr":{},"ja":{},"ko":{},"nb":{},"nl":{},"pt":{},"sv":{},"tr":{},"zh-TW":{},"zh":{}};
}
}
}
};

/** @polymerBehavior LocalizeBehavior */
export const LocalizeBehavior = [
D2L.PolymerBehaviors.LocalizeBehavior,
LocalizeBehaviorImpl
];
