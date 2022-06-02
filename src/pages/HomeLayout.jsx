import { Outlet } from 'react-router-dom';
import {HomeNavbar} from './HomeNavbar';
export const HomeLayout = () => {
  return (
    <div>
			<HomeNavbar />
			<Outlet />
		</div>
  )
}
