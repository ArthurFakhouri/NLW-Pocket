import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { removeGoalCompletion } from "../../functions/remove-goal-completion";

export const removeCompletionRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete('/completions', {
    schema: {
      body: z.object({
        goalCompletionId: z.string(),
      }),
    }
  }, async (req) => {

    const {
      goalCompletionId,
    } = req.body

    return await removeGoalCompletion({
      goalCompletionId,
    })
  })
}