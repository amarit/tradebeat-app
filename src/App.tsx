import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { SignInPage } from "@/features/auth/SignInPage"
import { TestApiPage } from "@/features/test/TestApiPage"
import { AppLayout } from "@/layouts/AppLayout"
import { DashboardPage } from "@/features/dashboard/DashboardPage"
import { TradeListPage } from "@/features/trades/TradeListPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />

      <Route path="/:lang" element={<AppLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="trades" element={<TradeListPage />} />
        <Route path="test" element={<TestApiPage />} />
      </Route>
    </Routes>
  )
}
