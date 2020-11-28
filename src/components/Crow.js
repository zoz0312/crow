import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'firebaseSetup';
import { COLLECTION } from '../constants';
import { Form, Button } from 'react-bootstrap';
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import LoadingButton from '../entities/Button/LoadingButton';
import './Crow.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Crow = ({ crowObject, isOwner }) => {
  const userDoc = `${COLLECTION}/${crowObject.id}`;
  const [isEditing, setIsEditing] = useState(false);
  const [newCrow, setNewCrow] = useState(crowObject.text);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      setIsEditing(false);
      setNewCrow(null);
      setIsSubmitting(false);
    }
  }, []);

  const toggleEditing = () => setIsEditing(prev => !prev);

  const onDeleteClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const ok = window.confirm('삭제하시겠습니까악?');
    if (ok) {
      await dbService.doc(userDoc).delete();
      await storageService.refFromURL(crowObject.imgUrl).delete();
    }
    setIsSubmitting(false);
  };

  const onEditChange = (event) => {
    const { target : { value } } = event;
    setNewCrow(value);
  }

  const onEditCancle = () => {
    setIsEditing(false);
    setNewCrow(crowObject.text);
  }

  const onSubmit = async (event) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    event.preventDefault();
    await dbService.doc(userDoc).update({
      text: newCrow,
    });
    setIsEditing(false);
    setIsSubmitting(false);
  }

  return (
    <div>
      { isEditing ? (
        <>
          <Form
            className="crow-card-fixed"
            onSubmit={onSubmit}
          >
            <Form.Control
              type="text"
              value={newCrow}
              required
              placeholder="글을 작성해라 까악~"
              onChange={onEditChange}
            />
            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              className="fixed-button"
            >수정</LoadingButton>
            <Button
              type="button"
              variant=""
              onClick={onEditCancle}
              className="cancle-button"
            >취소</Button>
          </Form>
        </>
      ) : (
        <div className="crow-card">
          { isOwner &&
            <div className="crow-card--btn-group">
              <Button
                type="button"
                className="crow-card__btn-edit"
                variant=""
                onClick={toggleEditing}
              ><FontAwesomeIcon icon ={faPen} /></Button>
              <LoadingButton
                type="button"
                className="crow-card__btn-delete"
                buttonClick={onDeleteClick}
                isLoading={isSubmitting}
              ><FontAwesomeIcon icon ={faTrashAlt} /></LoadingButton>
            </div>
          }
          <span className="crow-card--text">{crowObject.text}</span>
          { crowObject.imgUrl &&
            <img src={crowObject.imgUrl} width="50px" height="50px" />
          }
        </div>
      )}
    </div>
  );
}

export default Crow;