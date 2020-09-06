import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  HomeOutlined,
  StockOutlined,
  UserOutlined,
  LogoutOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import MyPortfolio from "../Pages/MyPortfolio";

const breadcrumbNameMap = {
  "/myportfolios": "My Portfolios",
  "/trades": "Trades",
  "/logout": "Logout",
  "/trades/add": "Add",
  "/trades/remove": "Remove",
  "/trades/update": "Update",
};

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    pathname: "home",
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    if (window.innerWidth <= 800) {
      this.setState({ collapsed: true });
    }
    let path = this.props.location.pathname;
    this.setState({ pathname: path });
    window.addEventListener("resize", this.handleWindowWidthChanged);
    this.unlisten = this.props.history.listen((location) => {
      let path = location.pathname;
      this.setState({ pathname: path });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowWidthChanged);
    this.unlisten();
  }

  handleWindowWidthChanged = () => {
    window.innerWidth <= 800
      ? this.setState({ collapsed: true })
      : this.setState({ collapsed: false });
  };

  render() {
    const { location } = this.props;
    let { collapsed, pathname } = this.state;
    pathname = pathname === "/" ? "home" : pathname;
    const pathSnippets = location.pathname.split("/").filter((i) => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });

    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">
          <HomeOutlined />
          <span style={{ margin: "5px" }}>Home</span>
        </Link>
      </Breadcrumb.Item>,
      ...extraBreadcrumbItems,
    ];
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <div style={{ margin: "0", padding: "0" }}>
          <Sider
            style={{
              position: "-webkit-sticky",
              position: "sticky",
              top: "0px",
              zIndex: "100",
              height: "100vh",
              paddingTop: "10px",
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={["home"]}
              selectedKeys={pathname}
              mode="inline"
            >
              <Menu.Item
                disabled={true}
                key="Mainlogo"
                icon={<LineChartOutlined />}
              >
                Portfolio Manager
              </Menu.Item>
              <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="/myportfolios" icon={<DesktopOutlined />}>
                <Link to="/myportfolios">My Portfolios</Link>
              </Menu.Item>
              <SubMenu key="trades" icon={<StockOutlined />} title="Trades">
                <Menu.Item key="/trades/add">
                  <Link to="/trades/add">Add</Link>
                </Menu.Item>
                <Menu.Item key="/trades/remove">
                  <Link to="/trades/remove">Remove</Link>
                </Menu.Item>
                <Menu.Item key="/trades/update">
                  <Link to="/trades/update">Update</Link>
                </Menu.Item>
              </SubMenu>
              {/* <SubMenu key="/user" icon={<UserOutlined />} title="User">
                <Menu.Item key="/trades/update">
                  <Link to="/trades/update">Update</Link>
                </Menu.Item>
              </SubMenu> */}
              <Menu.Item key="logout" icon={<LogoutOutlined />}>
                <Link to="/logout">Logout</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        </div>
        <Layout>
          <Header
            style={{
              position: "fixed",
              width: "100%",
              height: "60px",
              display: "flex",
            }}
          >
            <Breadcrumb style={{ margin: "16px 0" }}>
              {breadcrumbItems}
            </Breadcrumb>
          </Header>
          <Content style={{ margin: "0 16px", marginTop: "70px" }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route exact path="/" render={() => <h3>App</h3>} />
                <Route path="/myportfolios" component={MyPortfolio} />
                <Route path="/trades/add" render={() => <h3>Add</h3>} />
                <Route path="/trades/remove" render={() => <h3>Remove</h3>} />
                <Route path="/trades/update" render={() => <h3>update</h3>} />
                <Route path="/logout" render={() => <h3>Logout</h3>} />
                <Route render={() => <h3>404 Not Found</h3>} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <a
              href="https://portfolio.devganesh.tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio Manager ©2020 Created by Dev Ganesh
            </a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
