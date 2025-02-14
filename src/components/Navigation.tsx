import { useAppHooks } from "@/hooks/useAppHooks";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

function Navigation() {
  const location = useLocation();

  const { isMobile } = useAppHooks();

  const menuItems = [
    {
      key: "/",
      label: (
        <Link to="/" className="dark:text-white">
          首页
        </Link>
      ),
    },
    {
      key: "/about",
      label: (
        <Link to="/about" className="dark:text-white">
          关于
        </Link>
      ),
    },
  ];

  const menu = {
    items: menuItems,
    selectedKeys: [location.pathname],
  };
  console.log(isMobile);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full dark:bg-[#1B1B1F]/90 backdrop-blur-sm border-b border-[#E2E2E3] dark:border-[#000000] shadow-sm dark:shadow-[0_1px_0_0_rgba(255,255,255,0.1)]">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold dark:text-white">导航栏</h1>
        </div>
        {/* 大屏幕显示 */}
        {!isMobile && (
          <div className="flex-1 flex items-center">
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              className="flex-1 flex justify-end border-none bg-transparent"
              style={{
                backgroundColor: "transparent",
              }}
            />
            <div className="ml-6">
              <ThemeSwitch />
            </div>
          </div>
        )}
        {/* 小屏幕显示 */}
        {isMobile && (
          <div className="flex items-center">
            <Dropdown menu={menu} trigger={["click"]}>
              <Button
                type="text"
                icon={<MenuOutlined className="dark:text-white" />}
              />
            </Dropdown>
            <div className="ml-6">
              <ThemeSwitch />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navigation;
