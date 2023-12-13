import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import HomePage from "../Page/Home";
import LoginPage from "../Page/LoginPage";
import { Post } from "../components/post";
import ListBlogger from "../components/listBlogger";
import ErrorPage from "../Page/error-page";
import WordFileUploader from "../components/readFile";
import ListPostById from "../components/listPostById";
import { getAccessTokenFromCookie } from "../components/cookies";
import axios from "axios";


async function checkLogin() {
  var loginIn = false;

  try {
    await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
      headers: {
        Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        Accept: 'application/json'
      }
    });

    loginIn = true;
  } catch (e) {
    loginIn = false;
  }

  if (!loginIn) {
    return redirect("/login")
  }

  return null;
}

export const routerMain = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: checkLogin,
    children: [
      {
        index: true,
        element: <ListBlogger />
      },
      {
        path: "post/:idBlog/:idPost",
        element: <Post />
      },
      {
        path: "listPost/:id",
        element: <ListPostById />
      },
      {
        path: "addPost/:id",
        element: <WordFileUploader />
      },

    ],
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
])