import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios.post("http://localhost:4001/user/login", userInfo) //this stores that userinfo variable in our database
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Login Successful");
          document.getElementById("my_modal_3").close();
          
          setTimeout(() => {    
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
          }, 900);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          toast.error("Error: " + error.response.data.message);
          setTimeout(()=>{},1000);
        }
      });
  };

  return (
    <div className="dark:text-white">
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-slate-900 border-4 border-[#DBD0C7]/50 dark:border-cyan-500/50">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link
              to="/"
              className="btn btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-2xl">Login</h3>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <span>Email ID:</span>
              <br />
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-80 px-3 py-1 border rounded-md outline-none dark:text-[#000000]"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500 ml-2">
                  This field is required
                </span>
              )}
            </div>
            {/* Password */}
            <div className="mt-4 space-y-2">
              <span>Password:</span>
              <br />
              <input
                type="text"
                placeholder="Enter your Password"
                className="w-80 px-3 py-1 border rounded-md outline-none dark:text-[#000000]"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500 ml-2">
                  This field is required
                </span>
              )}
            </div>
            {/* Button */}
            <div className="flex justify-around mt-4">
              <button className=" ml-8 bg-cyan-400 text-white rounded-md px-3 py-1 hover:bg-cyan-600 duration-200">
                Login
              </button>
              <p>
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>{" "}
                If not Registered{" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default login;
