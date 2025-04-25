import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import CourseManagementPage from "./CourseManagementPage";
import EnrollmentRequestsPage from "./EnrollmentRequestsPage";

const { Sider, Content } = Layout;

const DashboardPage = () => {
  const [activeKey, setActiveKey] = useState("dashbaord");
  return (
    <Layout style={{ height: "100vh", display: "flex", width: "100vw" }}>
      <Sider theme="light" width={250} style={{ height: "100vh" }}>
        <Menu mode="inline" defaultSelectedKeys={["dashboard"]}>
          <Menu.Item
            onClick={() => setActiveKey("dashboard")}
            key="dashboard"
            icon={<DashboardOutlined />}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            onClick={() => setActiveKey("course-management")}
            key="course-management"
            icon={<BookOutlined />}
          >
            Course Management
          </Menu.Item>
          <Menu.Item
            onClick={() => setActiveKey("enrollment-management")}
            key="enrollment-management"
            icon={<TeamOutlined />}
          >
            Enrollment Management
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: "20px",
            flex: 1,
            height: "100%",
          }}
        >
          {activeKey === "course-management" && <CourseManagementPage />}
          {activeKey === "enrollment-management" && <EnrollmentRequestsPage />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
