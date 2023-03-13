import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import format from 'date-fns/format';
import { AiFillHeart, AiFillDelete } from 'react-icons/ai';

interface IPostCardProps extends IPost {
  refetch: () => void;
}

export const PostCard = ({
  _id,
  post,
  reacts,
  user,
  time,
  refetch,
}: IPostCardProps) => {
  const { user: currentUser } = useAuth();

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!currentUser?.email) return;

      const res = await axios.get(
        `http://localhost:3000/users/${currentUser?.email}`
      );
      return res.data;
    },
  });

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/posts?id=${_id}`);

      if (res?.data?.deletedCount > 0) {
        toast.success('Post deleted successfully');
        refetch();
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  const handleReaction = async () => {
    if (!currentUser?.uid) {
      return toast.error('Signin to react on this post.');
    }

    try {
      const res = await axios.patch(
        `http://localhost:3000/posts?id=${_id}&email=${currentUser?.email}`
      );

      if (res?.data?.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-dark-400 p-5 rounded-md shadow-2xl">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-light-500">{user.email}</p>
        </div>
        <div className="flex text-3xl gap-3">
          <button className="flex items-center gap-1" onClick={handleReaction}>
            <span className="font-semibold">{reacts.length}</span>
            <AiFillHeart
              className={
                reacts.includes(currentUser.email) ? 'text-accent-400' : ''
              }
            />
          </button>
          {(user.email === currentUser.email || userData?.isAdmin) && (
            <button className="text-red-500" onClick={handleDelete}>
              <AiFillDelete />
            </button>
          )}
        </div>
      </div>
      <Link className="space-y-2" to={`/post/${_id}`}>
        <p>{post}</p>
        <p>{format(new Date(time), 'd MMMM yyyy')}</p>
      </Link>
    </div>
  );
};
