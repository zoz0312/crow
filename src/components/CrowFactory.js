import React, { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { dbService, storageService } from 'firebaseSetup';
import { COLLECTION } from '../constants';
import { faCrow, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingButton from 'entities/Button/LoadingButton';
import { Button, Form } from 'react-bootstrap';

import './CrowFactory.scss';
import { CSSTransition } from 'react-transition-group';

const CrowFactory = ({ userObject }) => {
  const [crow, setCrow] = useState('');
  const [base64, setBase64] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageFileRef = useRef(null);

  const attachCss = 'attach-img';
  const attachRef = useRef(null);
  const timeout = 300;

  const onSubmit = async (event) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    event.preventDefault();

    let imgUrl = '';
    if (base64) {
      const fileRef = storageService.ref().child(`${userObject.uid}/${uuid()}`);
      const res = await fileRef.putString(base64, 'data_url');
      imgUrl = await res.ref.getDownloadURL();
      onClearFile();
    }

    await dbService.collection(COLLECTION).add({
      text: crow,
      createdAt: Date.now(),
      creatorId: userObject.uid,
      ...imgUrl && { imgUrl },
    });
    setCrow('');
    setIsSubmitting(false);
  }

  const onChange = (event) => {
    const { currentTarget: { value } } = event;
    setCrow(value);
  };

  const onFileChange = (event) => {
    const { target: { files } } = event;
    const [file] = files;
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = (loadEvent) => {
      // finish file load
      setBase64(loadEvent.currentTarget.result);
    }
    reader.readAsDataURL(file);
  }

  const onClearFile = () => {
    imageFileRef.current.value = null;
    setBase64(null)
  };

  return (
    <div className="crow-contain">
      <Form onSubmit={onSubmit} className="crow-form">
        <div className="crow-form__crow-container">
          <Form.Control
            type="text"
            placeholder="까악!"
            maxLength={120}
            value={crow}
            onChange={onChange}
            disabled={isSubmitting}
          />
          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
          >
            <FontAwesomeIcon icon={faCrow} />
          </LoadingButton>
        </div>
        <CSSTransition
          nodeRef={attachRef}
          in={Boolean(base64)}
          timeout={timeout}
          classNames={attachCss}
          mountOnEnter
          unmountOnExit
        >
          <div ref={attachRef}>
            <div className="crow-container__image-preview">
              <img src={base64} width="50px" height="50px" alt="upload image" />
            </div>
            <Button
              type="button"
              variant=""
              className="btn-remove-image"
              onClick={onClearFile}
              disabled={isSubmitting}
            >사진지우기</Button>
          </div>
        </CSSTransition>
        { !base64 && (
          <label
            htmlFor="upload_image"
            className="crow-container--label"
          >이미지 추가&nbsp;<FontAwesomeIcon icon={faPlus} /></label>
        )}
        <Form.Control
          type="file"
          id="upload_image"
          accept="image/*"
          ref={imageFileRef}
          onChange={onFileChange}
        />
      </Form>
    </div>
  )
}

export default CrowFactory;