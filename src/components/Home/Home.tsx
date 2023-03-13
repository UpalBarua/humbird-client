import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { AddNewPost } from '../AddNewPost/AddNewPost';
import { BounceLoader } from 'react-spinners';
import { PostCard } from '../PostCard/PostCard';

export const Home = () => {
  const { user } = useAuth();
  const [sort, setSort] = useState<'date' | 'reacts'>('date');

  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios('https://humbird-server.vercel.app/posts');
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

  return (
    <section className="space-y-10 container py-3">
      {user?.uid ? (
        <div>
          <h2 className="capitalize text-3xl font-bold font-secondary pb-5">
            Add new post
          </h2>
          <AddNewPost refetch={refetch} />
        </div>
      ) : (
        <h2 className="capitalize text-2xl font-bold font-secondary mt-5">
          <Link className="text-accent-400" to="signin">
            Sign In
          </Link>{' '}
          to add new posts
        </h2>
      )}
      <div>
        <h2 className="capitalize text-3xl font-bold font-secondary mb-6">
          Posts
        </h2>
        <div className="grid grid-cols-1 pb-20 lg:pb-28 md:grid-cols-2 gap-5 md:gap-6">
          {posts?.map((post: IPost) => (
            <PostCard key={post._id} {...post} refetch={refetch} />
          ))}
        </div>
      </div>
    </section>
  );
};
