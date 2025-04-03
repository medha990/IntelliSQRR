import React from 'react';
import '../styles/login.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const Register: React.FC = () => {
  let navigate = useNavigate();


  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    
    await funSubmit(data);
  };

  const funSubmit = async (data: FormData) => {
    const { email, password } = data; 
    const response = await fetch("http://localhost:8080/api/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
     
      localStorage.setItem('token', json.token);
      navigate("/hello");
      alert("Registered successfully");
    }
    else{
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='for'>
          <div className="fr">
            <p className="he">Welcome back!</p>
            <div className='box'>
              <div className='con'>
                <div className='inp'>
                  <div className='content'>
                    <div className='co1'>
                      <input id="UID"
                        type="email"
                        {...register("email")} 
                        placeholder='UID'
                      />
                      {errors.email && <p className='para1'>{errors.email.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='box2'>
              <div className='con'>
                <div className='inp'>
                  <div className='content'>
                    <div className='co1'>
                      <input id="UID"
                        type="password"
                        {...register("password")} 
                        placeholder='Password'
                      />
                      {errors.password && <p className='para'>{errors.password.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className='but' type='submit'>Register</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;