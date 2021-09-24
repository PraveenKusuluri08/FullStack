import Read from "./components/Read/components/Read"
import Create from "./components/Create/components/Create"
const routes =[
  {
    path:"/dashBoard/read",
    component:Read,
    componentName:"ReadBlogs"
  },
  {
    path:"/dashboard/create",
    component:Create,
    componentName:"CreateBlogs"
  }
]

export default routes