import { useSelector } from "react-redux"
import { IAuthState } from "../State/Types/Auth"
import { IState } from "../State/Types/Reducers";

export const AboutComp = () =>
{
    const isAuthenticated = useSelector((state:IAuthState) => state.isAuthenticated);
    const user = useSelector((state: IState) => state.Auth.user);

    if(!isAuthenticated)
    {
        return <div className="container" >

            <div style={{ display : 'grid', placeItems : 'center', height : '90vh' }} >
                <div style={{ display : 'grid', placeItems : 'center'}} >
                <h1 className="font-weight-bold" >Sorry :(</h1>
                <h4> You need to login to access this resource </h4>
                </div>
            </div>

        </div>
    }

    return <div className="container" >
    <div className="bg-light p-5 mt-5 rounded" >
        {
            user
            ? <h1>Hi {user.first_name + user.last_name},</h1>
            : null
        }
        <h2>Welcome to Auth System!</h2>
        <p>This is fully production level authentication system developed using Django and ReactJS </p> 
        <p>For ReactJS i have used Typescript Language where for Django I used Python3</p>
        <hr />
        <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
            <h4>Technology that used for Backend</h4>
        <ul>
            <li>Django</li>
            <li>Python3</li>
            <li>Django Rest Framework</li>
            <li>Djoser</li>
            <li>Social Auth App Django</li>
        </ul>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
            <h4>Technology that used for Frontend</h4>
        <ul>
            <li>React</li>
            <li>Typescript</li>
            <li>Redux</li>
            <li>Formik</li>
            <li>Yup</li>
            <li>Axios</li>
        </ul>
            </div>
        </div>


    </div>
</div>
}