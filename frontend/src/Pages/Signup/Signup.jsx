import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo ={
      email:data.email,
      password:data.password
    }
    await axios.post("http://localhost:4001/user/signup", userInfo)  //this stores that userinfo variable in our database
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        toast.success("SignUp Successful");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      }
    }).catch((error)=>{
      if(error.response){
        console.log(error);
        toast.error("Error: "+ error.response.data.message);
      }
    })
  }
  return (
    <>
      <div className="bg-white">
        <div className="dark:bg-[#04060B] flex h-screen items-center justify-center">
          <div className="pl-3 md:scale-135 h-[450px] w-[450px]">
            <div className="modal-box dark:bg-gray-800">
              <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <Link
                  to="/"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  ✕
                </Link>

                <h3 className="font-bold text-lg">Sign-Up</h3>
                <h1>These Credentials will be used for Login</h1>
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
                    placeholder="Set new Password"
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
                <div className="flex pl-24 mt-4">
                  <button className=" ml-8 bg-cyan-400 text-white rounded-md px-3 py-1 hover:bg-cyan-600 duration-200">
                    SignUp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
