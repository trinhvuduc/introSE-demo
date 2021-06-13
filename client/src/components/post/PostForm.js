import { useContext, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { AuthContext } from '../../contexts/authContext';
import { PostContext } from '../../contexts/postContext';
import './PostForm.css';
import AlertMessage from '../auth/AlertMessage';

const PostForm = () => {
  // Context
  const {
    authState: { clients }
  } = useContext(AuthContext);

  const { addPost } = useContext(PostContext);

  // Local state
  const [newPost, setPost] = useState({
    title: '',
    content: '',
    clientsId: []
  });
  const { title, content, clientsId } = newPost;

  // Alert state
  const [alert, setAlert] = useState(null);

  const onChangeForm = (event) => {
    setPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const onChangeCheckbox = (id) => {
    let currentList = [...clientsId];
    const contain = currentList.includes(id);
    if (contain) {
      currentList = currentList.filter((item) => item !== id);
    } else {
      currentList.push(id);
    }
    setPost({ ...newPost, clientsId: currentList });
  };

  const onSubmit = async () => {
    try {
      const res = await addPost(newPost);
      console.log(res);
      if (res.success) {
        setPost({ title: '', content: '', clientsId: [] });
      } else {
        setAlert({ type: 'danger', message: res.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const list = clients.length ? (
    clients.map((client) => (
      <label className='client' key={client._id}>
        <p>
          {client.name} ({client.username})
        </p>
        <input type='checkbox' onChange={() => onChangeCheckbox(client._id)} />
        <span className='checkmark'></span>
      </label>
    ))
  ) : (
    <p>Chưa có khách hàng nào</p>
  );

  return (
    <>
      <Row>
        <Col md={6}>
          <h2 className='my-2 text-center'>Chế độ ăn mới</h2>
          <Form>
            <Form.Group>
              Tiêu Đề
              <Form.Control
                type='text'
                placeholder='Title'
                name='title'
                required
                value={title}
                onChange={onChangeForm}
              />
            </Form.Group>
            <Form.Group>
              Nội dung
              <Form.Control
                type='text'
                placeholder='Content'
                name='content'
                required
                value={content}
                onChange={onChangeForm}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <h2 className='my-2 text-center'>Danh sách khách hàng</h2>

          {list}

          <AlertMessage info={alert} />
          <Button variant='success' type='submit' onClick={onSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PostForm;
