import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import img from '../../assets/images/auth-img.svg';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export const Signup = () => {
  const { createUser, googleSignUp } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const handleSignup = async ({
    name,
    email,
    password,
    ...data
  }: {
    name: string;
    email: string;
    password: string;
    password2: string;
  }) => {
    try {
      const res = await createUser(email, password);

      if (res?.user?.uid) {
        await axios.post('http://localhost:3000/users', {
          email,
        });

        toast.success('Account created successfully!');
        reset();
      }
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        return toast.error('Account already exists.');
      }

      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const res = await googleSignUp();

      if (res?.user?.uid) {
        await axios.post('http://localhost:3000/users', {
          email: res?.user?.email,
        });

        console.log(res?.user?.email);

        toast.success('Account created successfully!');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  return (
    <section className="container pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 items-center py-8">
        <img className="p-14 hidden lg:block" src={img} alt="" />
        <div>
          <h2 className="text-4xl font-secondary font-bold text-center mb-2">
            Welcome to <span className="text-accent-400">HumBird</span>
          </h2>
          <p className="text-xl text-light-500 px-14 text-center max-w-sm mx-auto">
            Create a new account. or{' '}
            <Link className="text-accent-400" to="/signin">
              Sign in
            </Link>{' '}
            if you already have a account.
          </p>
          <form
            className="p-5 grid gap-6 max-w-md mx-auto"
            onSubmit={handleSubmit(handleSignup)}>
            <div className="grid gap-2">
              <label>Name</label>
              <input
                className="p-3 bg-dark-500 border-2 border-gray-400 rounded-md focus:outline-0 focus:border-accent-300"
                type="text"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <label>Email Address</label>
              <input
                className="p-3 bg-dark-500 border-2 border-gray-400 rounded-md focus:outline-0 focus:border-accent-300"
                type="text"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Email is not valid.',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <label>Password</label>
              <input
                className="p-3 bg-dark-500 border-2 border-gray-400 rounded-md focus:outline-0 focus:border-accent-300"
                type="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message:
                      'Needs to have minimum eight characters, at least one letter and one number',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <label>Retype Password</label>
              <input
                className="p-3 bg-dark-500 border-2 border-gray-400 rounded-md focus:outline-0 focus:border-accent-300"
                type="password"
                {...register('password2', {
                  required: {
                    value: true,
                    message: 'Retyping password is required',
                  },
                  validate: (value: string) => {
                    if (watch('password') !== value) {
                      return 'Passwords do not match';
                    }
                  },
                })}
              />
              {errors.password2 && (
                <p className="text-red-400 text-sm">
                  {errors.password2.message}
                </p>
              )}
            </div>
            <button className="bg-accent-400 hover:bg-accent-500 text-xl py-3 font-bold text-dark-500 rounded-md capitalize">
              signup
            </button>
          </form>
          <p className="flex items-center justify-center text-xl gap-2 text-center">
            Or signup using{' '}
            <button
              className="flex items-center capitalize bg-dark-300 font-semibold gap-2 px-3 py-2  rounded-3xl"
              onClick={handleGoogleSignup}>
              {<FcGoogle />}
              <span>google</span>
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
