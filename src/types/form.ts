// TS style for clarity; you can keep using in JS projects.
export const QUESTION_TYPES = ['short','paragraph','mcq','checkbox','dropdown','linear','mcgrid','cbgrid','date','time','file'] as const;

// Firestore collections:
// forms/{formId}
//   meta: { ownerUid, title, desc, isQuiz, settings, theme, createdAt, updatedAt }
//   sections: [ { id, title, desc, shuffle, questions:[Question], branching?: { [questionId]: { answerValue: gotoSectionId } } } ]
//   templates: optional
// responses/{formId}/items/{responseId}
//   { byUid?, email?, answers: { [questionId]: value | value[] }, score?, submittedAt }
