import { Context, Questionnaire, QuestionnaireEditable } from "../../types";
import questionnaireService from '../services/questionaires.service'

export default {
  Mutation : {
    createQuestionnaire: async (_: never, args: QuestionnaireEditable, context: Context): Promise<Questionnaire| Error> => {
      return await questionnaireService.create(args, context.user?.id)
    } 
  }
}