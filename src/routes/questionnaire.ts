import express from "express";
import QuestionnaireService from "@modules/questionnaire/questionnaires.service";

const router = express.Router();

router.get("/published", async (req, res) => {
  try {
    if (req.query.qid) {
      const id: number = parseInt(req.query.qid as string);
      const questionnaire = await QuestionnaireService.getPublishById(id);

      res.json({ success: true, questionnaire });
    } else {
      res.json({ success: false, msg: "Error: Missing questionnaire id" });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.json({ success: false, msg: error.message });
  }
});

export default router;
