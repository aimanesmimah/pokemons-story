import React from 'react';
import Header from '../../components/Header' ;
import Footer from '../../components/Footer' ;
import './styles.scss';

function App({children}) {
  return (
    <div className="app--wrapper">
       <Header />
       <div className="app--wrapper__content" >
          {children}
       </div>
       <Footer />
    </div>
  );
}

export default App;