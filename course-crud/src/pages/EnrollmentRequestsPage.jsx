import React, { useEffect, useState, useMemo } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import enrollmentApi from "../api/enrollementApi";

const EnrollmentRequestsPage = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const data = await enrollmentApi.getEnrollments();
      // Flatten the data structure for easier table use
      const formattedData = data.map((enrollment) => ({
        ...enrollment,
        courseTitle: enrollment.course.title,
        courseDescription: enrollment.course.description,
        coursePrice: enrollment.course.price,
        courseDiscount: enrollment.course.discount,
        courseThumbnail: enrollment.course.courseThumbnail,
        studentName: enrollment.student,
        status: enrollment.status,
        createdAt: new Date(enrollment.createdAt).toLocaleString(),
        updatedAt: new Date(enrollment.updatedAt).toLocaleString(),
      }));
      setEnrollments(formattedData);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch enrollments.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await enrollmentApi.updateEnrollmentStatus(id, status);
      setEnrollments((prev) =>
        prev.map((enrollment) =>
          enrollment._id === id ? { ...enrollment, status } : enrollment
        )
      );
      message.success(`Enrollment ${status}`);
    } catch (error) {
      console.error(error);
      message.error("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await enrollmentApi.deleteEnrollment(id);
      setEnrollments((prev) =>
        prev.filter((enrollment) => enrollment._id !== id)
      );
      message.success("Enrollment deleted.");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete enrollment.");
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Course Title",
        dataIndex: "courseTitle",
        key: "courseTitle",
      },

      {
        title: "Student Name",
        dataIndex: "studentName",
        key: "studentName",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <span
            style={{
              color:
                status === "Accepted"
                  ? "green"
                  : status === "Rejected"
                  ? "red"
                  : "gray",
            }}
          >
            {status}
          </span>
        ),
      },
      {
        title: "Requested At",
        dataIndex: "createdAt",
        key: "createdAt",
      },

      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <>
            <Button
              type="primary"
              onClick={() => handleStatusChange(record._id, "Accepted")}
              disabled={record.status === "Accepted"}
              style={{ marginRight: 8 }}
            >
              Accept
            </Button>
            <Button
              type="danger"
              onClick={() => handleStatusChange(record._id, "Rejected")}
              disabled={record.status === "Rejected"}
              style={{ marginRight: 8 }}
            >
              Reject
            </Button>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="default">Delete</Button>
            </Popconfirm>
          </>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Enrollment Requests</h2>
      <Table dataSource={enrollments} columns={columns} rowKey="_id" />
    </div>
  );
};

export default EnrollmentRequestsPage;
