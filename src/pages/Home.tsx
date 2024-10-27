import React from 'react';
import { Navigate } from 'react-router-dom';

export function Home() {
  // Şimdilik admin paneline yönlendir
  return <Navigate to="/admin" replace />;
}