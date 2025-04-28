import React, { useEffect, useState } from "react";
import { Layout, Input, Row, Col, Button, Typography, Card, Tag, Empty, Modal, Collapse, message, Rate } from "antd";
import { FilePdfOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import courseApi from "../api/courseApi";
import enrollmentApi from "../api/enrollementApi";
import logo from "../assets/logo.svg";

const { Meta } = Card;
const { Header, Footer, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const testimonials = [
  {
    name: "Donald Jackman",
    role: "SWE 1 @ Amazon",
    review: 5,
    text: "I've been using SkillSync for nearly two years, and it has been incredibly user-friendly, making my work much easier.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Richard Nelson",
    role: "SWE 2 @ Samsung",
    review: 4,
    text: "SkillSync is very efficient for managing my career growth. Highly recommended!",
    img: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "James Washington",
    role: "SWE 2 @ Google",
    review: 4,
    text: "Courses are well structured and the platform is smooth to navigate.",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

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
      courses.filter((course) => course.title.toLowerCase().includes(value))
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

      <Content style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <Row justify="center" style={{ marginBottom: 30 }}>
          <Col xs={24} sm={20} md={16} lg={12}>
            <Input.Search
              placeholder="Search for courses"
              value={searchTerm}
              onChange={handleSearch}
              size="large"
              enterButton
            />
          </Col>
        </Row>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title level={2}>
            Empower your future with the courses designed to <span style={{ color: "#3b82f6" }}>fit your choice.</span>
          </Title>
          <Paragraph style={{ color: "#666", fontSize: 16 }}>
            We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
          </Paragraph>
        </div>

        <Row justify="end" style={{ marginBottom: 20 }}>
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
          <Row gutter={[24, 24]}>
            {filteredCourses.map((course) => (
              <Col xs={24} sm={12} md={8} lg={6} key={course._id}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card
                    hoverable
                    cover={<img src={course.courseThumbnail} alt={course.title} style={{ height: 160, objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />}
                    onClick={() => showCourseDetails(course)}
                    style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  >
                    <Meta
                      title={<Text strong ellipsis>{course.title}</Text>}
                      description={
                        <>
                          <Text ellipsis style={{ fontSize: 12 }}>{course.description}</Text>
                          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

        {/* Testimonials Section */}
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <Title level={2}>Testimonials</Title>
          <Paragraph style={{ color: "#666", fontSize: 16, marginBottom: 40 }}>
            Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
          </Paragraph>
          <Row gutter={[24, 24]} justify="center">
            {testimonials.map((t, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card bordered style={{ borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <img src={t.img} alt={t.name} style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 16 }} />
                    <div>
                      <Text strong>{t.name}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>{t.role}</Text>
                    </div>
                  </div>
                  <Rate disabled defaultValue={t.review} style={{ marginBottom: 12 }} />
                  <Paragraph style={{ fontSize: 14 }}>{t.text}</Paragraph>
                  <a href="#">Read more</a>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Learn Anything Section */}
        <div style={{ textAlign: "center", marginTop: 100, marginBottom: 100 }}>
          <Title level={2}>Learn anything, anytime, anywhere</Title>
          <Paragraph style={{ color: "#666", fontSize: 16, maxWidth: 600, margin: "0 auto 40px" }}>
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.
          </Paragraph>
          <div>
            <Button type="primary" size="large" style={{ marginRight: 20 }}>Get started</Button>
            <Button type="link" size="large">Learn more →</Button>
          </div>
        </div>

      </Content>

      <Footer style={{ textAlign: "center", background: "#0a1930", color: "#ffffff" }}>
        © 2025 SkillSync | Designed by Karunathilaka S M
      </Footer>
    </Layout>
  );
};

export default HomePage;






