import React, { useState, useEffect } from "react";
import { Button, Typography, Spin } from "antd";
import CoursesTable from "../components/CoursesTable"
import CreateEditCourseModal from "../components/CreateEditCourseModal";
import courseApi from "../api/courseApi";

const { Title } = Typography;

const CourseManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseApi.getAllCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Title level={2}>Course Management</Title>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Course
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <CoursesTable
          courses={courses}
          onDataUpdate={async () => {
            try {
              const data = await courseApi.getAllCourses();
              setCourses(data);
            } catch (error) {
              console.error("Failed to fetch courses:", error);
            } finally {
              setLoading(false);
            }
          }}
        />
      )}

      <CreateEditCourseModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDataUpdate={async () => {
          try {
            const data = await courseApi.getAllCourses();
            setCourses(data);
          } catch (error) {
            console.error("Failed to fetch courses:", error);
          } finally {
            setLoading(false);
          }
        }}
      />
    </div>
  );
};

export default CourseManagementPage;
