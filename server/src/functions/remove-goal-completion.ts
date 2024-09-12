import { eq } from "drizzle-orm"
import { db } from "../db"
import { goalCompletions } from "../db/schema"

type RemoveGoalCompletion = {
  goalCompletionId: string
}

export async function removeGoalCompletion({
  goalCompletionId,
}: RemoveGoalCompletion) {

  const [deletedGoalCompletion] = await db.delete(goalCompletions)
    .where(eq(goalCompletions.id, goalCompletionId))
    .returning()

  return {
    deletedGoalCompletion,
  }
}