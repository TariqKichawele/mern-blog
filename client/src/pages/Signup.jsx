import { Link, useNavigate } from "react-router-dom"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import OAuth from "../components/OAuth";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.id]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password) {
      return setError('All fields are required');
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false) {
        return setError(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">

        <div className="flex-1">
          <Link 
            to={'/'} 
            className='self-center font-bold dark:text-white'
          >
              <span 
                className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-4xl'
              >
                DevInsights
              </span>
              Digest
          </Link>
          <p className="text-sm mt-5 leading-6">
            Welcome to DevInsights - Your Gateway to Insightful Stories and Inspiration
            At DevInsights, we believe in the power of stories to captivate, inspire, 
            and connect us. Our digital haven is a space where narratives unfold, 
            ideas come to life, and readers embark on a journey of discovery.
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username"/>
              <TextInput 
                type='text'
                placeholder='Username'
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email"/>
              <TextInput 
                type='email'
                placeholder='Email'
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password"/>
              <TextInput 
                type='password'
                placeholder='Password'
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone={'purpleToPink'} type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size={'sm'}/>
                    <span className="pl-3">Loading...</span>
                  </>
                ) : "Sign Up"
              }
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to={'/sign-in'} className="text-blue-500">
                Sign In
            </Link>
          </div>
          {
            error && (
              <Alert className="mt-5" color={'failure'}>
                {error}
              </Alert>
            )
          }
        </div>

      </div>
    </div>
  )
}
