import { useContext, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

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
            <Col key={post._id} className='my-2'>
              {/* <SinglePost post={post} /> */}
              {post.title}
            </Col>
          ))}
        </Row>
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
