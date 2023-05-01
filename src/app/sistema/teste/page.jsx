'use client'

import DateInput from '@/components/DateInput'
import RadioInput from '@/components/RadioInput'
import TextInput from '@/components/TextInput'
import React, { useState } from 'react'

const page = () => {

    const [date, setDate] = useState()
    const [name, setName] = useState()
    const [cpf, setCpf] = useState()
    const [sangue, setSangue] = useState()
    const [celular, setCelular] = useState()
    const [sexo, setSexo] = useState()

    const handleDate = (e) => setDate(e.target.value)
    const handleName = (e) => setName(e.target.value)
    const handleCpf = (e) => setCpf(e.target.value)
    const handleSangue = (e) => setSangue(e.target.value)
    const handleCelular = (e) => setCelular(e.target.value)
    const handleSexo = (e) => setSexo(e.target.value)

    return (
        <div className='flex'>
            <div className='bg-azul w-64 h-screen'></div>
            <form className='p-20 w-full'>
                <TextInput name="Nome" required maxWidth="max-w-lg" onChange={handleName} />
                <div className='flex mt-5 gap-20'>
                    <DateInput name="Nascimento" onChange={handleDate} className="w-fit" />
                    <TextInput name="CPF" mask="999.999.999-99" required maxWidth="md" onChange={handleCpf} />
                </div>
                <div className='flex mt-5'>
                    <RadioInput name="Tipo Sanguíneo" onChange={handleSangue} items={[
                        { name: 'A+' },
                        { name: 'A-' },
                        { name: 'B+' },
                        { name: 'B-' },
                        { name: 'AB+' },
                        { name: 'AB-' },
                        { name: 'O+' },
                        { name: 'O-' },
                    ]} />
                </div>
                <div className='flex mt-5 gap-10'>
                    <TextInput name="Celular" mask="(99) 99999-9999" required maxWidth="md" onChange={handleCelular} />
                    <RadioInput name="Sexo" onChange={handleSexo} items={[
                        { name: 'Masculino' },
                        { name: 'Feminino' }
                    ]} />
                </div>
                <button className='btn mt-8'>Submit</button>
            </form>
        </div>
    )
}

export default page