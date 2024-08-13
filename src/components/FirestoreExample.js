// src/components/FirestoreExample.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const FirestoreExample = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'your-collection'));
    const docs = querySnapshot.docs.map(doc => doc.data());
    setData(docs);
  };

  const addData = async () => {
    try {
      await addDoc(collection(firestore, 'your-collection'), {
        name: 'Sample Data',
        createdAt: new Date(),
      });
      fetchData();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button onClick={addData}>Add Data</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreExample;
