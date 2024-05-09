import TopBar from '../TopBar';
import BottomBar from '../BottomBar';
import { Outlet } from "react-router-dom";

export default function BarsWrapper () {
  return (
    <>
      <TopBar />
      <Outlet />
      <BottomBar />
    </>
  )
};