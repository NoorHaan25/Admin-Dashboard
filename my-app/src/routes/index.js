import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Team from "../pages/Team";
import ToDoList from "../pages/ToDoList";
import Bar from "../pages/Bar";
import Geography from "../pages/Geography";
import FAQ from "../pages/FAQ";
import Calendar from "../pages/Calendar";
import Line from "../pages/Line";
import Pie from "../pages/Pie";
import Form from "../pages/Form";
import StickyNotes from "../pages/Contacts";
export const routes =createBrowserRouter([
  
  {
    path: '/',
    element:<AdminLayout/>,
    errorElement:<h1>errorElement</h1>,
    children:[
      {
        path:'/',
        element:<Dashboard/>,
      },
      {
        path:'team',
        element:<Team/>,
      },
      {
        path:'StickyNotes',
        element:< StickyNotes/>,
      },
      {
        path:'todoList',
        element:<ToDoList/>,
      },
      {
        path:'form',
        element:<Form/>,
      },
      {
        path:'calendar',
        element:<Calendar/>,
      },
      {
        path:'faq',
        element:<FAQ/>,
      },
      {
        path:'bar',
        element:<Bar/>,
      },
      {
        path:'pie',
        element:<Pie/>,
      },
      {
        path:'line',
        element:<Line/>,
      },
      {
        path:'geography',
        element:<Geography/>,
      }
    ]
  }
])