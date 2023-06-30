import { useEffect } from "react";
import { useTasks } from "../context/TasksContext"
import { TaskCard } from "../components/Tasks/TaskCard";

function TaskPage() {
  const { getTasks, tasks } = useTasks();
  useEffect(() => {
    getTasks()
  }, [])

  if (!tasks.length === 0) return <h1>No tasks</h1>

  return (

    <div className="">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  )

}


export default TaskPage