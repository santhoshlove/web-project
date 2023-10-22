import { LoginApi } from '../services/Api';
import './Login.css';
import {storeUserData} from '../services/Storage'
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '../components/NavBar';


export default function Login(){

    const initialStateErrors = {
        email:{requried:false},
        password:{requried:false},
        custom_error:null
    };

    const [errors,setErrors] = useState(initialStateErrors);

    const [loading,setLoading] = useState(false);

    const [inputs,setInputs] = useState({
        email:"",
        password:""
        
        
    });

    const handleInputs = (event) =>{
        setInputs({...inputs,[event.target.name]:event.target.value})
}

    const handleSubmit = (event) =>{
        event.preventDefault();

        let errors = initialStateErrors;
        let hasError = false;
        
        if(inputs.email == "")
        {
            errors.email.requried = true;
            hasError = true;
        }
        if(inputs.password == "")
        {
            errors.password.requried = true;
            hasError = true;
        }
        
        if (hasError != true){
            //sending login api request
            setLoading(true);
            LoginApi(inputs).then((response)=>{
                storeUserData(response.data.idToken);
            }).catch((err)=>{
                if(err.code="ERR_BAD_REQUEST"){
                    setErrors({...errors,custom_error:"Invalid Credentials."})
                }
            }).finally(()=>{
                setLoading(false)
            })

        }
        setErrors({...errors});

    }

    if(isAuthenticated()){
        //redirect user to dashboard ya
        return <Navigate to="/dashboard" /> //dasboard url 

    }

    return (
        <div>
            <NavBar/>

                <section className="login-block">
                    <div className="container">
                        <div className="row ">
                            <div className="col login-sec">
                                <h2 className="text-center">Login Now</h2>
                                <form onSubmit={handleSubmit} className="login-form" action="">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                    <input type="email"  className="form-control" onChange={handleInputs} name="email"  id="" placeholder="email"  />
                                    {errors.email.requried?
                                        (<span className="text-danger" >
                                            Email is required.
                                        </span>):null
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <input  className="form-control" type="password" onChange={handleInputs}  name="password" placeholder="password" id="" />
                                    {errors.password.requried?
                                        (<span className="text-danger" >
                                            Password is required.
                                        </span>):null
                                }
                                </div>
                                <div className="form-group">
                                    {loading ?
                                        (<div  className="text-center">
                                            <div className="spinner-border text-primary " role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>):null
                                    }
                                    <span className="text-danger" >
                                    {errors.custom_error?
                                (<p>{errors.custom_error}</p>):null
                                }
                                    </span>
                                    <input  type="submit" className="btn btn-login float-right" disabled={loading}  value="Login"/>
                                </div>
                                <div className="clearfix"></div>
                                <div className="form-group">
                                Create new account ? Please <Link to="/register" >Register</Link>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>


        </div>
        
    )
}