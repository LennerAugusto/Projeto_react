import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { USER_PHOTO } from '../../config/Config';

const Header = ({ isToogle }) => {
  const [toggled, setToggled] = useState(false);

  const toogleClik = () => {
    setToggled(!toggled);
    isToogle(toggled);
  };

  return (
    <Fragment>
      <header className="app-header">
        <div className="app-leftarea">
          <h3>
            SISTEMA<span>IFSP</span>
          </h3>
        </div>
        <div className="app-toggle">
          <i id="_toggle">
            <FaIcons.FaBars />
          </i>
        </div>
        <div className="profile">
          <img src={USER_PHOTO} width={40} height={40} alt="foto" className="rounded-circle" />
          <span>Lenner Augusto</span>
          <div className="logout">
            <i>
              <FaIcons.FaSignOutAlt />
            </i>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
