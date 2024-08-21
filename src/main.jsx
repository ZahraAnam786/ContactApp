import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root, {Loader as rootLoader, Action as rootAction} from './routes/root.jsx'
import Contact, {Loader as contactLoader, Action as contactAction } from './Components/contact.jsx'
import ErrorPage from './Components/error-page.jsx'
import { createBrowserRouter ,RouterProvider} from "react-router-dom";
import EditContact, {Action as editAction} from './routes/edit.jsx'
import { Action as destroyAction } from './routes/destroy.jsx'
import SideDashboard from './routes/sideDashboard.jsx'


//create Objects routes 
const router = createBrowserRouter([
  {
    path: "/",   //Select Root by default
    element: <Root/>,  //Select Root by default
    errorElement: <ErrorPage />, // if page not found so error page render
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <SideDashboard/>},
          {
            path: "contacts/:contactId",  //root component have contacts Component and wirte outlet where we want to display
            element: <Contact />,
            loader: contactLoader,
            action: contactAction
          },
          {
            path: "contacts/:contactId/edit",  //root component have contacts Component and wirte outlet where we want to display
            element: <EditContact />,
            loader: contactLoader,
            action: editAction
          },
          {
            path: "contacts/:contactId/destroy",  //root component have contacts Component and wirte outlet where we want to display
            action: destroyAction,                  //in this route only action can perform
            errorElement: <div>Oops! There was an error.</div>
          }
         
        ],
      }]
   
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)


//This is jsx routes many people use it .There is no functional difference between JSX or objects when configuring your routes, it's simply a stylistic preference.

// import {
//   createRoutesFromElements,
//   createBrowserRouter,
//   Route,
// } from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route
//       path="/"
//       element={<Root />}
//       loader={rootLoader}
//       action={rootAction}
//       errorElement={<ErrorPage />}
//     >
//       <Route errorElement={<ErrorPage />}>
//         <Route index element={<Index />} />
//         <Route
//           path="contacts/:contactId"
//           element={<Contact />}
//           loader={contactLoader}
//           action={contactAction}
//         />
//         <Route
//           path="contacts/:contactId/edit"
//           element={<EditContact />}
//           loader={contactLoader}
//           action={editAction}
//         />
//         <Route
//           path="contacts/:contactId/destroy"
//           action={destroyAction}
//         />
//       </Route>
//     </Route>
//   )
// );
