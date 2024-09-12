import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./ui/radio-group";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoal } from "../api/create-goal";
import { useQueryClient } from "@tanstack/react-query";

const createGoalSchema = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalType = z.infer<typeof createGoalSchema>

export function CreateGoal() {

  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGoalType>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      desiredWeeklyFrequency: 1,
    }
  })

  async function handleCreateGoal(data: CreateGoalType) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

    reset()
  }

  return (
    <DialogContent>
      <div className='flex flex-col gap-6 h-full'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className='size-5 text-zinc-600' />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar praticando toda semana.
          </DialogDescription>
        </div>
        <form onSubmit={handleSubmit(handleCreateGoal)} className='flex-1 flex flex-col justify-between'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='title'>Qual a atividade?</Label>
              <Input
                id='title'
                autoFocus
                placeholder='Praticar exercícios, meditar, etc...'
                {...register('title')}
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor=''>Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                render={({ field }) => {
                  return (
                    <RadioGroup value={`${field.value}`} onValueChange={field.onChange}>
                      <RadioGroupItem value='1'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>1x na semana</span>
                        <span className='text-lg leading-none'>🥱</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='2'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>2x na semana</span>
                        <span className='text-lg leading-none'>🙂</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='3'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>3x na semana</span>
                        <span className='text-lg leading-none'>😎</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='4'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>4x na semana</span>
                        <span className='text-lg leading-none'>😜</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='5'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>5x na semana</span>
                        <span className='text-lg leading-none'>🤨</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='6'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>6x na semana</span>
                        <span className='text-lg leading-none'>🤯</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='7'>
                        <RadioGroupIndicator />
                        <span>Todos dias da semana</span>
                        <span className='text-lg leading-none'>🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>
          <div className='flex items-center gap-3 [&>button]:flex-1'>
            <DialogClose asChild>
              <Button variant='secondary'>Fechar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}