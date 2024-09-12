import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSummary } from "../api/get-summary";
import dayjs from "dayjs";
import ptBR from 'dayjs/locale/pt-br'
import { PendingGoals } from "./pending-goals";
import { removeGoalCompletion } from "../api/remove-goal-completion";

dayjs.locale(ptBR)

export function Summary() {

  const queryClient = useQueryClient()

  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, //60 seconds
  })

  if (!summary) return

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = Math.round(summary.completed * 100 / summary.total)

  const handleRemoveGoalCompletion = async (goalCompletionId: string) => {
    await removeGoalCompletion(goalCompletionId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className='size-4' />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">
              {summary?.completed}
            </span>
            {' de '}
            <span className="text-zinc-100">
              15
            </span>
            {' '}metas nessa semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>
        {Object.entries(summary.goalsPerDay).map(([date, goals]) => {

          const dayOfWeek = dayjs(date).format('dddd')
          const dayOfMonth = dayjs(date).format('DD [de] MMMM')

          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium capitalize">
                {dayOfWeek}{' '}
                <span className="text-zinc-400 text-xs lowercase">
                  {dayOfMonth}
                </span>
              </h3>
              <ul className="flex flex-col gap-3">
                {goals.map(goal => {

                  const hourOfDay = dayjs(goal.completedAt).format('HH:mm[h]')

                  return (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou{' '}"
                        <span className="text-zinc-100">
                          {goal.title}</span>
                        "{' às '}
                        <span className="text-zinc-100">
                          {hourOfDay}
                        </span>
                      </span>
                      <button
                        type="button"
                        className="text-xs underline text-zinc-500"
                        onClick={() => handleRemoveGoalCompletion(goal.id)}
                      >
                        Desfazer
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}