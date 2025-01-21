import { Outlet } from "react-router-dom";

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <br></br>
      <Outlet></Outlet>
    </div>
  )
}

export default EventPage;