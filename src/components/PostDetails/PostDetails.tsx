import axios from 'axios';
import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import format from 'date-fns/format';
import { useAuth } from '../../hooks/useAuth';
import { BounceLoader } from 'react-spinners';
import {
  AiFillHeart,
  AiFillDelete,
  AiFillEdit,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from 'react-icons/ai';

export const PostDetails = () => {
  const { user: currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef<HTMLTextAreaElement | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: postData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['postData'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/posts/${id}`);
      return res.data;
    },
  });

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

  if (isLoading) {
    return (
      <div className="h-screen grid place-content-center">
        <BounceLoader color="#1eb2e8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen grid place-content-center">
        <p className="text-3xl text-red-500">Something went wrong.</p>
      </div>
    );
  }

  const { post, reacts, user, time } = postData;

  const handleReaction = async () => {
    if (!currentUser?.uid) {
      return toast.error('Signin to react on this post.');
    }

    try {
      const res = await axios.patch(
        `http://localhost:3000/posts?id=${id}&email=${currentUser?.email}`
      );

      if (res?.data?.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    const updatedPost = editRef?.current?.value;

    if (!updatedPost?.length || updatedPost === post) {
      return setIsEditing(false);
    }

    try {
      const res = await axios.put(`http://localhost:3000/posts/${id}`, {
        updatedPost,
      });

      if (res?.data?.modifiedCount > 0) {
        toast.success('Post updated successfully');
        refetch();
      }
    } catch (error) {
      toast.success('Something went wrong');
      console.log(error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/posts?id=${id}`);

      if (res?.data?.deletedCount > 0) {
        toast.success('Post deleted successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  return (
    <section className="container pt-20 md:pt-28">
      <div className="flex justify-between">
        <div className="space-y-1 mb-5">
          <p className="text-2xl font-bold">{user.name}</p>
          <p className="italic text-xl">{user.email}</p>
          <p>{format(new Date(time), 'd MMMM yyyy')}</p>
        </div>
        <div className="flex text-4xl gap-3">
          {isEditing ? (
            <>
              <button onClick={() => setIsEditing(false)}>
                <AiFillCloseCircle />
              </button>
              <button onClick={handleEdit}>
                <AiFillCheckCircle />
              </button>
            </>
          ) : (
            <>
              <button
                className="flex items-center gap-1"
                onClick={handleReaction}>
                <span className="font-semibold">{reacts.length}</span>
                <AiFillHeart
                  className={
                    reacts.includes(currentUser.email) ? 'text-accent-400' : ''
                  }
                />
              </button>
              {(currentUser?.email === user?.email || userData?.isAdmin) && (
                <button onClick={handleDelete}>
                  <AiFillDelete className="text-red-500" />
                </button>
              )}
              {currentUser?.email === user?.email && (
                <button onClick={() => setIsEditing(true)}>
                  <AiFillEdit />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <textarea
          className="w-full lg:w-[35rem] h-56 bg-dark-400 text-lg resize-none p-4 rounded-md"
          ref={editRef}
          defaultValue={post}></textarea>
      ) : (
        <p className="lg:w-[35rem] text-lg">{post}</p>
      )}
    </section>
  );
};
