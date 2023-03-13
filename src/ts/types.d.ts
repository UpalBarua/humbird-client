interface IPost {
  _id: string;
  post: string;
  reacts: string[];
  time: {};
  user: { name: string; email: string };
}
