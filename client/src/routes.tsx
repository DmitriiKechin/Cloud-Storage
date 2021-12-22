import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { StoragePage } from './pages/StoragePage';

export const globalRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/storage" element={<StoragePage />} />
        <Route path="*" element={<StoragePage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};
