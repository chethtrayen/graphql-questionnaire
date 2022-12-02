import { Context, IQuestionnaire, Questionnaire, QuestionnaireEditable, QuestionnaireStatus } from '../../types'

const QuestionnaireService: IQuestionnaire = {
  create: async(questionnaire: QuestionnaireEditable, context: Context): Promise<Questionnaire | Error> => {
    try{
      let userId: number;

      if(context.user){
        userId = context.user.id
        return await {title: questionnaire.title, ownerId: userId, id: 2, status: QuestionnaireStatus.PUBLISH}
      }
      else{
        throw new Error('Error: Failed to create group. No user logged in')
      }
    }
    catch(error){
      throw error 
    }
   
  },
  
}

export default QuestionnaireService