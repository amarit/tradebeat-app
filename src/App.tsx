import { useState } from 'react'
import { SignInPage } from "@/features/auth/SignInPage"
import { TestApiPage } from "@/features/test/TestApiPage"
import { TestPage } from "@/features/test/TestPage"
import { Routes, Route } from "react-router-dom"
import './App.css'


function Home() {
  return <div>Home</div>
}

function Trades() {
  return <div>Trades</div>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/:lang/trades" element={<Trades />} />
      <Route path="/test" element={<TestApiPage />} />
      <Route path="/test2" element={<TestPage />} />
    </Routes>
  )
}
