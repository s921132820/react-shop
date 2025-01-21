import { Outlet } from "react-router-dom";

function AboutPage() {
  return (
    <div>
      <h4>우리 회사는.</h4>
      <br></br>
      <Outlet></Outlet>
    </div>
  )
}

export default AboutPage;