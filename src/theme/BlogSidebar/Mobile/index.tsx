import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { NavbarSecondaryMenuFiller } from '@docusaurus/theme-common';
import type { Props } from '@theme/BlogSidebar/Mobile';

function BlogSidebarMobileSecondaryMenu({ sidebar }: Props): JSX.Element {
  const [openItemPermalink, setOpenItemPermalink] = useState<string | null>(null);

  // 当页面加载或路径改变时，检查URL以确定是否有菜单项需要展开
  useEffect(() => {
    const currentPath = window.location.pathname;
    // 逻辑来确定是否需要根据当前URL展开某个菜单项
    // 这里简化处理：如果sidebar.items中有项的permalink与当前路径匹配，则展开它
    const matchingItem = sidebar.items.find(item => currentPath.includes(item.permalink));
    if (matchingItem) {
      setOpenItemPermalink(matchingItem.permalink);
    }
  }, [window.location.pathname]); // 依赖于路径变化

  return (
    <ul className="menu__list">
      {sidebar.items.map(item => (
        <li key={item.permalink} className="menu__list-item">
          <Link
            to={item.permalink}
            className={`menu__link ${openItemPermalink === item.permalink ? 'menu__link--active' : ''}`}
            // 当点击时，设置此项为展开
            onClick={() => setOpenItemPermalink(item.permalink)}
          >
            {item.title}
          </Link>
          {/* 这里假设每个项下可能还有子项，需要根据实际情况调整 */}
          {openItemPermalink === item.permalink && item.items && (
            <ul>
              {item.items.map(child => (
                <li key={child.permalink} className="menu__list-item">
                  <Link to={child.permalink} className="menu__link">
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function BlogSidebarMobile(props: Props): JSX.Element {
  return (
    <NavbarSecondaryMenuFiller
      component={BlogSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}
