import React, { useState } from 'react';
import { dbService, storageService } from 'firebaseSetup';
import { COLLECTION } from '../constants';

const Crow = ({ crowObject, isOwner }) => {
  const userDoc = `${COLLECTION}/${crowObject.id}`;
  const [isEditing, setIsEditing] = useState(false);
  const [newCrow, setNewCrow] = useState(crowObject.text);

  const toggleEditing = () => setIsEditing(prev => !prev);

  const onDeleteClick = async () => {
    const ok = window.confirm('삭제하시겠습니까악?');
    if (ok) {
      await dbService.doc(userDoc).delete();
      await storageService.refFromURL(crowObject.imgUrl).delete();
    }
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
    event.preventDefault();
    await dbService.doc(userDoc).update({
      text: newCrow,
    });
    setIsEditing(false);
  }

  return (
    <div>
      { isEditing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newCrow}
              required
              placeholder="글을 작성해라 까악~"
              onChange={onEditChange}
            />
            <button>수정</button>
            <button type="button" onClick={onEditCancle}>취소</button>
          </form>
        </>
      ) : (
        <>
          <h4>{crowObject.text}</h4>
          { crowObject.imgUrl &&
            <img src={crowObject.imgUrl} width="50px" height="50px" />
          }
          { isOwner && <>
            <button onClick={onDeleteClick}>Delete Crow</button>
            <button onClick={toggleEditing}>Edit Crow</button>
          </> }
        </>
      )}
    </div>
  );
}

export default Crow;