import Posts from "../../views/post/Posts";
import EditPost from "../../views/post/EditPost";
import AddPost from "../../views/post/AddPost";
import ViewPost from "../../views/post/ViewPost";

const post = [
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/edit-post/:id',
    name: 'EditPost',
    component: EditPost
  },
  {
    path: '/add-post/',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/view-post/:id',
    name: 'ViewPost',
    component: ViewPost
  },
]

export default post

