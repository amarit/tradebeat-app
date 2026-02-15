import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { SignInPage } from "@/features/auth/SignInPage"
import { TestApiPage } from "@/features/test/TestApiPage"
import { TestPage } from "@/features/test/TestPage"
import { AppLayout } from "@/layouts/AppLayout"
// import { DashboardPage } from "@/features/dashboard/DashboardPage"
// import { TradesPage } from "@/features/trades/TradesPage"
// import './App.css'


function Home() {
  return <div>Home</div>
}

function Trades() {
  return <div>Trades</div>
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<SignInPage />} />

      {/* Protected / app routes */}
      <Route element={<AppLayout />}>
        <Route path="test" element={<TestApiPage />} />
        <Route path="test2" element={<TestPage />} />
        <Route path=":lang/trades" element={<Trades />} />
      </Route>
    </Routes>
  )
}
