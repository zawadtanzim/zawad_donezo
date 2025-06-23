import { Link } from "react-router-dom";

export default function Login(){
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" className="input input-bordered w-full"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" className="input input-bordered w-full"/>
          </div>
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <p className="mt-4 text-center text-sm">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
      </div>
    </div>
  )
}
