import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import { BsChatSquare, BsAward, BsPencilSquare, BsTrash } from 'react-icons/bs';

import { PostContext } from '../contexts/postContext';
import { AuthContext } from '../contexts/authContext';
import './Diet.css';

const Diet = () => {
  // Context
  const {
    postState: { posts, postsLoading },
    getPosts
  } = useContext(PostContext);

  const {
    authState: {
      user: { role }
    }
  } = useContext(AuthContext);

  const [day, setDay] = useState(0);

  useEffect(() => getPosts(), []);

  let body = null;

  const onChangeSelect = (e) => {
    setDay(e.target.value);
  };

  if (postsLoading) {
    body = (
      <div className='d-flex justify-content-center mt-2'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  } else if (posts.length === 0) {
    body = <h2>Chưa có bài xem nào</h2>;
  } else if (role === 'client') {
    body = (
      <>
        <div className='d-flex justify-content-between mt-3'>
          <div className='d-flex' style={{ width: '700px' }}>
            <Form.Control
              as='select'
              className='mr-sm-2'
              custom
              style={{ width: '180px' }}
              onChange={onChangeSelect}
            >
              {posts.map((post, i) => {
                return (
                  <option value={i} key={post._id}>
                    Tuần {post.week}
                  </option>
                );
              })}
            </Form.Control>
            <p className='pt-2 pl-2' style={{ width: '319px' }}>
              {posts[day].title}
            </p>
          </div>
          <div className='d-flex'>
            <div className='d-flex tool'>
              <p className='pt-2 mr-1'>Trò chuyện</p>
              <BsChatSquare className='icon' />
            </div>
            <div className='d-flex mr-3 tool'>
              <p className='pt-2 pl-2'>Đánh giá</p>
              <BsAward
                className='icon'
                style={{ width: '23px', height: '23px' }}
              />
            </div>
          </div>
        </div>

        <table className='table-fill'>
          <thead>
            <tr>
              <th className='text-left' style={{ width: '180px' }}>
                Thứ
              </th>
              <th className='text-left'>Nội dung</th>
            </tr>
          </thead>
          <tbody className='table-hover'>
            <tr>
              <td className='text-left2'>Thứ 2</td>
              <td className='text-left2'>{posts[day].content.monday}</td>
            </tr>
            <tr>
              <td className='text-left3'>Thứ 3</td>
              <td className='text-left3'>{posts[day].content.tuesday}</td>
            </tr>
            <tr>
              <td className='text-left4'>Thứ 4</td>
              <td className='text-left4'>{posts[day].content.wednesday}</td>
            </tr>
            <tr>
              <td className='text-left5'>Thứ 5</td>
              <td className='text-left5'>{posts[day].content.thursday}</td>
            </tr>
            <tr>
              <td className='text-left6'>Thứ 6</td>
              <td className='text-left6'>{posts[day].content.friday}</td>
            </tr>
            <tr>
              <td className='text-left7'>Thứ 7</td>
              <td className='text-left7'>{posts[day].content.saturday}</td>
            </tr>
            <tr>
              <td className='text-left8'>Chủ nhật</td>
              <td className='text-left8'>{posts[day].content.sunday}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else if (role === 'expert') {
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map((post, i) => (
            <Col key={post._id} className='my-2 border'>
              <p>Bài {i + 1}</p>
              <p>Tiêu đề: {post.title}</p>
              <p>Tuần: {post.week}</p>
              <span className='mr-2 bar'>
                Sửa <BsPencilSquare style={{ color: '#7cc17c' }} />
              </span>
              <span className='mr-2 bar'>
                Xóa <BsTrash style={{ color: '#bf1f1f' }} />
              </span>
              <p> </p>
            </Col>
          ))}
        </Row>
      </>
    );
  }

  return <Container>{body}</Container>;
};

export default Diet;
