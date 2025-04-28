import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import {
  Card,
  Input,
  Button,
  Row,
  Col,
  Layout,
  Modal,
  Typography,
  Collapse,
  Tag,
  Empty,
  message,
} from "antd";
import {
  FilePdfOutlined,
  PlayCircleOutlined,
  LockOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import courseApi from "../api/courseApi";
import enrollmentApi from "../api/enrollementApi";

const { Meta } = Card;
const { Header, Footer, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    courseApi.getAllCourses().then((data) => {
      setCourses(data);
      setFilteredCourses(data);
    });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredCourses(
      courses.filter((course) =>
        course.title.toLowerCase().includes(value)
      )
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Course List", 14, 10);
    const tableColumn = ["Title", "Description", "Price", "Discount"];
    const tableRows = filteredCourses.map((course) => [
      course.title,
      course.description,
      `$${course.price}`,
      `${course.discount}%`,
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("course_list.pdf");
  };

  const showCourseDetails = (course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const calculateDiscountedPrice = (price, discount) => {
    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const getLectureCount = (course) => {
    let count = 0;
    course?.chapters?.forEach((chapter) => {
      count += chapter.lectures?.length || 0;
    });
    return count;
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f7faff" }}>
      <Header
        style={{
          background: "#0a1930",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" style={{ height: 40, marginRight: 12 }} />
          <Title level={3} style={{ color: "white", margin: 0 }}>
            SkillSync
          </Title>
        </div>
      </Header>

      <Content
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col flex="auto">
            <Input.Search
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearch}
              size="large"
              enterButton
            />
          </Col>
          <Col>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                type="primary"
                icon={<FilePdfOutlined />}
                onClick={generatePDF}
                size="large"
                style={{ backgroundColor: "#ff4c60", borderColor: "#ff4c60" }}
              >
                Download PDF
              </Button>
            </motion.div>
          </Col>
        </Row>

        {filteredCourses.length > 0 ? (
          <Row gutter={[24, 24]} style={{ marginTop: 20 }}>
            {filteredCourses.map((course) => (
              <Col xs={24} sm={12} md={8} lg={6} key={course._id}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card
                    hoverable
                    cover={
                      <img
                        src={course.courseThumbnail}
                        alt={course.title}
                        style={{
                          height: 160,
                          objectFit: "cover",
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                      />
                    }
                    onClick={() => showCourseDetails(course)}
                    style={{
                      borderRadius: 10,
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Meta
                      title={<Text strong ellipsis>{course.title}</Text>}
                      description={
                        <>
                          <Text ellipsis style={{ fontSize: 12 }}>
                            {course.description}
                          </Text>
                          <div
                            style={{
                              marginTop: 10,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <Text delete>${course.price}</Text>{" "}
                              <Text strong style={{ color: "#52c41a" }}>
                                ${calculateDiscountedPrice(course.price, course.discount)}
                              </Text>
                            </div>
                            <Tag color="blue">{getLectureCount(course)} lectures</Tag>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No courses available" style={{ marginTop: 60 }} />
        )}
      </Content>

      <Modal
        title={<Title level={4}>{selectedCourse?.title}</Title>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
          <Button
            key="enroll"
            type="primary"
            style={{ backgroundColor: "#0a1930", borderColor: "#0a1930" }}
            onClick={async () => {
              await enrollmentApi.createEnrollment({
                course: selectedCourse._id,
                student: "Student 001",
              });
              message.success("Enrolled Successfully!");
              handleCancel();
            }}
          >
            Enroll Now
          </Button>,
        ]}
        centered
      >
        {selectedCourse && (
          <>
            <img
              src={selectedCourse.courseThumbnail}
              alt={selectedCourse.title}
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 20,
              }}
            />
            <Paragraph>{selectedCourse.description}</Paragraph>
            <Collapse ghost>
              {selectedCourse.chapters?.map((chapter) => (
                <Panel header={chapter.name} key={chapter._id}>
                  {chapter.lectures?.map((lecture) => (
                    <Row
                      key={lecture._id}
                      justify="space-between"
                      align="middle"
                      style={{ padding: "5px 0" }}
                    >
                      <Col><Text>{lecture.title}</Text></Col>
                      <Col>
                        {lecture.isPreview ? (
                          <Tag color="green">Preview</Tag>
                        ) : (
                          <LockOutlined />
                        )}
                      </Col>
                    </Row>
                  ))}
                </Panel>
              ))}
            </Collapse>
          </>
        )}
      </Modal>

      <Footer
        style={{
          textAlign: "center",
          background: "#0a1930",
          color: "#ffffff",
        }}
      >
        © 2025 SkillSync | Designed by Karunathilaka S M
      </Footer>
    </Layout>
  );
};

export default HomePage;


