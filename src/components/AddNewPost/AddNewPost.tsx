import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

export const AddNewPost = ({ refetch }: { refetch: () => void }) => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const handleNewPost = async ({ post }: { post: string }) => {
    if (!post.length) return;

    const newPost = {
      post,
      reacts: [],
      time: new Date(),
      user: { name: user?.displayName, email: user?.email },
    };

    try {
      const res = await axios.post(
        'https://humbird-server.vercel.app/posts',
        newPost
      );

      if (res?.data?.acknowledged) {
        toast.success('Posted successfully!');
        reset();
        refetch();
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  return (
    <form
      className="w-full my-5 md:max-w-lg"
      onSubmit={handleSubmit(handleNewPost)}>
      <textarea
        className="bg-dark-400 resize-none rounded-md w-full h-36 p-4 text-lg mb-3 focus:outline-none focus:outline-accent-400"
        placeholder="What's on your mind?"
        {...register('post', {
          required: true,
        })}
      />
      <button className="bg-accent-400 hover:bg-accent-500 font-bold text-xl px-6 py-2 rounded-md text-dark-500">
        Submit Post
      </button>
    </form>
  );
};
