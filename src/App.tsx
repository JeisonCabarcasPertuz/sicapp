import React from 'react';
import Form from './components/Form';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Form />
      </div>
    </div>
  );
};

export default App;

