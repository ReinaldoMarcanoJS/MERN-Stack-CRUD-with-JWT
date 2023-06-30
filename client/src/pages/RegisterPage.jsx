import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth.js";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })
    return (
        <div className="flex flex-col  h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <div>
                    {
                        registerErrors.map((error, i) => (
                            <div className="bg-red-500 p-2 rounded-md" key={i}>
                                <p>
                                    {error}
                                </p>
                            </div>
                        ))
                    }
                    <h1>Register</h1>
                    <form action="" onSubmit={onSubmit}>
                        <input type="text" {...register("username", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Username"
                        />
                        {
                            errors.username && (<p className="text-red-500">Username is required</p>)
                        }
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
                        <button type="submit">
                            Register
                        </button>
                    </form>

                    <p className="flex gap-x-2 justify-between">
                        already have an account? <Link to={'/login'} className="text-sky-500">Sign up</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default RegisterPage