"use client"

import {useState, useEffect} from "react"
import {supabase} from "@/lib/supabase"

export default function Homepage() {
    const [user, setUser] = useState<any>(null)
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getInitialData() {
            const {data: {user}} = await supabase.auth.getUser()
            if (user) {
                setUser(user)
                const {data: posts} = await supabase
                    .from('queues')
                    .select('*')
                    .order('created_at', {ascending: false})
                if (posts) setPosts(posts)
            }
            setLoading(false)
        }

        getInitialData()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div className="container mx-auto p-4">
            <nav className="mb-8 p-4 border-b">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Social App</h1>
                    {user && (
                        <div className="flex gap-4">
                            <a href="/profile">Profile</a>
                            <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
                        </div>
                    )}
                </div>
            </nav>

            {user ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                        <div className="p-4 border rounded">
                            <h2 className="text-xl mb-2">Profile</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <h2 className="text-xl mb-4">Recent Posts</h2>
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post.id} className="p-4 border rounded">
                                    <p>{post.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p>Please <a href="/" className="text-blue-500">sign in</a> to view content</p>
                </div>
            )}
        </div>
    )
}

