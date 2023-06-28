import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";

interface State {
  label: string;
}

const HeaderPage = (props: State) => {
  const { label } = props;
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
          <div className="nav-item dropdown d-none d-md-flex me-1 p-custom">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
          </div>

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
                <div className="mt-1 text-user">Tran Tuan Kiet</div>
              </div>
            </div>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <Link to="/" className="dropdown-item">
                Status
              </Link>
              <Link to="/" className="dropdown-item">
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
