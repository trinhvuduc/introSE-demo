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
    content: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    note: '',
    clientsId: []
  });
  const { title, content, week, note, clientsId } = newPost;
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
    content;

  // Alert state
  const [alert, setAlert] = useState(null);

  const onChangeForm = (event) => {
    setPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const onChangeDay = (event) => {
    setPost({
      ...newPost,
      content: { ...content, [event.target.name]: event.target.value }
    });
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
        // setPost({
        //   ...newPost,
        //   title: '',
        //   content: {
        //     monday: '',
        //     tuesday: '',
        //     wednesday: '',
        //     thursday: '',
        //     friday: '',
        //     saturday: '',
        //     sunday: ''
        //   },
        //   week: '',
        //   note: ''
        // });
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
      <Row className='mt-2'>
        <Col md={6}>
          <h4 className='my-2 text-center'>Chế độ ăn mới</h4>
          <Form>
            <Form.Group className='d-flex'>
              <Form.Label>Tiêu Đề</Form.Label>
              <Form.Control
                type='text'
                name='title'
                required
                value={title}
                onChange={onChangeForm}
                className='input-form'
              />
            </Form.Group>
            <div className='d-flex' style={{ height: '52px' }}>
              <Form.Group className='d-flex'>
                <Form.Label>Tuần</Form.Label>
                <Form.Control
                  type='text'
                  name='week'
                  required
                  value={week}
                  onChange={onChangeForm}
                  className='week input-form'
                />
              </Form.Group>
              <Form.Group className='d-flex '>
                <Form.Label className='ml-3' style={{ paddingTop: '0' }}>
                  Ghi chú (nếu có)
                </Form.Label>
                <Form.Control
                  type='text'
                  name='note'
                  required
                  value={note}
                  onChange={onChangeForm}
                  className='note input-form'
                />
              </Form.Group>
            </div>
            <h5>Nội dung</h5>
            <Form.Group className='d-flex'>
              <Form.Label>Thứ hai</Form.Label>
              <Form.Control
                type='text'
                name='monday'
                required
                value={monday}
                onChange={onChangeDay}
                className='input-form'
              />
            </Form.Group>
            <Form.Group className='d-flex'>
              <Form.Label>Thứ ba</Form.Label>
              <Form.Control
                type='text'
                name='tuesday'
                required
                value={tuesday}
                onChange={onChangeDay}
                className='input-form'
              />
            </Form.Group>
            <Form.Group className='d-flex'>
              <Form.Label>Thứ Tư</Form.Label>
              <Form.Control
                type='text'
                name='wednesday'
                required
                value={wednesday}
                onChange={onChangeDay}
                className='input-form'
              />
            </Form.Group>
            <Form.Group className='d-flex'>
              <Form.Label>Thứ Năm</Form.Label>
              <Form.Control
                type='text'
                name='thursday'
                required
                value={thursday}
                onChange={onChangeDay}
                className='input-form'
              />
            </Form.Group>
            <Form.Group className='d-flex'>
              <Form.Label>Thứ Sáu</Form.Label>
              <Form.Control
                type='text'
                name='friday'
                required
                value={friday}
                onChange={onChangeDay}
                className='input-form'
              />
            </Form.Group>
            <Form.Group className='d-flex'>
              <Form.Label>Thứ Bảy</Form.Label>
              <Form.Control
                type='text'
                name='saturday'
                required
                value={saturday}
                onChange={onChangeDay}
                className='input-form'
              />
            </Form.Group>
            <Form.Group className='d-flex'>
              <Form.Label>Chủ nhật</Form.Label>
              <Form.Control
                type='text'
                name='sunday'
                required
                value={sunday}
                onChange={onChangeDay}
                className='input-form'
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
            className='input-form'
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PostForm;
