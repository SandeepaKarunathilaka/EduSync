import React, { useEffect, useState } from "react";
import logo from '../assets/logo.svg';
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
  Divider,
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
  useEffect(() => {
    courseApi.getAllCourses().then((data) => {
      setCourses(data);
      setFilteredCourses(data);
    });
  }, []);

  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredCourses(
      courses.filter((course) => course.title.toLowerCase().includes(value))
    );
  };

  const showCourseDetails = (course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
    if (course.chapters) {
      course.chapters.forEach((chapter) => {
        if (chapter.lectures) {
          count += chapter.lectures.length;
        }
      });
    }
    return count;
  };

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw" }}>
      <Header
        style={{
          background: "#1E90FF",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
  src={logo}
  alt="logo"
  style={{ height: 40, marginRight: 12 }}
/>


        <Typography.Title
          level={3}
          style={{
            color: "white",
            margin: 0,
            textAlign: "center",
          }}
        >
          Course Catalog
        </Typography.Title>
      </Header>
      <Content
        style={{
          padding: 10,
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col xs={24} md={12} lg={16}>
            <Input
              placeholder="Search for courses"
              value={searchTerm}
              onChange={handleSearch}
              size="large"
              style={{ width: "100%" }}
            />
          </Col>
          <Col
            xs={24}
            md={12}
            lg={8}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: { xs: 16, md: 0 },
            }}
          >
            <Button
              type="primary"
              icon={<FilePdfOutlined />}
              onClick={generatePDF}
              size="large"
            >
              Generate PDF
            </Button>
          </Col>
        </Row>

        {filteredCourses.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredCourses.map((course) => (
              <Col xs={24} sm={12} md={8} lg={6} key={course._id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card
                    hoverable
                    cover={
                      <div style={{ overflow: "hidden", height: 160 }}>
                        <img
                          alt={course.title}
                          src={course.courseThumbnail}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    }
                    onClick={() => showCourseDetails(course)}
                    style={{ height: "100%" }}
                    bodyStyle={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <Meta
                      title={course.title}
                      description={
                        <div>
                          <div
                            style={{
                              marginBottom: 8,
                              height: 40,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {course.description}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <Text delete>${course.price}</Text>
                              <Text
                                strong
                                style={{ marginLeft: 8, color: "#1890ff" }}
                              >
                                $
                                {calculateDiscountedPrice(
                                  course.price,
                                  course.discount
                                )}
                              </Text>
                            </div>
                            <Tag color="geekblue">
                              {getLectureCount(course)} lectures
                            </Tag>
                          </div>
                        </div>
                      }
                    />
                    <div style={{ marginTop: "auto", paddingTop: 16 }}>
                      <Button type="primary" style={{ width: "100%" }}>
                        Enroll Now
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No courses found" style={{ marginTop: 60 }} />
        )}
      </Content>

      <Modal
        title={
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Title level={4} style={{ margin: 0 }}>
              {selectedCourse?.title}
            </Title>
          </motion.div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button
            onClick={async () => {
              await enrollmentApi.createEnrollment({
                course: selectedCourse._id,
                student: "Student 001",
              });
              message.success("Enrolled successfully");
            }}
            key="enroll"
            type="primary"
            style={{ background: "#1890ff" }}
          >
            Enroll Now
          </Button>,
        ]}
        width={800}
        centered
      >
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <img
                  src={selectedCourse.courseThumbnail}
                  alt={selectedCourse.title}
                  style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <Text delete style={{ fontSize: 16 }}>
                      ${selectedCourse.price}
                    </Text>
                    <Text
                      strong
                      style={{ fontSize: 24, marginLeft: 12, color: "#1890ff" }}
                    >
                      $
                      {calculateDiscountedPrice(
                        selectedCourse.price,
                        selectedCourse.discount
                      )}
                    </Text>
                  </div>
                  <Tag color="red" style={{ fontSize: 14, padding: "2px 8px" }}>
                    {selectedCourse.discount}% OFF
                  </Tag>
                </div>
                <Paragraph>
                  <Title level={5}>Description</Title>
                  <Text>{selectedCourse.description}</Text>
                </Paragraph>
              </Col>

              <Col xs={24} md={12}>
                <Title level={5}>
                  <BookOutlined style={{ marginRight: 8 }} />
                  Course Content
                </Title>

                {selectedCourse.chapters &&
                selectedCourse.chapters.length > 0 ? (
                  <Collapse
                    defaultActiveKey={[selectedCourse.chapters[0]?._id]}
                    ghost
                  >
                    {selectedCourse.chapters.map((chapter) => (
                      <Panel
                        header={
                          <div style={{ fontWeight: "bold" }}>
                            {chapter.name}
                            {chapter.lectures && (
                              <Tag style={{ marginLeft: 8 }}>
                                {chapter.lectures.length} lectures
                              </Tag>
                            )}
                          </div>
                        }
                        key={chapter._id}
                      >
                        {chapter.lectures && chapter.lectures.length > 0 ? (
                          chapter.lectures.map((lecture) => (
                            <motion.div
                              key={lecture._id}
                              whileHover={{
                                backgroundColor: "#f5f5f5",
                                borderRadius: 4,
                              }}
                              style={{
                                padding: "8px 12px",
                                marginBottom: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {lecture.isPreview ? (
                                  <PlayCircleOutlined
                                    style={{ marginRight: 8, color: "#1890ff" }}
                                  />
                                ) : (
                                  <LockOutlined style={{ marginRight: 8 }} />
                                )}
                                <Text>{lecture.title}</Text>
                                {lecture.isPreview && (
                                  <Tag
                                    color="success"
                                    style={{ marginLeft: 8 }}
                                  >
                                    Preview
                                  </Tag>
                                )}
                              </div>
                              <Text type="secondary">
                                {formatTime(lecture.duration)}
                              </Text>
                            </motion.div>
                          ))
                        ) : (
                          <Empty
                            description="No lectures available"
                            style={{ margin: "20px 0" }}
                          />
                        )}
                      </Panel>
                    ))}
                  </Collapse>
                ) : (
                  <Empty
                    description="No chapters available"
                    style={{ margin: "20px 0" }}
                  />
                )}
              </Col>
            </Row>
          </motion.div>
        )}
      </Modal>

      <Footer style={{ textAlign: "center", background: "#f0f2f5" }}>
        © Karunathilaka S M
      </Footer>
    </Layout>
  );
};

export default HomePage;
