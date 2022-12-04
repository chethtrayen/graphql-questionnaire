// Divide query based on domain and merge
const questionnaireQuery = ["createQuestionnaire", "getQuestionnaires", "publishQuestionnaire", "updateQuestionnaire"];
const questionQuery = ["createQuestion", "deleteQuestion"];
export const authQuery = [...questionnaireQuery, ...questionQuery];
