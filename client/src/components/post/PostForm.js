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
    week: '',
    content: '',
    note: '',
    clientsId: []
  });
  const { title, content, week, note, clientsId } = newPost;

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
      if (res.success) {
        setPost({ ...newPost, title: '', content: '', week: '', note: '' });
        setAlert({ type: 'success', message: res.message });
        setTimeout(() => setAlert(null), 5000);
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
        <p style={{ fontSize: '18px', marginLeft: '20px' }}>
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
          <h4 className='my-2 text-center'>Chế độ ăn mới</h4>
          <Form>
            <Form.Group>
              <Form.Label>Tiêu Đề</Form.Label>
              <Form.Control
                type='text'
                placeholder='Tiêu đề'
                name='title'
                required
                value={title}
                onChange={onChangeForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tuần</Form.Label>
              <Form.Control
                type='text'
                placeholder='Tuần'
                name='week'
                required
                value={week}
                onChange={onChangeForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as='textarea'
                rows={8}
                style={{ resize: 'none' }}
                placeholder='Thứ 2: ...&#10;Thứ 3: ...'
                name='content'
                required
                value={content}
                onChange={onChangeForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ghi chú (nếu có)'
                name='note'
                required
                value={note}
                onChange={onChangeForm}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <h4 className='my-2 text-center'>Danh sách khách hàng</h4>

          <div className='my-4'>{list}</div>

          <AlertMessage info={alert} />
          <Button
            style={{ width: 'inherit' }}
            variant='success'
            type='submit'
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PostForm;
