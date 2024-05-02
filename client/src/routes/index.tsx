import RootLayout from "../layouts/rootLayout/RootLayout";
import CreateEventPage from "../pages/createEvent/CreateEvent";
import EventsPage from "../pages/event/event";
import SignIn from "../pages/signin/Singin";
import SignUp from "../pages/singup/Singup";
import Private from "../components/routes/Private";
import LoggedIn from "../components/routes/LoggedIn";
import UpdateEventPage from "../pages/updateEvent/updateEvent";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <LoggedIn />,
        children: [
          {
            path: "sign-in",
            element: <SignIn />,
          },
          {
            path: "sign-up",
            element: <SignUp />,
          },
        ],
      },

      {
        element: <Private />,
        children: [
          {
            index: true,
            element: <EventsPage />,
          },
          {
            path: "create-event-page",
            element: <CreateEventPage />,
          },
          {
            path: "update-event-page/:id",
            element: <UpdateEventPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
