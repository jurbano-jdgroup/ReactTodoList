import { ArrowLeft } from "../assets/icons"
import * as yup from 'yup'
import { Formik, Form, Field } from "formik"
import { useEffect, useState } from "react"
import Loader from "./Loader"
import moment from "moment"
import { toast } from "react-toastify"

const schema = yup.object().shape({
    name: yup.string().required("Debe especificar un nombre"),
    subject: yup.string().optional(),
    description: yup.string().optional()
})

const defaultValues = {
    name: '',
    subject: '',
    description: ''
}

const monthsMap = ["January", "February", "March", "April", "May",
    "June", "Jule", "August", "September", "October", "November",
    "December"]

const hoursList = () => {
    const list = []
    let hour = 0
    while (hour < 24) {
        list.push(hour)
        hour++
    }
    return list
}

const minutesList = () => {
    const list = []
    let hour = 0
    while (hour < 60) {
        list.push(hour)
        hour++
    }
    return list
}

const monthDays = () => {
    const list = []
    let day = 1
    while (day < 32) {
        list.push(day)
        ++day
    }
    return list
}

const AddForm = ({ data, editing, showForm, onSubmit, setShowForm }) => {
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState(null)
    const [datesArray, setDatesArray] = useState([])
    const [monthSelected, setMonthSelected] = useState("January")
    const [dateSelected, setDateSelected] = useState(1)
    const [hourSelected, setHourSelected] = useState(0)
    const [minuteSelected, setMinuteSelected] = useState(0)
    const [dateDescription, setDateDescription] = useState(null)

    useEffect(() => {
        setFormData({ ...defaultValues, ...data })
        setLoading(false)
    }, [data])

    const style = {
        ...{
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100vh',
            marginTop: '100vh',
            transition: 'margin-top 0.2s linear',
            backgroundColor: 'white',
            padding: '24px',
            overflowY: 'auto',
            zIndex: '10'
        },
        ...showForm ? {
            marginTop: '0px'
        } : {}
    }

    const onArrowLeftClicked = () => {
        setShowForm(!showForm)
    }

    const monthChange = (e) => {
        setMonthSelected(e.target.value)
    }

    const dateChange = (e) => {
        setDateSelected(e.target.value)
    }

    const hourChange = (e) => {
        setHourSelected(e.target.value)
    }

    const minuteChange = (e) => {
        setMinuteSelected(e.target.value)
    }

    const dateDescriptionChange = (e) => {
        setDateDescription(e.target.value)
    }

    const onAddDateClicked = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const nDate = new Date()
        nDate.setMonth(monthsMap.indexOf(monthSelected))
        nDate.setDate(dateSelected)
        nDate.setHours(hourSelected)
        nDate.setMinutes(minuteSelected, 0, 0)
        const nTime = nDate.getTime()

        const settedDate = datesArray.find(item => item.time === nTime)
        if (settedDate) {
            toast.error("La fecha ya se estableció")
            return
        }

        setDatesArray([
            ...datesArray,
            {
                month: monthSelected,
                date: dateSelected,
                hour: hourSelected,
                minute: minuteSelected,
                description: dateDescription,
                time: nTime
            }
        ])

    }

    const deleteDate = (time, e) => {
        e.preventDefault()
        e.stopPropagation()

        setDatesArray(
            datesArray.filter(item => item.time !== time)
        )
    }

    const onFormSubmit = (values) => {
        if (datesArray.length === 0) {
            toast.warning("Debe agregar una fecha")
            return
        }

        onSubmit({
            ...values,
            ...{
                dates: datesArray
            }
        })

        setDatesArray([])
    }

    return (
        <div style={style}>
            <div className="row no-gutters justify-content-center">
                <div className="col-12 col-md-7 col-lg-5">
                    <div className="p-3 rounded border">
                        <div className="my-2">
                            <button className="btn px-0" onClick={onArrowLeftClicked}>
                                <ArrowLeft />
                            </button>
                        </div>
                        <h1 className="px-4">
                            {editing ? "Editar" : "Agregar"}
                        </h1>
                        {
                            loading ? <Loader className="d-flex justify-content-center m-3" /> :
                                <Formik
                                    initialValues={formData}
                                    validationSchema={schema}
                                    onSubmit={onFormSubmit}
                                    className="px-4"
                                >
                                    {
                                        ({ errors, touched }) => (
                                            <Form>
                                                <div className="form-group mt-3">
                                                    <label className="my-2">
                                                        <small style={{ fontSize: '0.7rem' }}>
                                                            <strong>
                                                                NOMBRE
                                                            </strong>
                                                        </small>
                                                        <small className="text-danger">
                                                            *
                                                        </small>
                                                    </label>
                                                    <Field name="name" className="form-control"
                                                        placeholder="name" />
                                                    {
                                                        errors.name && touched.name ? (
                                                            <div className="my-1 text-danger">
                                                                <small>
                                                                    {errors.name}
                                                                </small>
                                                            </div>
                                                        ) : null
                                                    }
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label className="my-2">
                                                        <small style={{ fontSize: '0.7rem' }}>
                                                            <strong>
                                                                ASUNTO
                                                            </strong>
                                                        </small>
                                                    </label>
                                                    <Field name="subject" className="form-control"
                                                        placeholder="subject" />
                                                    {
                                                        errors.subject && touched.subject ? (
                                                            <div className="my-1 text-danger">
                                                                <small>
                                                                    {errors.subject}
                                                                </small>
                                                            </div>
                                                        ) : null
                                                    }
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label>
                                                        <small style={{ fontSize: '0.7rem' }}>
                                                            <strong>
                                                                FECHAS
                                                            </strong>
                                                        </small>
                                                    </label>
                                                    <hr />
                                                    <div>
                                                        <div>
                                                            <ul>
                                                                {
                                                                    datesArray.map((item, idx) => (
                                                                        <li key={`date-item-${idx}`} className="mb-3">
                                                                            <div>
                                                                                {moment(new Date(item.time)).format("MMMM DD, h a")}
                                                                            </div>
                                                                            <div>
                                                                                <small className="text-secondary">
                                                                                    {item.description}
                                                                                </small>
                                                                            </div>
                                                                            <div>
                                                                                <button className="btn bt-sm p-0 my-0"
                                                                                    onClick={(e) => deleteDate(item.time, e)}>
                                                                                    <small>
                                                                                        <small className="text-danger">
                                                                                            eliminar
                                                                                        </small>
                                                                                    </small>
                                                                                </button>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <label>
                                                                    <small style={{ fontSize: '0.7rem', color:'gray'  }}>
                                                                        <strong>
                                                                            Fecha
                                                                        </strong>
                                                                    </small>
                                                                </label>
                                                                <div className="input-group">
                                                                    <select className="form-select"
                                                                        onChange={monthChange}>
                                                                        {
                                                                            monthsMap.map(item => (
                                                                                <option value={item} key={item}>
                                                                                    {item}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    <select className="form-select"
                                                                        onChange={dateChange}>
                                                                        {
                                                                            monthDays().map(item => (
                                                                                <option value={item} key={item}>
                                                                                    {item}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="mx-3">
                                                                <label>
                                                                    <small style={{ fontSize: '0.7rem', color:'gray'  }}>
                                                                        <strong>
                                                                            Hora
                                                                        </strong>
                                                                    </small>
                                                                </label>
                                                                <div className="input-group">
                                                                    <select className="form-select"
                                                                        onChange={hourChange}>
                                                                        {
                                                                            hoursList().map(item => (
                                                                                <option value={item} key={item}>
                                                                                    {item}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    <select className="form-select"
                                                                        onChange={minuteChange}>
                                                                        {
                                                                            minutesList().map(item => (
                                                                                <option value={item} key={item}>
                                                                                    {item}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <label>
                                                                <small style={{ fontSize: '0.7rem', color:'gray' }}>
                                                                    <strong>
                                                                        Descripción corta
                                                                    </strong>
                                                                </small>
                                                            </label>
                                                            <textarea name="date_description" placeholder="descripción"
                                                                className="form-control"
                                                                onInput={dateDescriptionChange} />
                                                        </div>
                                                        <div className="mt-3">
                                                            <button className="btn btn-sm btn-primary"
                                                                onClick={onAddDateClicked}>
                                                                <small>
                                                                    AGREGAR FECHA
                                                                </small>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group mt-3 d-none">
                                                    <label className="my-2">
                                                        <small>
                                                            DESCRIPCIÓN
                                                        </small>
                                                    </label>
                                                    <Field name="description" as="textarea" className="form-control"
                                                        placeholder="descripción" />
                                                    {
                                                        errors.description && touched.description ? (
                                                            <div className="my-1 text-danger">
                                                                <small>
                                                                    {errors.description}
                                                                </small>
                                                            </div>
                                                        ) : null
                                                    }
                                                </div>
                                                <div className="form-group mt-3 d-flex flex-row-reverse">
                                                    <button type="submit" className="btn btn-primary px-5">
                                                        {editing ? "Editar" : "Agregar"}
                                                    </button>
                                                    <button type="reset" onClick={onArrowLeftClicked} className="btn btn-outline-primary mx-3 px-5">
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </Form>
                                        )
                                    }
                                </Formik>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddForm