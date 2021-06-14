import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { AuthContext } from '../contexts/authContext';
import './home.css';


const Home = () => {
  const {
    authState: {
      user: { role, expertId, clientId }
    }
  } = useContext(AuthContext);

  const name = role === 'client' ? clientId.name : expertId.name;

  return (
    <>
       {/* <Container>
        <Row>
          <Col md={12} xs={12} className='text-center mt-3'> */}
         
          <nav class="navbar"></nav>
          <section class="home" id="home">
            <div class="max-width">
              <div class="home-content">
                <div class="text-1">BÀI VIẾT NỔI BẬT</div>
                <div class="text-2">MANG THIÊN NHIÊN VÀO NHÀ</div>
                <div class="text-3">LỢI ÍCH CỦA VIỆC TRỒNG CÂY XANH TRONG NHÀ</div>
                {/* <div class="text-4"><p>KHÁM PHÁ NGAY</p></div> */}
                <button name="button" value="OK" type="button">KHÁM PHÁ NGAY</button>
              </div>

              <div class="logo"></div>

              <div class="content"><span>"</span>Theo đuổi sứ mệnh mang đến cho người Việt một lối sống lấy sức khoẻ
                                              làm tất yếu- Bởi vì chúng tôi biết rằng sức khoẻ chính là khởi nguồn,
                                              là điều kiện cần để có một cuộc sống hạnh phúc và chinh phục những
                                              khát khao. HealthApp hoạt động xoay quanh một chế độ ăn thích hợp
                                              đi kèm những bài tập duy trì thể lực theo những mục tiêu mà bạn yêu cầu.
                                              Giải pháp kết nối tiện lợi và tức thì tớI các chuyên gia huấn luyện viên
                                              của riêng bạn."</div>
            </div>

          </section>

          <footer>
            <div class="container">
              <div class="title">Về chúng tôi:</div>
              <hr width="100%" color="black"></hr>
              <div class="members">
                <div class="name-1">NHÓM 07: Nguyễn Đình Long</div>
                <div class="name-2">Vũ Minh Hiếu</div>
                <div class="name-3">Lăng Đức Hải</div>
                <div class="name-4">Nguyễn Danh Thắng</div>
                <div class="name-5">Trịnh Vũ Đức</div>
                <div class="name-6">Phạm Đình Hai</div>
              </div>
              <div class="school">HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</div>
              <div class="teacher">GIẢNG VIÊN HƯỚNG DẪN: PGS-TS HOÀNG HỮU HẠNH</div>
            </div>
          </footer>
          
          {/* </Col>
        </Row>
      </Container>  */}
    </>
  );
};

export default Home;
