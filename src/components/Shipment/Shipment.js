import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { MyContext } from '../../App';
import './Shipment.scss';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(MyContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example"));

    return (

        <form className='shipment-form' onSubmit={handleSubmit(onSubmit)}>

            <input placeholder='Enter your name' defaultValue={loggedInUser.name} {...register("name", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}

            <input placeholder='Enter your email' defaultValue={loggedInUser.email} {...register("email", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}

            <input placeholder='Your address' {...register("address", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;