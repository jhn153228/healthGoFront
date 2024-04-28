import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../assets/logo.svg';
import { deleteAccessToken, getAccessToken } from '../utils/AxiosInstance';
import './AppLayout.scss';

function AppLayout({ children, sidebar }) {
  const navigate = useNavigate();
  const jwtToken = getAccessToken()?.length > 0;

  const menuItems = [
    {
      key: 'Home',
      label: 'Home',
    },
    {
      key: 'about',
      label: 'About',
    },
    {
      key: 'routine',
      label: '루틴',
    },
    jwtToken
      ? {
          key: 'accounts/logout',
          label: 'LogOut',
        }
      : {
          key: 'accounts/login',
          label: 'Login',
        },
    !jwtToken
      ? {
          key: 'accounts/signup',
          label: 'SignUp',
        }
      : null,
  ];

  const onClick = (e) => {
    if (e.key === 'accounts/logout') {
      deleteAccessToken();
      navigate('/home');
      window.location.reload();
    } else {
      navigate('/' + e.key);
    }
  };
  return (
    <div className='app'>
      <div className='header'>
        <h1 className='page-title'>
          <img src={LogoImage} alt='logo' style={{ width: 150 }} />
        </h1>
        <div className='topnav'>
          <Menu
            mode='horizontal'
            items={menuItems}
            onClick={onClick}
            style={{}}
          />
        </div>
      </div>

      <div className='contents'>{children}</div>
      <div className='sidebar'>{sidebar}</div>
      <div className='footer'>2024 JHN_153228</div>
    </div>
  );
}

export default AppLayout;
