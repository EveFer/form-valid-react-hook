import { useState } from 'react'
import Head from 'next/head'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const userSchema = yup.object({
  name: yup.string().required('Este campo es requerido'),
  lastName: yup.string().required('Este campo es requerido')
})

export default function Home () {
  const [user, setUser] = useState({
    name: '',
    lastName: ''
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  })

  const handleInputChange = (event) => {
    console.log(event.target.name, event.target.value)
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    console.log('Data to send')
    console.log(user)
  }

  const handleSubmitFormData = (data) => {
    console.log('Enviado data...')
    console.log(data)
  }

  console.log(errors)

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div class='container'>
        <div class='row'>
          <div class='col-6'>
            <h2>Formulario manejado con React</h2>
            <form class='row g-3' onSubmit={handleSubmitForm}>
              <div class='col-12'>
                <label for='inputAddress' class='form-label'>Name</label>
                <input
                  type='text'
                  name='name'
                  class='form-control'
                  placeholder='Name...'
                  value={user.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div class='col-12'>
                <label for='inputAddress' class='form-label'>LastName</label>
                <input
                  type='text'
                  name='lastName'
                  class='form-control'
                  placeholder='Last name...'
                  value={user.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div class='col-12'>
                <button type='submit' class='btn btn-primary'>Registrar</button>
              </div>
            </form>
          </div>
          <div class='col-6'>
            <h2>Formulario manejado con RHF</h2>
            <form class='row g-3' onSubmit={handleSubmit(handleSubmitFormData)}>
              <div class='col-12'>
                <label for='inputAddress' class='form-label'>Name</label>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Name...'
                  {...register('name')}
                />
                <p className='text-danger'>{errors?.name?.message}</p>
              </div>
              <div class='col-12'>
                <label for='inputAddress' class='form-label'>LastName</label>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Last name...'
                  {...register('lastName')}
                />
                <p className='text-danger'>{errors?.lastName?.message}</p>
              </div>
              <div class='col-12'>
                <button type='submit' class='btn btn-primary'>Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
