import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { dbService, storageService } from 'firebaseSetup';
import { COLLECTION } from '../constants';

const CrowFactory = ({ userObject }) => {
  const [crow, setCrow] = useState('');
  const [base64, setBase64] = useState();

  const onSubmit = async (event) => {
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
  }

  const onChange = (event) => {
    const { target: { value } } = event;
    setCrow(value);
  };

  const onFileCHange = (event) => {
    const { target: { files } } = event;
    const [file] = files;
    const reader = new FileReader();
    reader.onloadend = (loadEvent) => {
      // finish file load
      setBase64(loadEvent.currentTarget.result);
    }
    reader.readAsDataURL(file);
  }

  const onClearFile = () => setBase64(null);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="까악!"
        maxLength={120}
        value={crow}
        onChange={onChange}
      />
      <input type="file" accept="image/*" onChange={onFileCHange} />
      <button>까악하기</button>
      { base64 && (
        <div>
          <img src={base64} width="50px" height="50px" />
          <button type="button" onClick={onClearFile}>사진지우기</button>
        </div>
      )}
    </form>
  )
}

export default CrowFactory;