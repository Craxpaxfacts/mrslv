import React from 'react';
import { IoHomeOutline, IoVideocamOutline, IoCameraOutline, IoShareSocialOutline, IoHeartOutline } from 'react-icons/io5';
import './GradientMenu.css';

const menuItems = [
  { title: 'Home', icon: <IoHomeOutline />, gradientFrom: '#a955ff', gradientTo: '#ea51ff' },
  { title: 'Video', icon: <IoVideocamOutline />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED' },
  { title: 'Photo', icon: <IoCameraOutline />, gradientFrom: '#FF9966', gradientTo: '#FF5E62' },
  { title: 'Share', icon: <IoShareSocialOutline />, gradientFrom: '#80FF72', gradientTo: '#7EE8FA' },
  { title: 'Tym', icon: <IoHeartOutline />, gradientFrom: '#ffa9c6', gradientTo: '#f434e2' }
];

export default function GradientMenu() {
  return (
    <div className="gradient-menu-wrapper">
      <ul className="gradient-menu-list">
        {menuItems.map(({ title, icon, gradientFrom, gradientTo }, idx) => (
          <li
            key={idx}
            style={{ ['--gradient-from']: gradientFrom, ['--gradient-to']: gradientTo }}
            className="gradient-menu-item"
          >
            <span className="gmi-bg" />
            <span className="gmi-blur" />

            <span className="gmi-icon">
              <span className="gmi-icon-inner">{icon}</span>
            </span>

            <span className="gmi-title">{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}








