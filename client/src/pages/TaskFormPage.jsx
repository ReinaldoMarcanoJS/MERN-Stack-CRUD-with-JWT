import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { Button, Input, Label, Textarea } from "../components/ui";
import { useNavigate, useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
function TaskFormPage() {
  dayjs.extend(utc)
  const { register, handleSubmit, setValue } = useForm()
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function LoadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue('title', task.title)
        setValue('description', task.description)
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
      }
    }

    LoadTask()
  }, [])


  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs(data.date).utc().format() : dayjs.utc().format(),
    }
    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    navigate('/tasks')
  })



  return (
    <div className='my-40 mx-auto bg-zinc-800 max-w-md w-full rounded-md'>
      <form onSubmit={onSubmit}>
        <Label>Title</Label>
        <Input type='text' placeholder='Title'
          {...register('title')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          autoFocus
        />

        <Label>Description</Label>
        <Textarea rows={"3"} placeholder="Description"
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'

          {
          ...register("description")
          }></Textarea>
        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        <Button>Save</Button>
      </form>
    </div>
  )
}

export default TaskFormPage