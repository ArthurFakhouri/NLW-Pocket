import { db } from "../db"
import { goals } from "../db/schema"

type CreateGoalRequest = {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const [newGoal] = await db.insert(goals).values({
    title,
    desiredWeeklyFrequency,
  }).returning()

  return { newGoal }
}