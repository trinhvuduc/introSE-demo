import { useContext, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  Dropdown,
  Table,
  Form
} from 'react-bootstrap';
import { BsChatSquare, BsPerson, BsAward } from 'react-icons/bs';

import { PostContext } from '../contexts/postContext';
import './Diet.css';

const Diet = () => {
  // Context
  const {
    postState: { posts, postsLoading },
    getPosts
  } = useContext(PostContext);

  // State
  const [meal, setMeal] = useState({});

  useEffect(() => {
    getPosts().then((res) => setMeal());
  }, []);

  // const {
  //   content: { monday, tuesday, wednesday, thursday, friday, saturday, sunday },
  //   expertId: { name },
  //   title,
  //   week
  // } = { ...posts[posts.length - 1] };

  // console.log(posts);

  let post = { ...posts[posts.length - 1] };
  const { content, expertId, title, week } = post;

  const onChangeDropDown = (event) => {
    console.log(event.target.value);
    post = posts.filter((post) => post._id === event.target.value)[0];
    setMeal({ post });
  };

  let body = null;

  if (postsLoading) {
    body = (
      <div className='d-flex justify-content-center mt-2'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  } else if (posts.length === 0) {
    body = <h2>Chưa có bài xem nào</h2>;
  } else {
    body = (
      <>
        <div className='d-flex justify-content-between mt-3'>
          <div className='d-flex'>
            <Form.Control
              as='select'
              className='mr-sm-2'
              custom
              onChange={onChangeDropDown}
            >
              <option
                value={post._id}
                key={post._id}
                onClick={onChangeDropDown}
              >
                Tuần {week}
              </option>
            </Form.Control>
            <p className='pt-2 pl-2' style={{ width: '319px' }}>
              Tiêu đề
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
              <td className='text-left2'>{content.monday}</td>
            </tr>
            <tr>
              <td className='text-left3'>Thứ 3</td>
              <td className='text-left3'>{content.tuesday}</td>
            </tr>
            <tr>
              <td className='text-left4'>Thứ 4</td>
              <td className='text-left4'>{content.wednesday}</td>
            </tr>
            <tr>
              <td className='text-left5'>Thứ 5</td>
              <td className='text-left5'>{content.thursday}</td>
            </tr>
            <tr>
              <td className='text-left6'>Thứ 6</td>
              <td className='text-left6'>{content.friday}</td>
            </tr>
            <tr>
              <td className='text-left7'>Thứ 7</td>
              <td className='text-left7'>{content.saturday}</td>
            </tr>
            <tr>
              <td className='text-left8'>Chủ nhật</td>
              <td className='text-left8'>{content.sunday}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <Container>{body}</Container>
    </>
  );
};

export default Diet;
