type GoalsPerDay = Record<string, {
  id: string
  title: string
  completedAt: string
}[]>

type SummaryProps = {
  completed: number
  total: number
  goalsPerDay: GoalsPerDay
}

export async function getSummary(): Promise<SummaryProps> {
  const response = await fetch('http://localhost:3333/summary')
  const data = await response.json()

  return data.summary
}