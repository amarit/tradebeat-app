import { useQuery } from "@tanstack/react-query"

type Post = {
  id: number
  title: string
  body: string
}

export function TestApiPage() {
  const { data, isLoading, isError, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      )

      if (!res.ok) {
        throw new Error("Failed to fetch posts")
      }

      return res.json()
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {(error as Error).message}</div>

  return (
    <div style={{ padding: 20 }}>
      <h2>Posts</h2>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}