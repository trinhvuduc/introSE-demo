import './Home.css';

const Home = () => {
  return (
    <>
      <section className='home' id='home'>
        <div className='max-width'>
          <div className='home-content'>
            <div className='text-1'>BÀI VIẾT NỔI BẬT</div>
            <div className='text-2'>MANG THIÊN NHIÊN VÀO NHÀ</div>
            <div className='text-3'>LỢI ÍCH CỦA VIỆC TRỒNG CÂY XANH TRONG NHÀ</div>
            {/* <div className="text-4"><p>KHÁM PHÁ NGAY</p></div> */}
            <button name='button' value='OK' type='button'>
              KHÁM PHÁ NGAY
            </button>
          </div>

          <div className='logo'></div>

          <div className='content'>
            <span>"</span>Theo đuổi sứ mệnh mang đến cho người Việt một lối sống
            lấy sức khoẻ làm tất yếu- Bởi vì chúng tôi biết rằng sức khoẻ chính
            là khởi nguồn, là điều kiện cần để có một cuộc sống hạnh phúc và
            chinh phục những khát khao. HealthApp hoạt động xoay quanh một chế
            độ ăn thích hợp đi kèm những bài tập duy trì thể lực theo những mục
            tiêu mà bạn yêu cầu. Giải pháp kết nối tiện lợi và tức thì tớI các
            chuyên gia huấn luyện viên của riêng bạn."
          </div>
        </div>
      </section>

      <footer>
        <div className='container'>
          <div className='title'>Về chúng tôi:</div>
          <hr width='100%' color='black'></hr>
          <div className='members'>
            <div className='name-1'>NHÓM 07: Nguyễn Đình Long</div>
            <div className='name-2'>Vũ Minh Hiếu</div>
            <div className='name-3'>Lăng Đức Hải</div>
            <div className='name-4'>Nguyễn Danh Thắng</div>
            <div className='name-5'>Trịnh Vũ Đức</div>
            <div className='name-6'>Phạm Đình Hai</div>
          </div>
          <div className='school'>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</div>
          <div className='teacher'>GIẢNG VIÊN HƯỚNG DẪN: PGS-TS HOÀNG HỮU HẠNH</div>
        </div>
      </footer>

      {/* </Col>
        </Row>
      </Container>  */}
    </>
  );
};

export default Home;
