"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    setMessage("")

    // 1️⃣ Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    const user = data.user

    if (!user) {
      setMessage("User creation failed")
      setLoading(false)
      return
    }

    // 2️⃣ users table insert
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        auth_id: user.id,   // uuid
        name,
        surname,
        username,
      })

    if (insertError) {
      setMessage(insertError.message)
      setLoading(false)
      return
    }

    setMessage("Registration successful 🎉")
    setLoading(false)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Register</h1>

      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} />
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>

      {message && <p>{message}</p>}
    </div>
  )
}
