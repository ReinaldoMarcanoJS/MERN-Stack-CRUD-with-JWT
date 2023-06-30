import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate()
  const { signin, errors: signinErrors, isAuthenticated } = useAuth()

  const onSubmit = handleSubmit(data => {
    signin(data)
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks")
    }
  }, [isAuthenticated])
  return (
    <div className="flex flex-col  h-[calc(100vh-100px)] items-center justify-center ">

      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {
          signinErrors.map((error, i) => (
            <div className=" bg-red-500 p-2 my-2  rounded-md" key={i}>
              <p>
                {error}
              </p>
            </div>
          ))
        }

        <form action="" onSubmit={onSubmit}>

          <input type="email" {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email@email.com"

          />
          {
            errors.email && (<p className="text-red-500">email is required</p>)
          }
          <input type="password" {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="password"

          />
          {
            errors.password && (<p className="text-red-500">password is required</p>)
          }
          <button className="bg-zinc-700 rounded-md px-4" type="submit">
            Login
          </button>
        </form>


        <p className="flex gap-x-2 justify-between">
          Don't have an account? <Link to={'/register'} className="text-sky-500">Sign up</Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage