import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import img from '../../assets/images/auth-img.svg';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';

export const Signin = () => {
  const { signIn, googleSignUp } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignin = async ({
    email,
    password,
    ...data
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await signIn(email, password);
      if (res?.user?.uid) {
        toast.success('Signed in successfully!');
        reset();
      }
    } catch (error) {
      if (error?.message === 'Firebase: Error (auth/user-not-found).') {
        return toast.error('Account does not exist.');
      }

      toast.error('something went wrong');
      console.log(error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const res = await googleSignUp();
      if (res?.user?.uid) {
        toast.success('Signed in successfully!');
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
          <h2 className="text-4xl font-secondary font-bold text-center mb-2"></h2>
          {/* Welcome Back to <span className="text-accent-400">HumBird</span> */}
          <p className="text-xl text-light-500 px-14 text-center max-w-sm mx-auto">
            Sign In to your account. or{' '}
            <Link className="text-accent-400" to="/signup">
              Sign Up
            </Link>{' '}
            if you don't have an account
          </p>
          <form
            className="p-5 grid gap-6 max-w-md mx-auto"
            onSubmit={handleSubmit(handleSignin)}>
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
                })}
              />
              {errors.password && (
                <p className="text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="bg-accent-400 hover:bg-accent-500 text-xl py-3 font-bold text-dark-500 rounded-md capitalize">
              sign in
            </button>
          </form>
          <p className="flex items-center justify-center text-xl gap-2 text-center">
            Or sign in using{' '}
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
