import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetails";
import FavoriteMovies from "./pages/FavoriteMovies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Movies />,
      },
      { path: "movies/:id", element: <MovieDetail /> },
      { path: "/favorites", element: <FavoriteMovies /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
