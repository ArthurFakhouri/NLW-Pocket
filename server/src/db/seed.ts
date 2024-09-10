import dayjs from "dayjs"
import { client, db } from "."
import { goalCompletions, goals } from "./schema"

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const newGoalList = await db.insert(goals).values([
    {
      title: 'Acordar cedo',
      desiredWeeklyFrequency: 5,
    },
    {
      title: 'Me exercitar',
      desiredWeeklyFrequency: 1,
    },
    {
      title: 'Praticar violão',
      desiredWeeklyFrequency: 7,
    },
  ]).returning()

  const startWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    {
      goalId: newGoalList[0].id,
      createdAt: startWeek.toDate(),
    },
    {
      goalId: newGoalList[1].id,
      createdAt: startWeek.add(1, 'day').toDate(),
    },
  ])
}

seed().finally(() => {
  client.end()
})