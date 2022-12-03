// Divide query based on domain and merge
const questionnaireQuery = ["createQuestionnaire", "getQuestionnaires", "publishQuestionnaire", "updateQuestionnaire"];
const questionQuery = ["createQuestion"];
export const authQuery = [...questionnaireQuery, ...questionQuery];
