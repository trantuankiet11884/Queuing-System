import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { useState } from "react";
import CapSoThongBao from "./Notifycation";

interface State {
  label: string;
}

const HeaderPage = (props: State) => {
  const { label } = props;

  const data = useSelector((state: RootState) => state.account.currentAccount);
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(!showComponent);
  };

  return (
    <>
      <Header
        style={{
          background: "#f6f6f6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="">{label}</div>
        <div className="navbar-nav flex-row">
          <div
            className="nav-item dropdown d-none d-md-flex me-1 p-custom bell"
            onClick={handleClick}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="16" fill="#FFF2E7" />
              <path
                d="M22.1167 18.0753L21.2833 16.692C21.1083 16.3837 20.95 15.8003 20.95 15.4587V13.3503C20.95 11.392 19.8 9.70033 18.1417 8.90866C17.7083 8.14199 16.9083 7.66699 15.9917 7.66699C15.0833 7.66699 14.2667 8.15866 13.8333 8.93366C12.2083 9.74199 11.0833 11.417 11.0833 13.3503V15.4587C11.0833 15.8003 10.925 16.3837 10.75 16.6837L9.90833 18.0753C9.57499 18.6337 9.49999 19.2503 9.70833 19.817C9.90833 20.3753 10.3833 20.8087 11 21.017C12.6167 21.567 14.3167 21.8337 16.0167 21.8337C17.7167 21.8337 19.4167 21.567 21.0333 21.0253C21.6167 20.8337 22.0667 20.392 22.2833 19.817C22.5 19.242 22.4417 18.6087 22.1167 18.0753Z"
                fill="#FFAC6A"
              />
              <path
                d="M18.3584 22.6753C18.0084 23.642 17.0834 24.3337 16 24.3337C15.3417 24.3337 14.6917 24.067 14.2334 23.592C13.9667 23.342 13.7667 23.0087 13.65 22.667C13.7584 22.6837 13.8667 22.692 13.9834 22.7087C14.175 22.7337 14.375 22.7587 14.575 22.7753C15.05 22.817 15.5334 22.842 16.0167 22.842C16.4917 22.842 16.9667 22.817 17.4334 22.7753C17.6084 22.7587 17.7834 22.7503 17.95 22.7253C18.0834 22.7087 18.2167 22.692 18.3584 22.6753Z"
                fill="#FFAC6A"
              />
            </svg>
          </div>

          {showComponent && (
            <div className="notification-components">
              <CapSoThongBao />
            </div>
          )}

          <div className="nav-item dropdown pt-4">
            <div
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
              aria-expanded="false"
            >
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                alt="avatar"
                width={40}
                height={40}
              />
              <div className="d-none d-xl-block ps-2">
                <div className="mt-1 small text-muted">Xin chao</div>
                <div className="mt-1 text-user">{data?.hvten}</div>
              </div>
            </div>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <Link to="/" className="dropdown-item">
                Status
              </Link>
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
              <Link to="/" className="dropdown-item">
                Feedback
              </Link>
              <div className="dropdown-divider" />
              <Link to="/" className="dropdown-item">
                Settings
              </Link>
              <Link to="/" className="dropdown-item">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </Header>
    </>
  );
};

export default HeaderPage;
