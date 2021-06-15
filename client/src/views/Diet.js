import { useContext, useEffect } from 'react';
import { Container, Row, Col, Spinner, Carousel } from 'react-bootstrap';

import { PostContext } from '../contexts/postContext';

const Diet = () => {
  const {
    postState: { posts, postsLoading },
    getPosts
  } = useContext(PostContext);

  useEffect(() => getPosts(), []);

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
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map((post) => (
            <Col key={post._id} className='my-2 border'>
              {/* <SinglePost post={post} /> */}
              <p>title: {post.title}</p>
              <p>week: {post.week}</p>
              <p>content: {post.content}</p>
            </Col>
          ))}
        </Row>
        {/* <Carousel>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='https://media-cdn.laodong.vn/Storage/NewsPortal/2020/6/23/814689/7-Giong-Meo-Dat-Nhat-02.jpg'
              alt='First slide'
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='assets/white.png'
              alt='Second slide'
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='holder.js/800x400?text=Third slide&bg=20232a'
              alt='Third slide'
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> */}
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
