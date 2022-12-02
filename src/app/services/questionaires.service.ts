import prisma from '../../prisma-client';
import { IQuestionnaire, Questionnaire, QuestionnaireEditable } from '../../types'

const QuestionnaireService: IQuestionnaire = {
  create: async(questionnaire: QuestionnaireEditable, userId: number | undefined): Promise<Questionnaire | Error> => {
    try{
      if(userId){
        const insert: Questionnaire = await prisma.questionnaire.create({
          data: {
            ownerId: userId,
            title: questionnaire.title,
          }
        }) as unknown as Questionnaire

        return insert; 
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