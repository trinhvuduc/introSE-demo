import { useContext, useEffect } from 'react';
import { Container, Row, Col, Spinner, Dropdown, Table } from 'react-bootstrap';

import { PostContext } from '../contexts/postContext';

const Diet = () => {
  const {
    postState: { posts, postsLoading },
    getPosts
  } = useContext(PostContext);

  useEffect(() => getPosts(), []);

  // const {
  //   content: { monday, tuesday, wednesday, thursday, friday, saturday, sunday },
  //   expertId: { name },
  //   title,
  //   week
  // } = { ...posts[posts.length - 1] };
  const post = { ...posts[posts.length - 1] };
  const { content, expertId, title, week } = post;

  const onChangeDropDown = () => {
    console.log(1);
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
            <Dropdown className=''>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                Tuần 1
              </Dropdown.Toggle>
              title : {title}
              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1' onClick={onChangeDropDown}>
                  Action
                </Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <p className='pt-2 pl-2'></p>
          </div>
          <div className='d-flex'>
            <p className='pt-2'>Trò chuyện</p>
            <p className='pt-2 pl-2'>Đánh giá</p>
          </div>
        </div>

        {/* <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map((post) => (
            <Col key={post._id} className='my-2 border'>
              <p>title: {post.title}</p>
              <p>week: {post.week}</p>
              <p>content:</p>
            </Col>
          ))}
        </Row> */}
        <Table striped bordered hover size='sm'>
          <tbody>
            <tr>
              <td>Thứ 2</td>
              <td>{content.monday}</td>
            </tr>
            <tr>
              <td>Thứ 3</td>
              <td>{content.thursday}</td>
            </tr>
            <tr>
              <td>Thứ 4</td>
              <td>{content.wednesday}</td>
            </tr>
            <tr>
              <td>Thứ 5</td>
              <td>{content.thursday}</td>
            </tr>
            <tr>
              <td>Thứ 6</td>
              <td>{content.friday}</td>
            </tr>
            <tr>
              <td>Thứ 7</td>
              <td>{content.saturday}</td>
            </tr>
            <tr>
              <td>Chủ nhật</td>
              <td>{content.sunday}</td>
            </tr>
          </tbody>
        </Table>
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
