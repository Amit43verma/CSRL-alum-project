import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import { Alumni } from './pages/alumni';
import { Chat } from './pages/chat';
import { Meetups } from './pages/meetups';
import { Settings } from './pages/settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/meetups" element={<Meetups />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;